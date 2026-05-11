'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createGig } from '@/app/actions/gigs';
import { useRouter } from '@/i18n/routing';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function CreateGigForm({ locale }: { locale: string }) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    formData.append('locale', locale);

    const result = await createGig(formData);

    if (result?.error) {
      setMessage({ type: 'error', text: result.error });
      setIsPending(false);
    } else {
      setMessage({ type: 'success', text: 'Gig posted successfully!' });
      setTimeout(() => {
        router.push('/dashboard/employee');
      }, 1500);
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Offer a New Gig</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Gig Title</Label>
          <Input id="title" name="title" placeholder="I will design a professional logo for you" required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input id="category" name="category" placeholder="e.g. Design, Development" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Starting Price (ETB)</Label>
            <Input id="price" name="price" type="number" placeholder="5000" required />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="delivery_days">Delivery Time (Days)</Label>
          <Input id="delivery_days" name="delivery_days" type="number" placeholder="3" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Full Gig Description</Label>
          <Textarea id="description" name="description" placeholder="Describe your service in detail..." className="min-h-[200px]" required />
        </div>

        <Button type="submit" disabled={isPending} className="w-full h-12 font-bold text-lg">
          {isPending ? 'Posting...' : 'Post Gig Offer'}
        </Button>
      </form>

      {message && (
        <div className={`p-4 rounded-xl flex items-start gap-3 ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
          <p className="text-sm font-medium">{message.text}</p>
        </div>
      )}
    </div>
  );
}
