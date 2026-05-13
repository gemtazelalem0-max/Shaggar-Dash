'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { createClient } from '@/utils/supabase/client';
import { sendMessage, markAsRead } from '@/app/actions/messages';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, ChevronLeft, Package } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { format } from 'date-fns';

export default function ChatInterface({ conversation, initialMessages, currentUser, otherPerson }: any) {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('Messages');
  const supabase = createClient();

  useEffect(() => {
    // Scroll to bottom
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    // Mark messages as read when opening
    markAsRead(conversation.id);

    // Subscribe to new messages
    const channel = supabase
      .channel(`conversation:${conversation.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversation.id}`,
        },
        (payload) => {
          const newMsg = payload.new;
          setMessages((prev: any) => {
            // Check if message already exists
            if (prev.find((m: any) => m.id === newMsg.id)) return prev;
            return [...prev, newMsg];
          });
          
          if (newMsg.sender_id !== currentUser.id) {
            markAsRead(conversation.id);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversation.id, currentUser.id, supabase]);

  async function handleSendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!newMessage.trim() || isSending) return;

    const content = newMessage.trim();
    setNewMessage('');
    setIsSending(true);

    // Optimistic update
    const tempId = Math.random().toString();
    const optimisticMsg = {
      id: tempId,
      content,
      sender_id: currentUser.id,
      created_at: new Date().toISOString(),
      conversation_id: conversation.id,
      read: false
    };
    
    setMessages((prev: any) => [...prev, optimisticMsg]);

    const result = await sendMessage(conversation.id, content);
    
    if (result.error) {
      // Remove optimistic message on error
      setMessages((prev: any) => prev.filter((m: any) => m.id !== tempId));
      console.error(result.error);
    } else if (result.message) {
      // Replace optimistic message with actual message
      setMessages((prev: any) => prev.map((m: any) => m.id === tempId ? result.message : m));
    }
    
    setIsSending(false);
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Link href="/messages" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ChevronLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 border border-slate-200 overflow-hidden">
              {otherPerson?.avatar_url ? (
                <img src={otherPerson.avatar_url} alt={otherPerson.full_name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-lg uppercase">{otherPerson?.full_name?.charAt(0) || '?'}</span>
              )}
            </div>
            <div>
              <h2 className="font-bold text-slate-900 leading-tight truncate max-w-[120px] sm:max-w-none">
                {otherPerson?.full_name}
              </h2>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Active Now</p>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-3 p-2 px-3 bg-slate-50 rounded-2xl border border-slate-100 max-w-[300px]">
          <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 overflow-hidden shrink-0">
             {conversation.product?.image_url ? (
                <img src={conversation.product.image_url.split(',')[0]} alt="" className="w-full h-full object-cover" />
             ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-100"><Package className="w-4 h-4 text-slate-400" /></div>
             )}
          </div>
          <div className="text-right min-w-0">
            <p className="text-[11px] font-bold text-slate-900 truncate">{conversation.product?.title}</p>
            <p className="text-[11px] font-extrabold text-amber-600">{conversation.product?.price?.toLocaleString()} ETB</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30"
      >
        <div className="py-4 text-center">
          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em]">Conversation Started</p>
        </div>
        
        {messages.map((msg: any) => {
          const isMine = msg.sender_id === currentUser.id;
          return (
            <div 
              key={msg.id}
              className={`flex ${isMine ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
            >
              <div className={`max-w-[85%] sm:max-w-[70%] space-y-1`}>
                <div 
                  className={`p-3.5 px-5 rounded-2xl shadow-sm ${
                    isMine 
                      ? 'bg-amber-500 text-white rounded-tr-none shadow-amber-200' 
                      : 'bg-white text-slate-900 border border-slate-200 rounded-tl-none'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                </div>
                <p className={`text-[10px] font-bold text-slate-400 ${isMine ? 'text-right' : 'text-left'} px-1`}>
                  {format(new Date(msg.created_at), 'HH:mm')}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={t('type_message')}
            className="flex-1 h-12 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-amber-500 focus-visible:bg-white transition-all"
          />
          <Button 
            type="submit" 
            disabled={!newMessage.trim() || isSending}
            className="h-12 w-12 rounded-xl bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-100 transition-all active:scale-90 flex items-center justify-center shrink-0"
          >
            <Send className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
