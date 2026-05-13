'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getOrCreateConversation(productId: string, sellerId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'auth_required' };
  }

  if (user.id === sellerId) {
    return { error: 'cannot_message_self' };
  }

  // Check if conversation exists
  const { data: existing } = await supabase
    .from('conversations')
    .select('id')
    .eq('product_id', productId)
    .eq('buyer_id', user.id)
    .eq('seller_id', sellerId)
    .maybeSingle();

  if (existing) {
    return { conversationId: existing.id };
  }

  // Create new conversation
  const { data: newConv, error } = await supabase
    .from('conversations')
    .insert({
      product_id: productId,
      buyer_id: user.id,
      seller_id: sellerId
    })
    .select('id')
    .single();

  if (error) {
    return { error: error.message };
  }

  return { conversationId: newConv.id };
}

export async function sendMessage(conversationId: string, content: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: 'Not authenticated' };

  const { data: message, error } = await supabase
    .from('messages')
    .insert({
      conversation_id: conversationId,
      sender_id: user.id,
      content
    })
    .select()
    .single();

  if (error) return { error: error.message };

  // Update last_message_at on conversation
  await supabase
    .from('conversations')
    .update({ last_message_at: new Date().toISOString() })
    .eq('id', conversationId);

  return { success: true, message };
}

export async function markAsRead(conversationId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: 'Not authenticated' };

  const { error } = await supabase
    .from('messages')
    .update({ read: true })
    .eq('conversation_id', conversationId)
    .neq('sender_id', user.id)
    .eq('read', false);

  if (error) return { error: error.message };
  
  revalidatePath('/messages');
  return { success: true };
}

export async function getUnreadCount() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return 0;

  const { count, error } = await supabase
    .from('messages')
    .select('*', { count: 'exact', head: true })
    .eq('read', false)
    .neq('sender_id', user.id)
    .in('conversation_id', 
      supabase.from('conversations')
        .select('id')
        .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`)
    );

  if (error) return 0;
  return count || 0;
}
