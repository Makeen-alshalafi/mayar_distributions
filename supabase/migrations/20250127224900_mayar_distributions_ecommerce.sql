-- Location: supabase/migrations/20250127224900_mayar_distributions_ecommerce.sql
-- Complete E-commerce Schema for Mayar Distributions
-- Integration Type: Complete new schema for bilingual e-commerce platform

-- 1. Types and Enums
CREATE TYPE public.user_role AS ENUM ('admin', 'manager', 'customer');
CREATE TYPE public.order_status AS ENUM ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled');
CREATE TYPE public.payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');
CREATE TYPE public.product_category AS ENUM ('distributions', 'custom_gifts', 'thermal_printing');

-- 2. User Profiles (Critical intermediary table)
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    phone TEXT,
    role public.user_role DEFAULT 'customer'::public.user_role,
    preferred_language TEXT DEFAULT 'en',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Product Tables
CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_en TEXT NOT NULL,
    name_ar TEXT NOT NULL,
    description_en TEXT,
    description_ar TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0,
    category public.product_category NOT NULL,
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    is_customizable BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.product_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text_en TEXT,
    alt_text_ar TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 4. Cart Tables
CREATE TABLE public.carts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.cart_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cart_id UUID REFERENCES public.carts(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    customization_text TEXT,
    customization_image_url TEXT,
    price_at_time DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(cart_id, product_id)
);

-- 5. Order Tables
CREATE TABLE public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    order_number TEXT NOT NULL UNIQUE,
    payment_intent_id TEXT,
    subtotal DECIMAL(10,2) NOT NULL,
    shipping_cost DECIMAL(10,2) DEFAULT 0,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL,
    order_status public.order_status DEFAULT 'pending'::public.order_status,
    payment_status public.payment_status DEFAULT 'pending'::public.payment_status,
    shipping_address JSONB,
    billing_address JSONB,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    product_name_en TEXT NOT NULL,
    product_name_ar TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    customization_text TEXT,
    customization_image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 6. Contact Messages
CREATE TABLE public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    file_url TEXT,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 7. Wishlists
CREATE TABLE public.wishlists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, product_id)
);

-- 8. Essential Indexes
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_products_active ON public.products(is_active);
CREATE INDEX idx_product_images_product_id ON public.product_images(product_id);
CREATE INDEX idx_carts_user_id ON public.carts(user_id);
CREATE INDEX idx_cart_items_cart_id ON public.cart_items(cart_id);
CREATE INDEX idx_orders_user_id ON public.orders(user_id);
CREATE INDEX idx_orders_status ON public.orders(order_status);
CREATE INDEX idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX idx_wishlists_user_id ON public.wishlists(user_id);

-- 9. Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;

-- 10. Helper Functions
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.user_profiles up
    WHERE up.id = auth.uid() AND up.role = 'admin'
)
$$;

CREATE OR REPLACE FUNCTION public.owns_cart(cart_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.carts c
    WHERE c.id = cart_uuid AND c.user_id = auth.uid()
)
$$;

CREATE OR REPLACE FUNCTION public.owns_order(order_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.orders o
    WHERE o.id = order_uuid AND o.user_id = auth.uid()
)
$$;

CREATE OR REPLACE FUNCTION public.can_access_cart_item(item_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.cart_items ci
    JOIN public.carts c ON ci.cart_id = c.id
    WHERE ci.id = item_uuid AND c.user_id = auth.uid()
)
$$;

-- 11. RLS Policies
-- User profiles
CREATE POLICY "users_manage_own_profile"
ON public.user_profiles
FOR ALL
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "admins_view_all_profiles"
ON public.user_profiles
FOR SELECT
USING (public.is_admin());

-- Products (public read, admin write)
CREATE POLICY "public_can_view_active_products"
ON public.products
FOR SELECT
USING (is_active = true);

CREATE POLICY "admins_manage_products"
ON public.products
FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Product images (public read, admin write)
CREATE POLICY "public_can_view_product_images"
ON public.product_images
FOR SELECT
TO public
USING (true);

CREATE POLICY "admins_manage_product_images"
ON public.product_images
FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Carts (user-specific)
CREATE POLICY "users_manage_own_cart"
ON public.carts
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Cart items
CREATE POLICY "users_manage_own_cart_items"
ON public.cart_items
FOR ALL
USING (public.can_access_cart_item(id))
WITH CHECK (public.can_access_cart_item(id));

-- Orders
CREATE POLICY "users_view_own_orders"
ON public.orders
FOR SELECT
USING (public.owns_order(id));

CREATE POLICY "users_create_orders"
ON public.orders
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "admins_manage_all_orders"
ON public.orders
FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Order items
CREATE POLICY "users_view_own_order_items"
ON public.order_items
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.orders o
        WHERE o.id = order_id AND public.owns_order(o.id)
    )
);

