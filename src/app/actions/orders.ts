'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from '@/i18n/routing';

export async function placeOrder(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  console.log('Place order request:', { user: user?.id, formData: Object.fromEntries(formData.entries()) });

  if (!user) {
    return { error: 'You must be logged in to place an order.' };
  }

  try {
    const productId = formData.get('productId') as string;
    const quantityStr = formData.get('quantity') as string;
    const paymentMethod = formData.get('paymentMethod') as string;
    const unitPriceStr = formData.get('unitPrice') as string;
    const locale = (formData.get('locale') as string) || 'en';

    console.log('Processing order:', { productId, quantityStr, paymentMethod, unitPriceStr, locale });

    const quantity = parseInt(quantityStr);
    const unitPrice = parseFloat(unitPriceStr);
    const totalPrice = unitPrice * quantity;

    if (isNaN(totalPrice)) {
      console.error('Invalid price or quantity:', { unitPrice, quantity });
      return { error: 'Invalid price or quantity.' };
    }

    const { error } = await supabase.from('orders').insert({
      buyer_id: user.id,
      product_id: productId,
      quantity,
      total_price: totalPrice,
      payment_method: paymentMethod,
      status: 'pending'
    });

    if (error) {
      console.error('Supabase error placing order:', error);
      return { error: error.message };
    }

    console.log('Order placed successfully');
    revalidatePath(`/${locale}/dashboard/buyer`);
    return { success: true };
  } catch (err: any) {
    console.error('Exception in placeOrder:', err);
    return { error: err.message || 'An unexpected error occurred.' };
  }
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

