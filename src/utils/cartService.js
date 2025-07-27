import { supabase } from './supabase';

const cartService = {
  // Get or create user cart
  getUserCart: async (userId) => {
    try {
      // First try to get existing cart
      let { data: cart, error } = await supabase
        .from('carts')
        .select(`
          *,
          cart_items (
            id,
            product_id,
            quantity,
            customization_text,
            customization_image_url,
            price_at_time,
            products (
              id,
              name_en,
              name_ar,
              price,
              image_url,
              is_active
            )
          )
        `)
        .eq('user_id', userId)
        .single();

      // If no cart exists, create one
      if (error && error.code === 'PGRST116') {
        const { data: newCart, error: createError } = await supabase
          .from('carts')
          .insert({ user_id: userId })
          .select()
          .single();

        if (createError) {
          return { success: false, error: createError.message };
        }

        return { success: true, data: { ...newCart, cart_items: [] } };
      }

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: cart };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return {
          success: false,
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.'
        };
      }
      return { success: false, error: 'Failed to load cart' };
    }
  },

  // Add item to cart
  addToCart: async (userId, productId, quantity = 1, customization = {}) => {
    try {
      // Get user cart
      const cartResult = await cartService.getUserCart(userId);
      if (!cartResult.success) {
        return cartResult;
      }

      const cart = cartResult.data;

      // Get product details
      const { data: product, error: productError } = await supabase
        .from('products')
        .select('price, stock, is_active')
        .eq('id', productId)
        .single();

      if (productError) {
        return { success: false, error: 'Product not found' };
      }

      if (!product.is_active) {
        return { success: false, error: 'Product is not available' };
      }

      if (product.stock < quantity) {
        return { success: false, error: 'Insufficient stock' };
      }

      // Check if item already exists in cart
      const existingItem = cart.cart_items?.find(item => item.product_id === productId);

      if (existingItem) {
        // Update existing item
        const newQuantity = existingItem.quantity + quantity;
        
        if (product.stock < newQuantity) {
          return { success: false, error: 'Insufficient stock for requested quantity' };
        }

        const { data, error } = await supabase
          .from('cart_items')
          .update({ 
            quantity: newQuantity,
            customization_text: customization?.text || existingItem.customization_text,
            customization_image_url: customization?.image_url || existingItem.customization_image_url
          })
          .eq('id', existingItem.id)
          .select()
          .single();

        if (error) {
          return { success: false, error: error.message };
        }

        return { success: true, data };
      } else {
        // Add new item
        const { data, error } = await supabase
          .from('cart_items')
          .insert({
            cart_id: cart.id,
            product_id: productId,
            quantity,
            customization_text: customization?.text,
            customization_image_url: customization?.image_url,
            price_at_time: product.price
          })
          .select()
          .single();

        if (error) {
          return { success: false, error: error.message };
        }

        return { success: true, data };
      }
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return {
          success: false,
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.'
        };
      }
      return { success: false, error: 'Failed to add item to cart' };
    }
  },

  // Update cart item quantity
  updateCartItem: async (itemId, quantity) => {
    try {
      if (quantity <= 0) {
        return cartService.removeFromCart(itemId);
      }

      const { data, error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', itemId)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return {
          success: false,
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.'
        };
      }
      return { success: false, error: 'Failed to update cart item' };
    }
  },

  // Remove item from cart
  removeFromCart: async (itemId) => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return {
          success: false,
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.'
        };
      }
      return { success: false, error: 'Failed to remove item from cart' };
    }
  },

  // Clear entire cart
  clearCart: async (userId) => {
    try {
      const cartResult = await cartService.getUserCart(userId);
      if (!cartResult.success) {
        return cartResult;
      }

      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('cart_id', cartResult.data.id);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return {
          success: false,
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.'
        };
      }
      return { success: false, error: 'Failed to clear cart' };
    }
  }
};

export default cartService;