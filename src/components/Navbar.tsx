'use client';

import { useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { signout } from '@/app/actions/auth';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Link } from '@/i18n/routing';
import { Search, MapPin, Grid3X3 } from 'lucide-react';

type UserProfile = {
  full_name: string;
  role: 'buyer_seller' | 'employer' | 'employee' | string;
} | null;

export default function Navbar({ userProfile }: { userProfile: UserProfile }) {
  const t = useTranslations('Navigation');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = params.locale as string;

  const onSelectChange = (nextLocale: string) => {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- next-intl standard pattern
        { pathname, params },
        { locale: nextLocale }
      );
    });
  };

  return (
    <nav className="bg-slate-950 text-slate-50 border-b border-slate-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary text-slate-950 font-bold flex items-center justify-center rounded-sm">
              S
            </div>
            <span className="text-xl font-bold tracking-tight">Shaggar Dash</span>
          </Link>
          <div className="hidden md:flex gap-6">
            <Link href="/marketplace" className="text-sm font-medium text-slate-300 hover:text-white flex items-center gap-1.5">
              <Grid3X3 className="w-4 h-4" />
              {t('marketplace')}
            </Link>
            <Link href="/jobs" className="text-sm font-medium text-slate-300 hover:text-white">
              {t('jobs')}
            </Link>
            <Link href="/gigs" className="text-sm font-medium text-slate-300 hover:text-white">
              {t('gigs')}
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors hover:bg-slate-800 hover:text-white h-9 px-3 cursor-pointer ${isPending ? 'pointer-events-none opacity-50' : ''}`}
            >
              {currentLocale.toUpperCase()}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem onClick={() => onSelectChange('en')}>English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSelectChange('am')}>አማርኛ</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSelectChange('om')}>Afaan Oromo</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {userProfile ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors hover:bg-slate-800 hover:text-white h-9 px-3 cursor-pointer">
                {userProfile.full_name}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem>
                  <Link href="/profile" className="w-full cursor-pointer">{t('profile')}</Link>
                </DropdownMenuItem>
                {userProfile.role === 'buyer_seller' && (
                  <>
                    <DropdownMenuItem>
                      <Link href="/dashboard/seller" className="w-full cursor-pointer font-bold text-primary">{t('seller_dashboard')}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/dashboard/buyer" className="w-full cursor-pointer">{t('my_orders')}</Link>
                    </DropdownMenuItem>
                  </>
                )}
                {userProfile.role === 'employer' && (
                  <DropdownMenuItem>
                    <Link href="/dashboard/employer" className="w-full cursor-pointer font-bold text-primary">{t('employer_dashboard')}</Link>
                  </DropdownMenuItem>
                )}
                {userProfile.role === 'employee' && (
                  <DropdownMenuItem>
                    <Link href="/dashboard/employee" className="w-full cursor-pointer font-bold text-primary">{t('employee_dashboard')}</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem>
                  <form action={signout} className="w-full">
                    <button type="submit" className="w-full text-left cursor-pointer">{t('logout')}</button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/auth/login">
                <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-slate-800">
                  {t('login')}
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  {t('signup')}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
