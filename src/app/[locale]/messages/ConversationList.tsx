'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { formatDistanceToNow } from 'date-fns';

export default function ConversationList({ initialConversations, currentUserId }: { initialConversations: any[], currentUserId: string }) {
  const t = useTranslations('Messages');

  if (initialConversations.length === 0) {
    return (
      <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
        <p className="text-slate-500 font-medium">{t('no_conversations')}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {initialConversations.map((conv) => {
        const otherPerson = conv.buyer_id === currentUserId ? conv.seller : conv.buyer;
        // The last message is the first one in the sorted list if we order by created_at desc in the query, 
        // but here it's nested. Let's find the actual latest one if available.
        const lastMessage = conv.messages && conv.messages.length > 0 ? conv.messages[conv.messages.length - 1] : null;
        
        // Count unread messages from others
        const unreadCount = conv.messages?.filter((m: any) => !m.read && m.sender_id !== currentUserId).length || 0;

        return (
          <Link 
            key={conv.id} 
            href={`/messages/${conv.id}`}
            className="group p-5 bg-white border border-slate-200 rounded-2xl hover:border-amber-500 hover:shadow-xl hover:shadow-amber-500/5 transition-all flex items-center gap-4"
          >
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 border border-slate-200 overflow-hidden shrink-0">
                {otherPerson?.avatar_url ? (
                  <img src={otherPerson.avatar_url} alt={otherPerson.full_name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xl uppercase">{otherPerson?.full_name?.charAt(0) || '?'}</span>
                )}
              </div>
              {unreadCount > 0 && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  {unreadCount}
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold text-slate-900 truncate group-hover:text-amber-600 transition-colors">
                  {otherPerson?.full_name || 'Anonymous'}
                </h3>
                {conv.last_message_at && (
                  <span className="text-xs text-slate-400 font-medium shrink-0">
                    {formatDistanceToNow(new Date(conv.last_message_at), { addSuffix: true })}
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full uppercase tracking-wider border border-amber-100/50">
                  {conv.product?.title}
                </span>
              </div>

              <p className={`text-sm truncate ${unreadCount > 0 ? 'text-slate-900 font-bold' : 'text-slate-500'}`}>
                {lastMessage?.content || 'No messages yet'}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
