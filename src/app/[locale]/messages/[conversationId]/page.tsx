import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { getLocale } from 'next-intl/server';
import ChatInterface from './ChatInterface';

type Props = {
  params: Promise<{ conversationId: string, locale: string }>
}

export default async function ChatPage({ params }: Props) {
  const supabase = await createClient();
  const { conversationId } = await params;
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    const locale = await getLocale();
    redirect(`/${locale}/auth/login`);
  }

  // Fetch conversation with product and profiles
  // Using explicit foreign key names to be safe
  const { data: conversation, error } = await supabase
    .from('conversations')
    .select(`
      *,
      buyer:profiles!conversations_buyer_id_fkey(id, full_name, avatar_url),
      seller:profiles!conversations_seller_id_fkey(id, full_name, avatar_url),
      product:products(id, title, price, image_url)
    `)
    .eq('id', conversationId)
    .single();

  if (error || !conversation) {
    console.error('Conversation not found:', error);
    const locale = await getLocale();
    redirect(`/${locale}/messages`);
  }

  // Check if user is part of the conversation
  if (conversation.buyer_id !== user.id && conversation.seller_id !== user.id) {
    const locale = await getLocale();
    redirect(`/${locale}/messages`);
  }

  // Fetch messages
  const { data: messages } = await supabase
    .from('messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true });

  const otherPerson = conversation.buyer_id === user.id ? conversation.seller : conversation.buyer;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 h-[calc(100vh-120px)] flex flex-col">
      <ChatInterface 
        conversation={conversation}
        initialMessages={messages || []}
        currentUser={user}
        otherPerson={otherPerson}
      />
    </div>
  );
}
