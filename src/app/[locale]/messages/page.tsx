import { createClient } from '@/utils/supabase/server';
import { getTranslations } from 'next-intl/server';
import ConversationList from './ConversationList';
import { redirect } from 'next/navigation';
import { getLocale } from 'next-intl/server';

export default async function MessagesPage() {
  const supabase = await createClient();
  const t = await getTranslations('Messages');
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    const locale = await getLocale();
    redirect(`/${locale}/auth/login`);
  }

  // Fetch conversations with basic product and profile info
  const { data: conversations, error } = await supabase
    .from('conversations')
    .select(`
      *,
      buyer:profiles!conversations_buyer_id_fkey(full_name, avatar_url),
      seller:profiles!conversations_seller_id_fkey(full_name, avatar_url),
      product:products(title, image_url),
      messages(content, created_at, read, sender_id)
    `)
    .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`)
    .order('last_message_at', { ascending: false });

  if (error) {
    console.error('Error fetching conversations:', error);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 min-h-[70vh]">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900">{t('title')}</h1>
      </div>
      <ConversationList 
        initialConversations={conversations || []} 
        currentUserId={user!.id} 
      />
    </div>
  );
}
