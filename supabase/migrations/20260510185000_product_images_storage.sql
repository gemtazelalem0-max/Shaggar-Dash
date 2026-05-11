-- Product images storage bucket + RLS policies
-- Run this migration (or paste in Supabase SQL Editor) before using image uploads.

-- 1) Create public bucket used by product listings.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'product-images',
  'product-images',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- 2) Read policy (public product images are viewable by everyone).
drop policy if exists "Public read access for product images" on storage.objects;
create policy "Public read access for product images"
on storage.objects
for select
using (bucket_id = 'product-images');

-- 3) Upload policy (authenticated seller can upload only into their own folder).
-- Required path format: {auth.uid()}/{filename}
drop policy if exists "Seller upload to own folder" on storage.objects;
create policy "Seller upload to own folder"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'product-images'
  and (storage.foldername(name))[1] = auth.uid()::text
);

-- 4) Update/delete policies for owner-only management.
drop policy if exists "Seller update own files" on storage.objects;
create policy "Seller update own files"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'product-images'
  and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id = 'product-images'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "Seller delete own files" on storage.objects;
create policy "Seller delete own files"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'product-images'
  and (storage.foldername(name))[1] = auth.uid()::text
);
