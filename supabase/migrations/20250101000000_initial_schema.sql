/*
  # [Initial Schema: Products and Categories]
  This migration sets up the initial database structure for the e-commerce sticker shop. It creates the 'products' and 'categories' tables, along with a join table 'product_categories' to manage the relationship between them. It also enables Row Level Security (RLS) and defines policies to allow public read access to the data.

  ## Query Description:
  This is a foundational setup and is safe to run on a new project. It does not modify or delete any existing data, as it only creates new tables and policies. No backup is required for an initial setup.

  ## Metadata:
  - Schema-Category: "Structural"
  - Impact-Level: "Low"
  - Requires-Backup: false
  - Reversible: true (the tables can be dropped manually if needed)

  ## Structure Details:
  - Creates table: `public.categories` (id, name, created_at)
  - Creates table: `public.products` (id, name, description, price, image_url, is_featured, created_at)
  - Creates table: `public.product_categories` (product_id, category_id)
  - Adds foreign key constraints between the tables.

  ## Security Implications:
  - RLS Status: Enabled on all three tables.
  - Policy Changes: Yes, new policies are created.
  - Policies Created:
    - "Allow public read access to categories" on `public.categories`
    - "Allow public read access to products" on `public.products`
    - "Allow public read access to product_categories" on `public.product_categories`
  - Auth Requirements: These policies do not require authentication for read operations.

  ## Performance Impact:
  - Indexes: Primary key indexes are automatically created. No other custom indexes are added in this migration.
  - Triggers: None.
  - Estimated Impact: Low. The setup is standard and should not cause performance issues.
*/

-- 1. Categories Table
CREATE TABLE public.categories (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    name text NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT categories_pkey PRIMARY KEY (id),
    CONSTRAINT categories_name_key UNIQUE (name)
);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to categories" ON public.categories FOR SELECT USING (true);
COMMENT ON TABLE public.categories IS 'Stores product categories for stickers.';

-- 2. Products Table
CREATE TABLE public.products (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    name text NOT NULL,
    description text,
    price numeric NOT NULL,
    image_url text NOT NULL,
    is_featured boolean NOT NULL DEFAULT false,
    CONSTRAINT products_pkey PRIMARY KEY (id)
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to products" ON public.products FOR SELECT USING (true);
COMMENT ON TABLE public.products IS 'Stores individual sticker products.';


-- 3. Product Categories Junction Table
CREATE TABLE public.product_categories (
    product_id uuid NOT NULL,
    category_id uuid NOT NULL,
    CONSTRAINT product_categories_pkey PRIMARY KEY (product_id, category_id),
    CONSTRAINT product_categories_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE,
    CONSTRAINT product_categories_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE CASCADE
);

ALTER TABLE public.product_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to product_categories" ON public.product_categories FOR SELECT USING (true);
COMMENT ON TABLE public.product_categories IS 'Relates products to their categories.';
