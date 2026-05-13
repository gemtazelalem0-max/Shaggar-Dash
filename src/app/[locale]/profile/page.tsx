import { createClient } from '@/utils/supabase/server';
import { redirect } from '@/i18n/routing';
import ProfileForm from './ProfileForm';

type Props = {
  params: Promise<{ locale: string }>
}

export default async function ProfilePage({ params }: Props) {
  const { locale } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect({ href: '/auth/login', locale });
    return null;
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return (
    <div className="container mx-auto py-12 px-4">
      <ProfileForm profile={profile} />
    </div>
  );
}
