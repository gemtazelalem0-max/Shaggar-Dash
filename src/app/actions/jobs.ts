'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createJob(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: 'Unauthorized' };

  const data = {
    employer_id: user.id,
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    company: formData.get('company') as string,
    salary_range: formData.get('salary_range') as string,
    type: formData.get('type') as string,
    city: formData.get('city') as string,
    status: 'active'
  };

  const { error } = await supabase.from('jobs').insert(data);
  if (error) return { error: error.message };

  const locale = formData.get('locale') as string || 'en';
  revalidatePath(`/${locale}/dashboard/employer`);
  revalidatePath(`/${locale}/jobs`);
  return { success: true };
}

export async function applyToJob(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: 'Unauthorized: You must be logged in to apply.' };

  const data = {
    job_id: formData.get('job_id') as string,
    applicant_id: user.id,
    cover_note: formData.get('cover_note') as string,
    status: 'pending'
  };

  const { error } = await supabase.from('applications').insert(data);
  if (error) return { error: error.message };

  const locale = formData.get('locale') as string || 'en';
  revalidatePath(`/${locale}/dashboard/employee`);
  return { success: true };
}

export async function updateApplicationStatus(applicationId: string, status: string, locale: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: 'Unauthorized' };

  const { error } = await supabase
    .from('applications')
    .update({ status })
    .eq('id', applicationId);

  if (error) return { error: error.message };

  revalidatePath(`/${locale}/dashboard/employer`);
  return { success: true };
}
