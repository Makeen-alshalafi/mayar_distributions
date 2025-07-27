import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.21.0';
import Stripe from 'https://esm.sh/stripe@12.0.0?target=deno';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};

serve(async (req) => {
    // Handle CORS preflight request
    if (req.method === 'OPTIONS') {
        return new Response('ok', {
            headers: corsHeaders
        });
    }

    try {
        // Get the authorization token from the request headers
        const authHeader = req.headers.get('Authorization');
        if (!authHeader) {
            throw new Error('Missing Authorization header');
        }

        // Extract the token from the Authorization header
        const token = authHeader.replace('Bearer ', '');

        // Create a Supabase client using the token from the logged-in user
        const supabaseUrl = Deno.env.get('SUPABASE_URL');
        const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');
        const supabase = createClient(supabaseUrl, supabaseAnonKey, {
            global: { headers: { Authorization: authHeader } }
        });

        // Create a Stripe client
        const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
        const stripe = new Stripe(stripeKey);

        // Get the request body
        const requestData = await req.json();
        const { cartItems, shippingInfo, billingInfo, subtotal, shipping, tax, total } = requestData;

        // Validate input data
        if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
            throw new Error('Cart is empty or invalid');
        }
        if (!shippingInfo) {
            throw new Error('Shipping information is required');
        }
        if (typeof subtotal !== 'number' || typeof shipping !== 'number' || typeof tax !== 'number' || typeof total !== 'number') {
            throw new Error('Invalid price calculations');
        }

        // Get user information from the JWT token
        const { data: { user }, error: userError } = await supabase.auth.getUser(token);
        if (userError) {
            console.log('Error getting user:', userError.message);
        }

        // Generate order number
        const orderNumber = 'MYR-' + new Date().toISOString().slice(0, 10).replace(/-/g, '') + '-' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');

        // Create a Stripe payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(total * 100), // Convert to cents
            currency: 'usd',
            automatic_payment_methods: { enabled: true },
            description: `Mayar Distributions Order: ${orderNumber}`,
            statement_descriptor: 'MAYAR DIST',
            metadata: {
                user_id: user?.id || 'anonymous',
                order_number: orderNumber,
                order_details: JSON.stringify({
                    items: cartItems.map((item) => ({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                        customization: item.customization_text
                    }))
                })
            }
        });

        // Create order in the database
        const { data: order, error } = await supabase.from('orders').insert({
            user_id: user?.id,
            order_number: orderNumber,
            payment_intent_id: paymentIntent.id,
            subtotal,
            shipping_cost: shipping,
            tax_amount: tax,
            total_amount: total,
            order_status: 'pending',
            payment_status: 'pending',
            shipping_address: shippingInfo,
            billing_address: billingInfo || shippingInfo,
            created_at: new Date().toISOString()
        }).select().single();

        if (error) {
            throw new Error(`Error creating order: ${error.message}`);
        }

        // Insert order items
        if (order) {
            const orderItems = cartItems.map((item) => ({
                order_id: order.id,
                product_id: item.id,
                product_name_en: item.name,
                product_name_ar: item.name, // Would need to fetch from products table for actual Arabic name
                quantity: item.quantity,
                unit_price: item.price,
                total_price: item.price * item.quantity,
                customization_text: item.customization_text,
                customization_image_url: item.customization_image_url
            }));
            
            const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
            if (itemsError) {
                throw new Error(`Error creating order items: ${itemsError.message}`);
            }
        }

        // Return the payment intent client secret
        return new Response(JSON.stringify({
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
            orderId: order?.id || null,
            orderNumber: orderNumber
        }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200
        });
    } catch (error) {
        console.log('Create payment intent error:', error.message);
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400
        });
    }
});