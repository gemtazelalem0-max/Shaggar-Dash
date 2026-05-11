'use client';

import { useActionState, useState } from 'react';
import { useTranslations } from 'next-intl';
import { signup } from '@/app/actions/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from '@/i18n/routing';
import { ShoppingBag, Hammer, Users, Activity, Globe, Check, CheckCircle2 } from 'lucide-react';

type FormState = { error?: string } | null;

export default function SignupPage() {
  const t = useTranslations('Auth');
  const tf = useTranslations('Footer');
  const [selectedRole, setSelectedRole] = useState('buyer_seller');
  
  const [state, formAction, isPending] = useActionState(async (_prevState: FormState, formData: FormData) => {
    return await signup(formData);
  }, null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-amber-50/40 via-slate-50/80 to-blue-50/40 py-12 px-4">
      
      {/* Top Logo */}
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-primary text-white rounded flex items-center justify-center shadow-sm shadow-primary/20">
          <Activity className="w-5 h-5" />
        </div>
        <span className="text-xl font-bold text-primary">Shaggar Dash</span>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-[700px] bg-white rounded-xl shadow-2xl shadow-slate-200/50 p-8 sm:p-10 border border-slate-100">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-2">{t('signup_title')}</h1>
          <p className="text-sm text-slate-500">{t('signup_subtitle')}</p>
        </div>

        <form action={formAction} className="space-y-8">
          {/* Hidden input for the custom role selector */}
          <input type="hidden" name="role" value={selectedRole} />
          
          {state?.error && (
            <div className="p-3 rounded-lg bg-red-50 text-sm text-red-600 font-medium border border-red-100">
              {state.error}
            </div>
          )}
          
          {/* Section 1: Select Your Path */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-xs font-bold text-slate-500 tracking-widest uppercase">{t('select_path')}</Label>
              <span className="text-[10px] font-bold text-primary bg-amber-50 px-2 py-0.5 rounded-sm">{t('required')}</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Buy & Sell */}
              <div 
                onClick={() => setSelectedRole('buyer_seller')}
                className={`relative p-5 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center text-center ${selectedRole === 'buyer_seller' ? 'border-primary bg-amber-50/30 shadow-sm shadow-primary/10' : 'border-slate-100 hover:border-slate-200 bg-white'}`}
              >
                {selectedRole === 'buyer_seller' && (
                  <div className="absolute top-3 right-3 text-primary bg-amber-100 rounded-full p-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-colors ${selectedRole === 'buyer_seller' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'}`}>
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h3 className={`font-bold text-sm mb-1.5 ${selectedRole === 'buyer_seller' ? 'text-primary' : 'text-slate-700'}`}>{t('buy_sell_title')}</h3>
                <p className="text-[11px] text-slate-500 leading-tight">{t('buy_sell_desc')}</p>
              </div>

              {/* Find Work */}
              <div 
                onClick={() => setSelectedRole('employee')}
                className={`relative p-5 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center text-center ${selectedRole === 'employee' ? 'border-primary bg-amber-50/30 shadow-sm shadow-primary/10' : 'border-slate-100 hover:border-slate-200 bg-white'}`}
              >
                {selectedRole === 'employee' && (
                  <div className="absolute top-3 right-3 text-primary bg-amber-100 rounded-full p-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-colors ${selectedRole === 'employee' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'}`}>
                  <Hammer className="w-6 h-6" />
                </div>
                <h3 className={`font-bold text-sm mb-1.5 ${selectedRole === 'employee' ? 'text-primary' : 'text-slate-700'}`}>{t('find_work_title')}</h3>
                <p className="text-[11px] text-slate-500 leading-tight">{t('find_work_desc')}</p>
              </div>

              {/* Hire People */}
              <div 
                onClick={() => setSelectedRole('employer')}
                className={`relative p-5 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center text-center ${selectedRole === 'employer' ? 'border-primary bg-amber-50/30 shadow-sm shadow-primary/10' : 'border-slate-100 hover:border-slate-200 bg-white'}`}
              >
                {selectedRole === 'employer' && (
                  <div className="absolute top-3 right-3 text-primary bg-amber-100 rounded-full p-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-colors ${selectedRole === 'employer' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'}`}>
                  <Users className="w-6 h-6" />
                </div>
                <h3 className={`font-bold text-sm mb-1.5 ${selectedRole === 'employer' ? 'text-primary' : 'text-slate-700'}`}>{t('hire_people_title')}</h3>
                <p className="text-[11px] text-slate-500 leading-tight">{t('hire_people_desc')}</p>
              </div>
            </div>
          </div>
          
          {/* Section 2: Personal Details */}
          <div className="space-y-5 pt-2">
            <Label className="text-xs font-bold text-slate-500 tracking-widest uppercase block mb-1">{t('personal_details')}</Label>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="full_name" className="text-xs font-bold text-slate-700">{t('full_name')}</Label>
                <Input id="full_name" name="full_name" placeholder="Abebe Bikila" required className="h-11 text-sm bg-slate-50/50 border-slate-200 focus-visible:ring-primary/20 focus-visible:border-primary" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-bold text-slate-700">{t('email')}</Label>
                <Input id="email" name="email" type="email" placeholder="abebe@example.com" required className="h-11 text-sm bg-slate-50/50 border-slate-200 focus-visible:ring-primary/20 focus-visible:border-primary" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-xs font-bold text-slate-700">{t('phone')}</Label>
                <Input id="phone" name="phone" type="tel" placeholder="+251 912 345 678" required className="h-11 text-sm bg-slate-50/50 border-slate-200 focus-visible:ring-primary/20 focus-visible:border-primary" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs font-bold text-slate-700">{t('password')}</Label>
                <Input id="password" name="password" type="password" placeholder="••••••••" required minLength={6} className="h-11 text-sm tracking-widest bg-slate-50/50 border-slate-200 focus-visible:ring-primary/20 focus-visible:border-primary" />
              </div>
            </div>
          </div>
          
          {/* Language & Terms */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-end pt-2">
            <div className="space-y-2">
              <Label htmlFor="language" className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-slate-500" /> {t('language_pref')}
              </Label>
              <Select name="language" defaultValue="en">
                <SelectTrigger className="h-11 text-sm bg-slate-50/50 border-slate-200 focus:ring-primary/20 focus:border-primary">
                  <SelectValue placeholder="English (Global)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English (Global)</SelectItem>
                  <SelectItem value="am">Amharic (አማርኛ)</SelectItem>
                  <SelectItem value="om">Afaan Oromo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-start gap-2.5 p-3 sm:p-0 sm:py-2.5 sm:px-1">
              <input type="checkbox" id="terms" required className="mt-0.5 w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary cursor-pointer accent-primary" />
              <Label htmlFor="terms" className="text-xs font-medium text-slate-500 leading-tight cursor-pointer">
                {t.rich('terms_agreement', {
                  terms: (chunks) => <Link href="#" className="font-bold text-primary hover:underline">{chunks}</Link>,
                  privacy: (chunks) => <Link href="#" className="font-bold text-primary hover:underline">{chunks}</Link>
                })}
              </Label>
            </div>
          </div>

          <Button type="submit" className="w-full h-12 bg-primary text-white hover:bg-primary/90 font-bold text-base shadow-lg shadow-primary/20 mt-6" disabled={isPending}>
            {isPending ? t('creating_account') : t('create_account_btn')}
          </Button>
          
          {/* Or Continue With */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-slate-400 font-bold uppercase tracking-widest">{t('or_continue_with')}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button type="button" variant="outline" className="h-11 text-sm font-bold bg-slate-50/50 border-slate-200 text-slate-700 hover:bg-slate-100">
              <span className="mr-2 text-blue-600 font-extrabold text-lg flex items-center">G</span> {t('google')}
            </Button>
            <Button type="button" variant="outline" className="h-11 text-sm font-bold bg-slate-50/50 border-slate-200 text-slate-700 hover:bg-slate-100">
              <CheckCircle2 className="w-5 h-5 mr-2 text-blue-500" /> {t('telebirr')}
            </Button>
          </div>

          <div className="text-sm text-center text-slate-500 pt-2">
            {t('already_account')}{' '}
            <Link href="/auth/login" className="text-primary font-bold hover:underline">
              {t('login_here')}
            </Link>
          </div>
        </form>
      </div>

      <div className="mt-8 text-center text-xs font-medium text-slate-400 space-y-1.5 pb-8">
        <p>{tf('rights')}</p>
        <p>{tf('tagline')}</p>
      </div>
    </div>
  );
}
