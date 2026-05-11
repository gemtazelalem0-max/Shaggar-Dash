import { createClient } from '@/utils/supabase/server';
import GigsClient from './GigsClient';

export default async function GigsPage() {
  const supabase = await createClient();

  const { data: gigs } = await supabase
    .from('gigs')
    .select('*, profiles(full_name)')
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  return <GigsClient initialGigs={gigs || []} />;
}
