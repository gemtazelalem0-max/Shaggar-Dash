import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { 
  ShoppingBag, 
  Briefcase, 
  Settings, 
  ShieldCheck, 
  Globe, 
  TrendingUp,
  MapPin,
  CheckCircle2
} from 'lucide-react';

export default function HomePage() {
  const t = useTranslations('Index');
  
  return (
    <main className="min-h-screen bg-slate-50 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-gradient-to-br from-amber-50/80 via-white to-blue-50/40">
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Hero Left Content */}
            <div className="space-y-8 max-w-2xl">
              <div className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold text-primary tracking-widest uppercase">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                {t('hub')}
              </div>
              
              <h1 className="text-5xl lg:text-[4rem] font-extrabold tracking-tight text-slate-900 leading-[1.05]">
                {t('hero_title_1')} <br/>
                <span className="text-primary">{t('hero_title_2')}</span> <br/>
                {t('hero_title_3')}
              </h1>
              
              <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
                {t('hero_desc')}
              </p>
              
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link href="/marketplace">
                  <Button size="lg" className="h-14 px-8 bg-primary text-white hover:bg-primary/90 font-bold text-base rounded-full shadow-lg shadow-primary/20">
                    {t('start_trading')}
                  </Button>
                </Link>
                <Link href="/jobs">
                  <Button size="lg" variant="outline" className="h-14 px-8 bg-white border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-base rounded-full shadow-sm">
                    {t('find_job')}
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center gap-4 pt-6">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 shadow-sm"></div>
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-300 shadow-sm"></div>
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-400 shadow-sm"></div>
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-amber-100 flex items-center justify-center text-xs font-bold text-primary shadow-sm">+</div>
                </div>
                <div className="text-sm font-semibold text-slate-600">
                  <span className="font-extrabold text-slate-900">10k+</span> {t('trust_text', { count: '' }).trim()}
                </div>
              </div>
            </div>

            {/* Hero Right Image */}
            <div className="relative lg:h-[500px] flex items-center justify-center">
              {/* Glow Effect */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-amber-400/20 blur-[100px] rounded-full pointer-events-none"></div>
              
              <div className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/10 border-4 border-white bg-slate-100 aspect-[4/3]">
                {/* Placeholder Image background */}
                <div className="absolute inset-0 bg-slate-200 mix-blend-multiply"></div>
                
                {/* Floating overlay card */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-900/80 backdrop-blur-md rounded-xl p-4 border border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-1">Latest Gig</p>
                    <p className="font-bold text-white text-sm">UI/UX Design for FinTech</p>
                  </div>
                  <div className="text-right">
                    <p className="font-extrabold text-primary text-base">12,500 ETB</p>
                    <p className="text-[10px] text-slate-400 font-medium">Fixed Price</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Cards (Overlapping) */}
      <section className="relative z-20 -mt-16 mb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/marketplace" className="group bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-100 hover:-translate-y-1 hover:shadow-2xl hover:border-primary/30 transition-all duration-300 flex flex-col items-start h-full">
              <div className="w-12 h-12 bg-amber-50 text-primary rounded-xl flex items-center justify-center mb-6 shadow-sm border border-amber-100">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">{t('marketplace_title')}</h3>
              <p className="text-sm text-slate-500 mb-8 flex-1 leading-relaxed">{t('marketplace_desc')}</p>
              <span className="text-xs font-bold text-primary group-hover:underline flex items-center gap-1 mt-auto">
                {t('explore_now')} &rarr;
              </span>
            </Link>
            
            <Link href="/jobs" className="group bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-100 hover:-translate-y-1 hover:shadow-2xl hover:border-blue-500/30 transition-all duration-300 flex flex-col items-start h-full">
              <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center mb-6 shadow-sm border border-blue-100">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">{t('jobs_title')}</h3>
              <p className="text-sm text-slate-500 mb-8 flex-1 leading-relaxed">{t('jobs_desc')}</p>
              <span className="text-xs font-bold text-blue-500 group-hover:underline flex items-center gap-1 mt-auto">
                {t('explore_now')} &rarr;
              </span>
            </Link>

            <Link href="/gigs" className="group bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-100 hover:-translate-y-1 hover:shadow-2xl hover:border-emerald-500/30 transition-all duration-300 flex flex-col items-start h-full">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center mb-6 shadow-sm border border-emerald-100">
                <Settings className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">{t('gigs_title')}</h3>
              <p className="text-sm text-slate-500 mb-8 flex-1 leading-relaxed">{t('gigs_desc')}</p>
              <span className="text-xs font-bold text-emerald-500 group-hover:underline flex items-center gap-1 mt-auto">
                {t('explore_now')} &rarr;
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Marketplace Items */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2">{t('featured_title')}</h2>
              <p className="text-sm text-slate-500 font-medium">{t('featured_subtitle')}</p>
            </div>
            <Link href="/marketplace" className="text-sm font-bold text-primary hover:underline flex items-center gap-1">
              {t('view_all_items')} &gt;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'iPhone 15 Pro Max - 256GB', price: '185,000 ETB', location: 'Addis Ababa' },
              { title: '2022 Toyota Corolla Cross', price: '4,200,000 ETB', location: 'Bole, Addis' },
              { title: 'Luxury 3 Bedroom Apartment', price: '25,000,000 ETB', location: 'Kazeranchis' },
              { title: 'MacBook Pro M3 Max', price: '310,000 ETB', location: 'Bole' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all group flex flex-col">
                <div className="relative h-48 bg-slate-200 overflow-hidden">
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold text-slate-700 shadow-sm z-10">
                    {item.location}
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-slate-900 text-sm leading-snug mb-3 line-clamp-2">
                    {item.title}
                  </h3>
                  <div className="mt-auto flex items-end justify-between">
                    <div className="text-base font-extrabold text-primary">
                      {item.price}
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 group-hover:text-primary transition-colors">Details</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="bg-slate-950 py-12 border-y border-slate-900">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 flex-1">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-primary shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Secure Transactions</h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-tight">Verified profiles & reliable support.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-primary shrink-0">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Local Support</h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-tight">Dedicated help in 3 languages.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-primary shrink-0">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Career Growth</h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-tight">100+ new jobs posted weekly.</p>
                </div>
              </div>
            </div>
            <div className="shrink-0 w-full md:w-auto">
              <Link href="/auth/signup">
                <Button className="w-full md:w-auto h-12 px-8 bg-primary text-white hover:bg-primary/90 font-bold text-sm shadow-md rounded-lg">
                  Join the Community
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Top Career Opportunities */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-3">Top Career Opportunities</h2>
          <p className="text-sm text-slate-500 font-medium">Work with the leading companies shaping Ethiopia&apos;s future.</p>
        </div>

        <div className="container mx-auto px-4 max-w-4xl space-y-4">
          {[
            { title: 'Senior Backend Engineer (FinTech)', type: 'Full-time', company: 'Ethio Financial Technologies', location: 'Addis Ababa', salary: '45k - 85k ETB' },
            { title: 'Marketing & Growth Lead', type: 'Contract', company: 'Ride Ethiopia', location: 'Bole, Addis', salary: '25k - 50k ETB' },
            { title: 'Full-Stack Developer (Remote)', type: 'Remote', company: 'ZayRide Technologies', location: 'Remote / Addis', salary: '40k - 90k ETB' },
          ].map((job, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6 group">
              <div className="flex items-start sm:items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200 group-hover:bg-slate-50 transition-colors">
                  {/* Placeholder Logo */}
                  <div className="w-6 h-6 bg-slate-300 rounded-full"></div>
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <h3 className="font-bold text-slate-900 text-base">{job.title}</h3>
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500">{job.type}</span>
                  </div>
                  <div className="flex flex-wrap items-center text-xs font-medium text-slate-500 gap-x-3 gap-y-1">
                    <span>{job.company}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
                    <span className="text-primary font-bold">{job.salary}</span>
                  </div>
                </div>
              </div>
              <Link href="/jobs" className="shrink-0">
                <Button variant="outline" className="shrink-0 h-10 px-6 font-bold text-xs border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-lg">
                  Apply Now
                </Button>
              </Link>
            </div>
          ))}

          <div className="text-center pt-8">
            <Link href="/jobs">
              <Button variant="outline" className="h-12 px-8 font-bold text-sm border-slate-200 text-slate-700 hover:bg-slate-50 rounded-full shadow-sm">
                Browse All Openings
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="pb-24 pt-12 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-primary rounded-3xl p-8 md:p-12 shadow-2xl shadow-primary/20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 blur-[80px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
            
            <div className="relative z-10 max-w-xl">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
                Ready to scale your <br/>
                Business or Career?
              </h2>
              <p className="text-slate-900/80 font-medium mb-8 max-w-md">
                Join thousands of sellers and job seekers today. Setting up your profile takes less than 2 minutes.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link href="/auth/signup">
                  <Button className="h-12 px-8 bg-slate-950 text-white hover:bg-slate-800 font-bold text-sm rounded-lg shadow-xl shadow-slate-900/20">
                    Create Account
                  </Button>
                </Link>
                <Link href="/auth/login">
                  <Button variant="outline" className="h-12 px-8 bg-white/20 border-white/30 text-slate-900 hover:bg-white/30 backdrop-blur-sm font-bold text-sm rounded-lg">
                    Login Now
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative z-10 shrink-0 w-full md:w-auto">
              <div className="bg-white/20 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-400/20 text-green-700 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-slate-900 text-sm">Secure ID Verification</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-400/20 text-blue-700 flex items-center justify-center shrink-0">
                    <Globe className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-slate-900 text-sm">Trilingual Interface</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-400/20 text-orange-800 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-slate-900 text-sm">Instant Telebirr Payouts</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
