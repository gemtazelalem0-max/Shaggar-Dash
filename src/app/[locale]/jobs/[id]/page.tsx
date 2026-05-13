import { createClient } from '@/utils/supabase/server';
import JobDetailClient from './JobDetailClient';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ id: string, locale: string }>
}

export default async function JobPage({ params }: Props) {
  const { id, locale } = await params;
  const supabase = await createClient();

  const { data: job } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', id)
    .single();

  if (!job) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 pt-12">
      <div className="container mx-auto px-4">
        <JobDetailClient job={job} locale={locale} />
      </div>
    </div>
  );
}
