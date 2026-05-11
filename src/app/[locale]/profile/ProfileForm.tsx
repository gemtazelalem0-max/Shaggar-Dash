'use client';

import { useActionState } from 'react';
import { updateProfile } from '@/app/actions/profile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslations } from 'next-intl';

type ProfileState = { error?: string; success?: boolean } | null | undefined;
type ProfileData = {
  full_name?: string | null;
  phone?: string | null;
  city?: string | null;
  language?: string | null;
  bio?: string | null;
} | null;

export default function ProfileForm({ profile }: { profile: ProfileData }) {
  const t = useTranslations('Profile');

  const [state, formAction, isPending] = useActionState(async (_prevState: ProfileState, formData: FormData): Promise<ProfileState> => {
    return await updateProfile(formData);
  }, null);

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl shadow-slate-200/50 border-slate-100">
      <CardHeader>
        <CardTitle className="text-2xl font-extrabold text-slate-900">{t('title')}</CardTitle>
        <CardDescription className="font-medium text-slate-500">{t('description')}</CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-6">
          {state?.error && (
            <div className="p-3 rounded-lg bg-red-50 text-sm text-red-600 font-medium border border-red-100">
              {state.error}
            </div>
          )}
          {state?.success && (
            <div className="p-3 rounded-lg bg-green-50 text-sm text-green-600 font-medium border border-green-100">
              {t('success')}
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="full_name" className="text-xs font-bold text-slate-700">{t('full_name')}</Label>
              <Input id="full_name" name="full_name" defaultValue={profile?.full_name || ''} className="h-11 bg-slate-50/50 border-slate-200" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-xs font-bold text-slate-700">{t('phone')}</Label>
              <Input id="phone" name="phone" type="tel" defaultValue={profile?.phone || ''} className="h-11 bg-slate-50/50 border-slate-200" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="city" className="text-xs font-bold text-slate-700">{t('city')}</Label>
              <Input id="city" name="city" defaultValue={profile?.city || ''} className="h-11 bg-slate-50/50 border-slate-200" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="language" className="text-xs font-bold text-slate-700">{t('language')}</Label>
              <Select name="language" defaultValue={profile?.language || 'en'}>
                <SelectTrigger className="h-11 bg-slate-50/50 border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="am">Amharic (አማርኛ)</SelectItem>
                  <SelectItem value="om">Afaan Oromo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio" className="text-xs font-bold text-slate-700">{t('bio')}</Label>
            <Input id="bio" name="bio" defaultValue={profile?.bio || ''} className="h-11 bg-slate-50/50 border-slate-200" />
          </div>
        </CardContent>
        <CardFooter className="pt-2">
          <Button type="submit" disabled={isPending} className="w-full sm:w-auto h-11 px-8 bg-slate-900 text-white font-bold">
            {isPending ? t('saving') : t('save_changes')}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
