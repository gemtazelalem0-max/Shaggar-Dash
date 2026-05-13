import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { getLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { LayoutDashboard, ShoppingBag, Briefcase, Settings, MessageSquare } from 'lucide-react';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function DashboardLayout({
  children,
  params,
}: Props) {
  const { locale } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/${locale}/auth/login`);
  }

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user!.id).single();
  const role = profile?.role || 'buyer_seller';

  return (
    <div className="min-h-[calc(100vh-4rem)] flex bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 hidden md:block border-r border-slate-800">
        <div className="p-6">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Main Menu</p>
          <nav className="space-y-1">
            <Link href={`/dashboard/${role === 'buyer_seller' ? 'seller' : role}`} className="flex items-center gap-3 px-3 py-2 rounded-md bg-primary/10 text-primary font-medium">
              <LayoutDashboard className="w-5 h-5" />
              Dashboard
            </Link>
            
            {role === 'buyer_seller' && (
              <>
                <Link href="/dashboard/seller" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 hover:text-white transition-colors">
                  <Briefcase className="w-5 h-5" />
                  Manage Listings
                </Link>
                <Link href="/dashboard/buyer" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 hover:text-white transition-colors">
                  <ShoppingBag className="w-5 h-5" />
                  My Orders
                </Link>
              </>
            )}

            {role === 'employer' && (
              <>
                <Link href="/jobs" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 hover:text-white transition-colors">
                  <Briefcase className="w-5 h-5" />
                  Jobs
                </Link>
                <Link href="/dashboard/employer" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 hover:text-white transition-colors">
                  <MessageSquare className="w-5 h-5" />
                  Applicants
                </Link>
              </>
            )}

            {role === 'employee' && (
              <>
                <Link href="/dashboard/employee" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 hover:text-white transition-colors">
                  <Briefcase className="w-5 h-5" />
                  My Applications
                </Link>
                <Link href="/gigs" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 hover:text-white transition-colors">
                  <MessageSquare className="w-5 h-5" />
                  My Gigs
                </Link>
              </>
            )}
            
            <Link href="/profile" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 hover:text-white transition-colors mt-8">
              <Settings className="w-5 h-5" />
              Settings
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
