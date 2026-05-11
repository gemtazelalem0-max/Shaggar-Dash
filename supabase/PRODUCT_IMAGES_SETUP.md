# Product Images Storage Setup

1. Open your Supabase project dashboard.
2. Go to **SQL Editor**.
3. Run the migration in `supabase/migrations/20260510185000_product_images_storage.sql`.
4. Confirm bucket exists:
   - **Storage** -> bucket named `product-images`
   - Public bucket enabled
   - Allowed mime types: `image/jpeg`, `image/png`, `image/webp`
5. Confirm RLS policies on `storage.objects` were created:
   - `Public read access for product images`
   - `Seller upload to own folder`
   - `Seller update own files`
   - `Seller delete own files`

## Folder Rule

Uploads are restricted to seller-owned folders only:

`product-images/{auth.uid()}/{filename}`

This is enforced by both:
- server action auth checks
- storage RLS policies
