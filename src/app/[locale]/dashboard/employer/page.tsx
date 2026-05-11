import { createClient } from '@/utils/supabase/server';
import { redirect } from '@/i18n/routing';
import EmployerDashboardClient from './EmployerDashboardClient';

export default async function EmployerDashboard({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect({ href: '/auth/login', locale });
  }

  // Fetch jobs
  const { data: jobs } = await supabase
    .from('jobs')
    .select('*')
    .eq('employer_id', user!.id)
    .order('created_at', { ascending: false });

  // Fetch applications for all employer's jobs
  const { data: applications } = await supabase
    .from('applications')
    .select('*, jobs!inner(employer_id, title), profiles(full_name)')
    .eq('jobs.employer_id', user!.id)
    .order('created_at', { ascending: false });

  return (
    <EmployerDashboardClient 
      jobs={jobs || []} 
      applications={applications || []} 
      locale={locale} 
    />
  );
}
