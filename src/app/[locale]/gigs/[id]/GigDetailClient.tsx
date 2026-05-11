'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { orderGig } from '@/app/actions/gigs';
import { CheckCircle2, AlertCircle, Clock, Banknote, User } from 'lucide-react';

export default function GigDetailClient({ gig, locale }: { gig: any, locale: string }) {
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  async function handleOrder() {
    setIsPending(true);
    setMessage(null);

    const formData = new FormData();
    formData.append('gig_id', gig.id);
    formData.append('freelancer_id', gig.freelancer_id);
    formData.append('locale', locale);

    const result = await orderGig(formData);

    if (result?.error) {
      setMessage({ type: 'error', text: result.error });
    } else {
      setMessage({ type: 'success', text: 'Gig ordered successfully! Check your dashboard.' });
    }
    setIsPending(false);
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full w-fit uppercase">
            {gig.category}
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 leading-tight">{gig.title}</h1>
          
          <div className="flex items-center gap-4 py-4 border-y border-slate-100">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">
              {gig.profiles?.full_name?.charAt(0) || 'F'}
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Freelancer</div>
              <div className="font-bold text-slate-900">{gig.profiles?.full_name || 'Anonymous Freelancer'}</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-8 pt-2">
            <div className="space-y-1">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                <Clock className="w-3 h-3" /> Delivery Time
              </div>
              <div className="text-lg font-extrabold text-slate-900">{gig.delivery_days} Days</div>
            </div>
            <div className="space-y-1">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                <Banknote className="w-3 h-3" /> Price
              </div>
              <div className="text-lg font-extrabold text-primary">{gig.price.toLocaleString()} ETB</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Gig Description</h2>
          <div className="text-slate-600 leading-relaxed whitespace-pre-wrap text-lg">
            {gig.description}
          </div>
        </div>

        <div className="pt-6">
          <Button 
            onClick={handleOrder}
            disabled={isPending}
            className="w-full h-14 bg-slate-900 text-white hover:bg-slate-800 font-bold text-xl rounded-xl shadow-xl shadow-slate-200 transition-all active:scale-[0.98]"
          >
            {isPending ? 'Processing Order...' : 'Order This Gig Now'}
          </Button>
          
          {message && (
            <div className={`mt-6 p-4 rounded-xl flex items-start gap-3 ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
              {message.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
              <p className="text-sm font-medium">{message.text}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
