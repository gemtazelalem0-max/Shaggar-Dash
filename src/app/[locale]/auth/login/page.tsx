'use client';

import { useActionState, useState, Suspense, type Dispatch, type SetStateAction } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { login } from '@/app/actions/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from '@/i18n/routing';
import { Activity, Mail, Lock, Eye, EyeOff } from 'lucide-react';

type FormState = { error?: string } | null | undefined;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(async (_prevState: FormState, formData: FormData): Promise<FormState> => {
    return await login(formData);
  }, null);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm state={state} formAction={formAction} isPending={isPending} showPassword={showPassword} setShowPassword={setShowPassword} />
    </Suspense>
  );
}

function LoginForm({ state, formAction, isPending, showPassword, setShowPassword }: {
  state: FormState;
  formAction: (payload: FormData) => void;
  isPending: boolean;
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
}) {
  const t = useTranslations('Auth');
  const tf = useTranslations('Footer');
  const searchParams = useSearchParams();
  const message = searchParams.get('message');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-amber-50/40 via-slate-50/80 to-blue-50/40 py-12 px-4">
      
      {/* Top Logo */}
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-8 h-8 bg-primary text-white rounded flex items-center justify-center shadow-sm shadow-primary/20">
            <Activity className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold text-primary">Shaggar Dash</span>
        </div>
        <span className="text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase">Ethiopia&apos;s Unified Platform</span>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-[420px] bg-white rounded-xl shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        
        <div className="p-8 sm:p-10 pb-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 mb-2">{t('login_title')}</h1>
            <p className="text-xs text-slate-500">{t('login_subtitle')}</p>
          </div>

          <form action={formAction} className="space-y-5">
            {message && (
              <div className="p-3 rounded-lg bg-green-50 text-sm text-green-600 font-medium border border-green-100">
                {message}
              </div>
            )}
            {state?.error && (
              <div className="p-3 rounded-lg bg-red-50 text-sm text-red-600 font-medium border border-red-100">
                {state.error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-bold text-slate-700">{t('email')}</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-slate-400" />
                </div>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  required 
                  className="pl-10 h-11 text-sm bg-slate-50/50 border-slate-200 focus-visible:ring-primary/20 focus-visible:border-primary"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs font-bold text-slate-700">{t('password')}</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-slate-400" />
                </div>
                <Input 
                  id="password" 
                  name="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  required 
                  className="pl-10 pr-10 h-11 text-sm tracking-widest bg-slate-50/50 border-slate-200 focus-visible:ring-primary/20 focus-visible:border-primary"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="w-3.5 h-3.5 rounded border-slate-300 text-primary focus:ring-primary cursor-pointer accent-primary" />
                <Label htmlFor="remember" className="text-[11px] font-medium text-slate-500 cursor-pointer">
                  {t('remember_me')}
                </Label>
              </div>
              <Link href="#" className="text-[11px] font-bold text-primary hover:underline">
                {t('forgot_password')}
              </Link>
            </div>

            <Button type="submit" className="w-full h-11 bg-primary text-white hover:bg-primary/90 font-bold text-sm shadow-md shadow-primary/20 mt-2" disabled={isPending}>
              {isPending ? t('sign_in_loading') : t('sign_in')}
            </Button>
            
            {/* Or Continue With */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-[10px]">
                <span className="bg-white px-3 text-slate-400 font-bold uppercase tracking-widest">{t('or_continue_with')}</span>
              </div>
            </div>

            <Button type="button" variant="outline" className="w-full h-11 text-xs font-bold bg-slate-50/50 border-slate-200 text-slate-700 hover:bg-slate-100">
              <span className="mr-2 text-blue-600 font-extrabold text-lg flex items-center">G</span> {t('google_sign_in')}
            </Button>
          </form>
        </div>
        
        {/* Card Footer (Gray Section) */}
        <div className="bg-slate-50/80 border-t border-slate-100 p-4 text-center">
          <p className="text-xs text-slate-500">
            {t('no_account')} <Link href="/auth/signup" className="text-primary font-bold hover:underline">{t('sign_up_free')}</Link>
          </p>
        </div>
      </div>

      {/* Footer Links */}
      <div className="mt-8 text-center text-[10px] font-semibold text-slate-500 space-y-3">
        <div className="flex justify-center gap-4">
          <Link href="#" className="hover:text-primary transition-colors">{tf('privacy')}</Link>
          <Link href="#" className="hover:text-primary transition-colors">{tf('terms')}</Link>
          <Link href="#" className="hover:text-primary transition-colors">{tf('help')}</Link>
        </div>
        <div className="text-[9px] tracking-widest text-slate-400 uppercase">
          {tf('location')}
        </div>
      </div>
    </div>
  );
}
