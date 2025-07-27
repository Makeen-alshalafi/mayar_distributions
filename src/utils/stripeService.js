import { loadStripe } from '@stripe/stripe-js';
import { supabase } from './supabase';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const stripeService = {
  // Get Stripe instance
  getStripe: async () => {
    return await stripePromise;
  },

  // Create payment intent via Supabase Edge Function
  createPaymentIntent: async (orderData) => {
    try {
      // Get current user session for authorization
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        return { 
          success: false, 
          error: 'Authentication required for payment processing' 
        };
      }

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const response = await fetch(`${supabaseUrl}/functions/v1/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify(orderData)
      });

      const result = await response.json();

      if (!response.ok) {
        return { 
          success: false, 
          error: result.error || 'Failed to create payment intent' 
        };
      }

      return { success: true, data: result };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return {
          success: false,
          error: 'Cannot connect to payment service. Please check your internet connection and try again.'
        };
      }
      return { 
        success: false, 
        error: 'Something went wrong with payment processing. Please try again.' 
      };
    }
  },

  // Confirm payment with Stripe
  confirmPayment: async (clientSecret, paymentMethod, billingDetails) => {
    try {
      const stripe = await stripeService.getStripe();
      
      if (!stripe) {
        return { 
          success: false, 
          error: 'Stripe failed to load. Please refresh the page and try again.' 
        };
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: paymentMethod,
          billing_details: billingDetails
        }
      });

      if (result.error) {
        return { 
          success: false, 
          error: result.error.message 
        };
      }

      if (result.paymentIntent?.status === 'succeeded') {
        return { 
          success: true, 
          data: result.paymentIntent 
        };
      }

      return { 
        success: false, 
        error: 'Payment was not completed successfully' 
      };
    } catch (error) {
      return { 
        success: false, 
        error: 'Something went wrong processing your payment. Please try again.' 
      };
    }
  },

  // Process complete checkout flow
  processCheckout: async (cartItems, shippingInfo, billingInfo, paymentMethod) => {
    try {
      // Calculate totals
      const subtotal = cartItems?.reduce((sum, item) => sum + (item.price_at_time * item.quantity), 0) || 0;
      const shipping = subtotal > 100 ? 0 : 10.00; // Free shipping over $100
      const tax = subtotal * 0.08; // 8% tax
      const total = subtotal + shipping + tax;

      // Prepare order data
      const orderData = {
        cartItems: cartItems?.map(item => ({
          id: item.product_id,
          name: item.products?.name_en || 'Product',
          price: item.price_at_time,
          quantity: item.quantity,
          customization_text: item.customization_text,
          customization_image_url: item.customization_image_url
        })) || [],
        shippingInfo,
        billingInfo,
        subtotal,
        shipping,
        tax,
        total
      };

      // Create payment intent
      const paymentIntentResult = await stripeService.createPaymentIntent(orderData);
      
      if (!paymentIntentResult.success) {
        return paymentIntentResult;
      }

      // Confirm payment
      const paymentResult = await stripeService.confirmPayment(
        paymentIntentResult.data.clientSecret,
        paymentMethod,
        {
          name: billingInfo?.full_name || shippingInfo?.full_name,
          email: billingInfo?.email || shippingInfo?.email,
          phone: billingInfo?.phone || shippingInfo?.phone,
          address: {
            line1: billingInfo?.address_line1 || shippingInfo?.address_line1,
            line2: billingInfo?.address_line2 || shippingInfo?.address_line2,
            city: billingInfo?.city || shippingInfo?.city,
            state: billingInfo?.state || shippingInfo?.state,
            postal_code: billingInfo?.zip_code || shippingInfo?.zip_code,
            country: billingInfo?.country || shippingInfo?.country || 'US'
          }
        }
      );

      if (!paymentResult.success) {
        return paymentResult;
      }

      return {
        success: true,
        data: {
          paymentIntent: paymentResult.data,
          orderId: paymentIntentResult.data.orderId
        }
      };
    } catch (error) {
      return {
        success: false,
        error: 'Checkout process failed. Please try again.'
      };
    }
  }
};

export default stripeService;