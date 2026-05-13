import { createClient } from '@/utils/supabase/server';
import GigDetailClient from './GigDetailClient';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ id: string, locale: string }>
}

export default async function GigPage({ params }: Props) {
  const { id, locale } = await params;
  const supabase = await createClient();

  const { data: gig } = await supabase
    .from('gigs')
    .select('*, profiles(full_name)')
    .eq('id', id)
    .single();

  if (!gig) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 pt-12">
      <div className="container mx-auto px-4">
        <GigDetailClient gig={gig} locale={locale} />
      </div>
    </div>
  );
}
