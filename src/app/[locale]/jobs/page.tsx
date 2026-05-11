import { createClient } from '@/utils/supabase/server';
import JobsClient from './JobsClient';

export default async function JobsPage() {
  const supabase = await createClient();

  const { data: jobs } = await supabase
    .from('jobs')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  return <JobsClient initialJobs={jobs || []} />;
}
