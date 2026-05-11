'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from '@/i18n/routing';
import { getLocale } from 'next-intl/server';
import { revalidatePath } from 'next/cache';

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: error.message };
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    
    // Default to buyer_seller dashboard if no role is found
    const role = profile?.role || 'buyer_seller';
    const rolePath = role === 'buyer_seller' ? 'seller' : role;
    const locale = await getLocale();
    redirect({ href: `/dashboard/${rolePath}`, locale });
  }
  
  const locale = await getLocale();
  redirect({ href: '/profile', locale });
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        full_name: formData.get('full_name') as string,
        phone: formData.get('phone') as string,
        role: formData.get('role') as string,
      }
    }
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return { error: error.message };
  }

  // After signup, redirect to login or dashboard
  const locale = await getLocale();
  redirect({ href: '/auth/login?message=Check email to continue sign in process', locale });
}

export async function signout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  const locale = await getLocale();
  redirect({ href: '/auth/login', locale });
}
