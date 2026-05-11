-- Create products table
CREATE TABLE public.products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  seller_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  price numeric NOT NULL,
  category text,
  city text,
  image_url text,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create orders table
CREATE TABLE public.orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  buyer_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  product_id uuid REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  quantity integer DEFAULT 1 NOT NULL,
  total_price numeric NOT NULL,
  payment_method text NOT NULL,
  status text DEFAULT 'pending' NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Products Policies
CREATE POLICY "Products are viewable by everyone."
  ON products FOR SELECT
  USING ( true );

CREATE POLICY "Users can insert their own products."
  ON products FOR INSERT
  WITH CHECK ( auth.uid() = seller_id );

CREATE POLICY "Users can update their own products."
  ON products FOR UPDATE
  USING ( auth.uid() = seller_id );

CREATE POLICY "Users can delete their own products."
  ON products FOR DELETE
  USING ( auth.uid() = seller_id );

-- Orders Policies
CREATE POLICY "Users can view their own orders (as buyer or seller)."
  ON orders FOR SELECT
  USING ( 
    auth.uid() = buyer_id OR 
    auth.uid() IN (SELECT seller_id FROM products WHERE id = product_id)
  );

CREATE POLICY "Buyers can insert their own orders."
  ON orders FOR INSERT
  WITH CHECK ( auth.uid() = buyer_id );

CREATE POLICY "Sellers can update order status."
  ON orders FOR UPDATE
  USING ( auth.uid() IN (SELECT seller_id FROM products WHERE id = product_id) );
