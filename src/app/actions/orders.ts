'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from '@/i18n/routing';

export async function placeOrder(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be logged in to place an order.' };
  }

  const productId = formData.get('productId') as string;
  const quantity = parseInt(formData.get('quantity') as string);
  const paymentMethod = formData.get('paymentMethod') as string;
  const unitPrice = parseFloat(formData.get('unitPrice') as string);
  const totalPrice = unitPrice * quantity;
  const locale = formData.get('locale') as string;

  const { error } = await supabase.from('orders').insert({
    buyer_id: user.id,
    product_id: productId,
    quantity,
    total_price: totalPrice,
    payment_method: paymentMethod,
    status: 'pending'
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/${locale}/dashboard/buyer`);
  return { success: true };
}

export async function updateOrderStatus(orderId: string, status: string, locale: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Not authenticated' };
  }

  // Check if user is the seller of the product in this order
  const { data: order } = await supabase
    .from('orders')
    .select('*, products(seller_id)')
    .eq('id', orderId)
    .single();

  const sellerId = (order?.products as { seller_id?: string } | null)?.seller_id;
  if (!order || sellerId !== user.id) {
    return { error: 'Unauthorized: You are not the seller of this product.' };
  }

  const { error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId);

  if (error) return { error: error.message };

  revalidatePath(`/${locale}/dashboard/seller`);
  revalidatePath(`/${locale}/dashboard/buyer`);
  return { success: true };
}