CREATE POLICY "admins_manage_order_items"
ON public.order_items
FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Contact messages (admin only)
CREATE POLICY "anyone_can_create_contact_message"
ON public.contact_messages
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "admins_manage_contact_messages"
ON public.contact_messages
FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Wishlists
CREATE POLICY "users_manage_own_wishlist"
ON public.wishlists
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 12. Functions for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, role)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'role', 'customer')::public.user_role
  );
  RETURN NEW;
END;
$$;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 13. Order number generation function
CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
    order_num TEXT;
BEGIN
    order_num := 'MYR-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(EXTRACT(EPOCH FROM NOW())::BIGINT % 10000, 4, '0');
    RETURN order_num;
END;
$$;

-- 14. Mock Data
DO $$
DECLARE
    admin_uuid UUID := gen_random_uuid();
    customer_uuid UUID := gen_random_uuid();
    product1_uuid UUID := gen_random_uuid();
    product2_uuid UUID := gen_random_uuid();
    product3_uuid UUID := gen_random_uuid();
    cart_uuid UUID := gen_random_uuid();
    order_uuid UUID := gen_random_uuid();
BEGIN
    -- Create auth users with required fields
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES
        (admin_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'admin@mayardistributions.com', crypt('Admin123!', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "مدير النظام", "role": "admin"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (customer_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'customer@example.com', crypt('Customer123!', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "أحمد محمد", "role": "customer"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

    -- Sample products
    INSERT INTO public.products (id, name_en, name_ar, description_en, description_ar, price, stock, category, is_customizable) VALUES
        (product1_uuid, 'Custom Printed Mug', 'كوب مطبوع مخصص', 'High-quality ceramic mug with custom printing', 'كوب سيراميك عالي الجودة مع طباعة مخصصة', 25.00, 100, 'custom_gifts', true),
        (product2_uuid, 'Branded Keychain', 'سلسلة مفاتيح مزينة بالعلامة التجارية', 'Durable metal keychain with logo engraving', 'سلسلة مفاتيح معدنية متينة مع نقش الشعار', 15.00, 200, 'distributions', true),
        (product3_uuid, 'Thermal Receipt Paper', 'ورق إيصالات حراري', 'High-quality thermal paper for receipt printing', 'ورق حراري عالي الجودة لطباعة الإيصالات', 35.00, 50, 'thermal_printing', false);

    -- Sample cart and cart items
    INSERT INTO public.carts (id, user_id) VALUES (cart_uuid, customer_uuid);
    
    INSERT INTO public.cart_items (cart_id, product_id, quantity, price_at_time, customization_text) VALUES
        (cart_uuid, product1_uuid, 2, 25.00, 'Print: Company Logo'),
        (cart_uuid, product2_uuid, 5, 15.00, 'Engrave: Best Employee 2024');

    -- Sample order
    INSERT INTO public.orders (
        id, user_id, order_number, subtotal, shipping_cost, tax_amount, total_amount,
        order_status, payment_status, shipping_address
    ) VALUES (
        order_uuid, customer_uuid, public.generate_order_number(), 125.00, 10.00, 10.80, 145.80,
        'confirmed'::public.order_status, 'completed'::public.payment_status,
        '{"name": "أحمد محمد", "address": "شارع الملك فهد", "city": "الرياض", "country": "السعودية"}'::jsonb
    );

    INSERT INTO public.order_items (order_id, product_id, product_name_en, product_name_ar, quantity, unit_price, total_price, customization_text) VALUES
        (order_uuid, product1_uuid, 'Custom Printed Mug', 'كوب مطبوع مخصص', 2, 25.00, 50.00, 'Print: Company Logo'),
        (order_uuid, product2_uuid, 'Branded Keychain', 'سلسلة مفاتيح مزينة بالعلامة التجارية', 5, 15.00, 75.00, 'Engrave: Best Employee 2024');

    -- Sample wishlist
    INSERT INTO public.wishlists (user_id, product_id) VALUES
        (customer_uuid, product3_uuid);

    -- Sample contact message
    INSERT INTO public.contact_messages (name, email, subject, message) VALUES
        ('سارة أحمد', 'sara@example.com', 'استفسار عن الطباعة الحرارية', 'أود معرفة المزيد عن خدمات الطباعة الحرارية المتاحة.');
        
EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Foreign key error: %', SQLERRM;
    WHEN unique_violation THEN
        RAISE NOTICE 'Unique constraint error: %', SQLERRM;
    WHEN OTHERS THEN
        RAISE NOTICE 'Unexpected error: %', SQLERRM;
END $$;