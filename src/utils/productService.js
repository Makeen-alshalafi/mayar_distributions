import { supabase } from './supabase';

const productService = {
  // Get all active products
  getProducts: async (filters = {}) => {
    try {
      let query = supabase
        .from('products')
        .select(`
          *,
          product_images (
            id,
            image_url,
            alt_text_en,
            alt_text_ar,
            display_order
          )
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      // Apply category filter
      if (filters?.category) {
        query = query.eq('category', filters.category);
      }

      // Apply search filter
      if (filters?.search) {
        query = query.or(`name_en.ilike.%${filters.search}%,name_ar.ilike.%${filters.search}%`);
      }

      const { data, error } = await query;

      if (error) {
        return { success: false, error: error.message, data: [] };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return {
          success: false,
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.',
          data: []
        };
      }
      return { success: false, error: 'Failed to load products', data: [] };
    }
  },

  // Get single product by ID
  getProduct: async (productId) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          product_images (
            id,
            image_url,
            alt_text_en,
            alt_text_ar,
            display_order
          )
        `)
        .eq('id', productId)
        .eq('is_active', true)
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
      return { success: false, error: 'Failed to load product' };
    }
  },

  // Get products by category
  getProductsByCategory: async (category) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          product_images (
            id,
            image_url,
            alt_text_en,
            alt_text_ar,
            display_order
          )
        `)
        .eq('category', category)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        return { success: false, error: error.message, data: [] };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return {
          success: false,
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.',
          data: []
        };
      }
      return { success: false, error: 'Failed to load products by category', data: [] };
    }
  },

  // Get featured products (first 6 products)
  getFeaturedProducts: async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          product_images (
            id,
            image_url,
            alt_text_en,
            alt_text_ar,
            display_order
          )
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) {
        return { success: false, error: error.message, data: [] };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return {
          success: false,
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.',
          data: []
        };
      }
      return { success: false, error: 'Failed to load featured products', data: [] };
    }
  }
};

export default productService;