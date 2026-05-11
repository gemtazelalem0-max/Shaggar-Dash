'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createProduct(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: 'Unauthorized: You must be logged in to create a listing.' };

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (!profile || profile.role !== 'buyer_seller') {
    return { error: 'Only seller accounts can upload product images.' };
  }

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const price = parseFloat(formData.get('price') as string);
  const category = formData.get('category') as string;
  const city = formData.get('city') as string;
  const locale = formData.get('locale') as string;
  const imageFiles = formData.getAll('images').filter((entry): entry is File => entry instanceof File);

  if (imageFiles.length === 0) {
    return { error: 'Please upload at least one product image.' };
  }

  if (imageFiles.length > 5) {
    return { error: 'You can upload up to 5 images only.' };
  }

  const allowedMimeTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);
  const uploadedUrls: string[] = [];

  for (const file of imageFiles) {
    if (!allowedMimeTypes.has(file.type)) {
      return { error: `Unsupported image type: ${file.type || 'unknown'}. Allowed: jpg, png, webp.` };
    }
  }

  for (const file of imageFiles) {
    const extension = (file.name.split('.').pop() || '').toLowerCase();
    const safeExtension = extension || (file.type === 'image/png' ? 'png' : file.type === 'image/webp' ? 'webp' : 'jpg');
    const path = `${user.id}/${crypto.randomUUID()}.${safeExtension}`;
    const bytes = new Uint8Array(await file.arrayBuffer());

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(path, bytes, {
        contentType: file.type || `image/${safeExtension}`,
        upsert: false,
      });

    if (uploadError) {
      return { error: `Failed to upload image: ${uploadError.message}` };
    }

    const { data: publicUrlData } = supabase.storage
      .from('product-images')
      .getPublicUrl(path);

    uploadedUrls.push(publicUrlData.publicUrl);
  }

  const insertData = {
    seller_id: user.id,
    title,
    description,
    price,
    category,
    city,
    image_url: uploadedUrls.join(','),
    is_active: true
  };

  const { error } = await supabase.from('products').insert(insertData);

  if (error) return { error: `Failed to create listing: ${error.message}` };

  revalidatePath(`/${locale}/dashboard/seller`);
  return { success: true };
}

export async function updateProductStatus(productId: string, isActive: boolean, locale: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: 'Unauthorized' };

  const { error } = await supabase
    .from('products')
    .update({ is_active: isActive })
    .eq('id', productId)
    .eq('seller_id', user.id);

  if (error) return { error: error.message };

  revalidatePath(`/${locale}/dashboard/seller`);
  return { success: true };
}

export async function deleteProduct(productId: string, locale: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: 'Unauthorized' };

  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', productId)
    .eq('seller_id', user.id);

  if (error) return { error: error.message };

  revalidatePath(`/${locale}/dashboard/seller`);
  return { success: true };
}

export async function updateProduct(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: 'Unauthorized' };

  const productId = formData.get('id') as string;
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const price = parseFloat(formData.get('price') as string);
  const category = formData.get('category') as string;
  const city = formData.get('city') as string;
  const locale = formData.get('locale') as string;
  const existingImageUrl = formData.get('existing_image_url') as string;
  
  const imageFiles = formData.getAll('images').filter((entry): entry is File => entry instanceof File && entry.size > 0);

  let finalImageUrl = existingImageUrl;

  if (imageFiles.length > 0) {
    const uploadedUrls: string[] = [];
    for (const file of imageFiles) {
      const path = `${user.id}/${crypto.randomUUID()}.${file.name.split('.').pop()}`;
      const bytes = new Uint8Array(await file.arrayBuffer());
      const { error: uploadError } = await supabase.storage.from('product-images').upload(path, bytes);
      if (!uploadError) {
        const { data: publicUrlData } = supabase.storage.from('product-images').getPublicUrl(path);
        uploadedUrls.push(publicUrlData.publicUrl);
      }
    }
    if (uploadedUrls.length > 0) {
      finalImageUrl = uploadedUrls.join(',');
    }
  }

  const updateData = {
    title,
    description,
    price,
    category,
    city,
    image_url: finalImageUrl,
  };

  const { error } = await supabase
    .from('products')
    .update(updateData)
    .eq('id', productId)
    .eq('seller_id', user.id);

  if (error) return { error: error.message };

  revalidatePath(`/${locale}/dashboard/seller`);
  revalidatePath(`/${locale}/marketplace`);
  return { success: true };
}

