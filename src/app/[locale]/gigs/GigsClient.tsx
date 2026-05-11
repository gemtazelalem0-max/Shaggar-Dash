'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Link } from '@/i18n/routing';
import { 
  Search, 
  MapPin, 
  Filter,
  Star,
  Clock,
  CheckCircle2,
  ChevronDown,
  LayoutGrid
} from 'lucide-react';

export default function GigsClient({ initialGigs }: { initialGigs: any[] }) {
  const t = useTranslations('Gigs');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredGigs = initialGigs
    .filter(g => g.title.toLowerCase().includes(search.toLowerCase()))
    .filter(g => selectedCategory === 'all' || g.category === selectedCategory);

  const categories = Array.from(new Set(initialGigs.map(g => g.category)));

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <div className="bg-white border-b border-slate-200 py-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
            <div className="max-w-xl">
              <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Gig Economy</h1>
              <p className="text-sm text-slate-500 leading-relaxed">
                Hire skilled freelancers for any project across Ethiopia.
              </p>
            </div>
          </div>
          
          <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1 flex items-center px-2">
              <Search className="w-5 h-5 text-slate-400 mr-2 shrink-0" />
              <Input 
                placeholder="Search for a skill or service..." 
                className="border-0 shadow-none focus-visible:ring-0 px-0 h-10 text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button className="h-10 px-8 bg-primary text-white hover:bg-primary/90 font-bold text-sm rounded-lg shrink-0">
              Search
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl pt-8 flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-slate-900 flex items-center gap-2">
                <Filter className="w-4 h-4" /> Filters
              </h2>
            </div>

            <div className="space-y-3">
              <h3 className="text-[10px] font-bold text-slate-900 tracking-wider uppercase">Category</h3>
              <div className="space-y-1">
                <button 
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-2 py-1.5 rounded-md text-xs font-medium ${selectedCategory === 'all' ? 'bg-primary/10 text-primary' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  All Categories
                </button>
                {categories.map((cat, i) => (
                  <button 
                    key={i} 
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-2 py-1.5 rounded-md text-xs font-medium ${selectedCategory === cat ? 'bg-primary/10 text-primary' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredGigs.map((gig) => (
              <Link key={gig.id} href={`/gigs/${gig.id}`} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all group flex flex-col">
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-slate-200 shrink-0"></div>
                    <span className="text-[11px] font-bold text-slate-700">{gig.profiles?.full_name}</span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm leading-snug mb-3 line-clamp-2 flex-1 group-hover:text-primary transition-colors">
                    {gig.title}
                  </h3>

                  <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[10px] font-medium text-slate-500">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {gig.delivery_days}d delivery
                    </div>
                    <div>
                      <span className="text-sm font-extrabold text-primary">{gig.price.toLocaleString()} ETB</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            {filteredGigs.length === 0 && (
              <div className="col-span-full py-20 text-center text-slate-500 bg-white rounded-xl border border-dashed border-slate-200">
                No gigs found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
