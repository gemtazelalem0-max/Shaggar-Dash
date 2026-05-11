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
  Banknote,
  Clock,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function JobsClient({ initialJobs }: { initialJobs: any[] }) {
  const t = useTranslations('Jobs');
  const [search, setSearch] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);

  const filteredJobs = initialJobs
    .filter(j => j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase()))
    .filter(j => selectedTypes.length === 0 || selectedTypes.includes(j.type))
    .filter(j => selectedCities.length === 0 || selectedCities.includes(j.city));

  const jobTypes = Array.from(new Set(initialJobs.map(j => j.type)));
  const cities = Array.from(new Set(initialJobs.map(j => j.city)));

  const toggleType = (type: string) => {
    setSelectedTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
  };

  const toggleCity = (city: string) => {
    setSelectedCities(prev => prev.includes(city) ? prev.filter(c => c !== city) : [...prev, city]);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <div className="bg-white border-b border-slate-200 py-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
            <div className="max-w-2xl">
              <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Professional Opportunities</h1>
              <p className="text-sm text-slate-500 leading-relaxed">
                Discover career opportunities and professional gigs across Ethiopia.
              </p>
            </div>
          </div>
          
          <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1 flex items-center px-2">
              <Search className="w-5 h-5 text-slate-400 mr-2 shrink-0" />
              <Input 
                placeholder="Job title or company..." 
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
              <h3 className="text-[10px] font-bold text-slate-900 tracking-wider uppercase">Job Type</h3>
              <div className="space-y-3">
                {jobTypes.map((type, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      id={`type-${i}`} 
                      className="w-4 h-4 rounded border-slate-300 text-primary accent-primary cursor-pointer"
                      checked={selectedTypes.includes(type)}
                      onChange={() => toggleType(type)}
                    />
                    <Label htmlFor={`type-${i}`} className="text-xs font-medium text-slate-600 cursor-pointer">{type}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-[10px] font-bold text-slate-900 tracking-wider uppercase">City</h3>
              <div className="space-y-3">
                {cities.map((city, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      id={`city-${i}`} 
                      className="w-4 h-4 rounded border-slate-300 text-primary accent-primary cursor-pointer"
                      checked={selectedCities.includes(city)}
                      onChange={() => toggleCity(city)}
                    />
                    <Label htmlFor={`city-${i}`} className="text-xs font-medium text-slate-600 cursor-pointer">{city}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between pb-2">
            <p className="text-xs text-slate-500">
              Showing <span className="font-bold text-slate-900">{filteredJobs.length} jobs</span> available
            </p>
          </div>

          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div key={job.id} className="bg-white p-5 rounded-xl border border-slate-200 hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-5">
                <div className="flex-1">
                  <h3 className="font-extrabold text-slate-900 text-base mb-1">{job.title}</h3>
                  <div className="text-xs text-slate-600 font-medium mb-3">{job.company}</div>
                  
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-bold text-slate-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {job.city}
                    </div>
                    <div className="flex items-center gap-1 text-slate-900">
                      <Banknote className="w-3.5 h-3.5 text-slate-400" />
                      {job.salary_range}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {new Date(job.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 shrink-0 sm:w-32">
                  <div className="hidden sm:block px-2.5 py-1 bg-slate-50 text-slate-600 text-[10px] font-bold rounded-md uppercase">
                    {job.type}
                  </div>
                  <Link href={`/jobs/${job.id}`} className="w-full">
                    <Button className="w-full h-9 bg-primary text-white hover:bg-primary/90 font-bold text-[11px] shadow-sm">
                      Apply Now
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
