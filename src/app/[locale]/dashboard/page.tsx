import { createClient } from '@/utils/supabase/server';
import { redirect } from '@/i18n/routing';

export default async function DashboardIndexPage({
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

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user!.id)
    .single();

  const role = profile?.role || 'buyer_seller';

  if (role === 'employer') {
    redirect({ href: '/dashboard/employer', locale });
  } else if (role === 'employee') {
    redirect({ href: '/dashboard/employee', locale });
  } else {
    redirect({ href: '/dashboard/seller', locale });
  }
}
