'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createGig(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: 'Unauthorized' };

  const data = {
    freelancer_id: user.id,
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    price: parseFloat(formData.get('price') as string),
    delivery_days: parseInt(formData.get('delivery_days') as string),
    category: formData.get('category') as string,
    status: 'active'
  };

  const { error } = await supabase.from('gigs').insert(data);
  if (error) return { error: error.message };

  const locale = formData.get('locale') as string || 'en';
  revalidatePath(`/${locale}/dashboard/freelancer`);
  revalidatePath(`/${locale}/gigs`);
  return { success: true };
}

export async function orderGig(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: 'Unauthorized: Log in to order.' };

  const gigId = formData.get('gig_id') as string;
  const freelancerId = formData.get('freelancer_id') as string;

  const data = {
    gig_id: gigId,
    client_id: user.id,
    freelancer_id: freelancerId,
    payment_status: 'pending',
    delivery_status: 'pending'
  };

  const { error } = await supabase.from('gig_orders').insert(data);
  if (error) return { error: error.message };

  const locale = formData.get('locale') as string || 'en';
  revalidatePath(`/${locale}/dashboard/buyer`); // Assuming buyers see gig orders too
  return { success: true };
}

export async function updateGigDeliveryStatus(orderId: string, status: string, locale: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: 'Unauthorized' };

  const { error } = await supabase
    .from('gig_orders')
    .update({ delivery_status: status })
    .eq('id', orderId)
    .eq('freelancer_id', user.id);

  if (error) return { error: error.message };

  revalidatePath(`/${locale}/dashboard/freelancer`);
  return { success: true };
}
