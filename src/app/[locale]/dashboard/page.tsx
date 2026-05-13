import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { getLocale } from 'next-intl/server';

export default async function DashboardIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/${locale}/auth/login`);
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user!.id)
    .single();

  const role = profile?.role || 'buyer_seller';

  if (role === 'employer') {
    redirect(`/${locale}/dashboard/employer`);
  } else if (role === 'employee') {
    redirect(`/${locale}/dashboard/employee`);
  } else {
    redirect(`/${locale}/dashboard/seller`);
  }
}
