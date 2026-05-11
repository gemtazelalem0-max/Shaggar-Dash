'use client';

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
import { useState } from 'react';

export default function JobsPage() {
  const [activeTab, setActiveTab] = useState('jobs');

  const jobs = [
    {
      id: 1,
      title: 'Senior React Developer',
      company: 'Ethio Telecom',
      location: 'Addis Ababa',
      salary: '45,000 ETB',
      posted: '2 days ago',
      type: 'Full-time'
    },
    {
      id: 2,
      title: 'Marketing Specialist',
      company: 'Ride Ethiopia',
      location: 'Bole, Addis Ababa',
      salary: '18,000 ETB',
      posted: '5 hours ago',
      type: 'Contract'
    },
    {
      id: 3,
      title: 'Project Manager (Construction)',
      company: 'Midroc Investment Group',
      location: 'Awasa',
      salary: '35,000 ETB',
      posted: '1 week ago',
      type: 'Full-time'
    },
    {
      id: 4,
      title: 'UI/UX Designer',
      company: 'Chapa Financial',
      location: 'Remote',
      salary: '25,000 ETB',
      posted: '3 days ago',
      type: 'Remote'
    },
    {
      id: 5,
      title: 'Warehouse Supervisor',
      company: 'Heineken Ethiopia',
      location: 'Kilinto Industrial Park',
      salary: '12,500 ETB',
      posted: '4 days ago',
      type: 'Full-time'
    }
  ];

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'];
  const cities = ['Addis Ababa', 'Dire Dawa', 'Adama', 'Bahir Dar', 'Mekelle'];

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      
      {/* Top Header */}
      <div className="bg-white border-b border-slate-200 py-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
            <div className="max-w-2xl">
              <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Professional Opportunities</h1>
              <p className="text-sm text-slate-500 leading-relaxed">
                Discover thousands of full-time careers or quick freelance gigs. Empowering Ethiopia&apos;s workforce with modern digital tools.
              </p>
            </div>
            
            {/* Toggle Buttons */}
            <div className="flex items-center bg-slate-100 p-1 rounded-lg shrink-0 h-12">
              <button 
                onClick={() => setActiveTab('jobs')}
                className={`flex-1 px-8 py-2 text-sm font-bold rounded-md transition-colors ${activeTab === 'jobs' ? 'bg-primary text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Jobs
              </button>
              <button 
                onClick={() => setActiveTab('gigs')}
                className={`flex-1 px-8 py-2 text-sm font-bold rounded-md transition-colors ${activeTab === 'gigs' ? 'bg-primary text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Gigs
              </button>
            </div>
          </div>
          
          {/* Search Box */}
          <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1 flex items-center border-r border-slate-100 px-2">
              <Search className="w-5 h-5 text-slate-400 mr-2 shrink-0" />
              <Input 
                placeholder="Job title, keywords, or company..." 
                className="border-0 shadow-none focus-visible:ring-0 px-0 h-10 text-sm"
              />
            </div>
            <div className="relative flex-1 flex items-center px-2">
              <MapPin className="w-5 h-5 text-slate-400 mr-2 shrink-0" />
              <Input 
                placeholder="Location (e.g. Addis Ababa)" 
                className="border-0 shadow-none focus-visible:ring-0 px-0 h-10 text-sm"
              />
            </div>
            <Button className="h-10 px-8 bg-primary text-white hover:bg-primary/90 font-bold text-sm rounded-lg shrink-0">
              Search
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl pt-8 flex flex-col md:flex-row gap-8">
        
        {/* Left Sidebar - Filters */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-slate-900 flex items-center gap-2">
                <Filter className="w-4 h-4" /> Filters
              </h2>
              <button className="text-xs font-bold text-primary hover:underline">Clear All</button>
            </div>

            {/* Job Type */}
            <div className="space-y-3">
              <h3 className="text-[10px] font-bold text-slate-900 tracking-wider uppercase">Job Type</h3>
              <div className="space-y-3">
                {jobTypes.map((type, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <input type="checkbox" id={`type-${i}`} className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary accent-primary cursor-pointer" />
                    <Label htmlFor={`type-${i}`} className="text-xs font-medium text-slate-600 cursor-pointer">{type}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Salary */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-bold text-slate-900 tracking-wider uppercase">Min. Monthly<br/>Salary</h3>
                <div className="text-right">
                  <span className="text-primary font-bold text-sm">5,000</span>
                  <span className="text-primary font-bold text-xs block">ETB</span>
                </div>
              </div>
              
              <div className="relative h-1 bg-slate-200 rounded-full mt-2">
                <div className="absolute left-0 w-[15%] h-full bg-primary rounded-full"></div>
                <div className="absolute left-[15%] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full shadow-sm"></div>
              </div>
              
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
                <span>0</span>
                <span>100k+</span>
              </div>
            </div>

            {/* City */}
            <div className="space-y-3">
              <h3 className="text-[10px] font-bold text-slate-900 tracking-wider uppercase">City</h3>
              <div className="space-y-3">
                {cities.map((city, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      id={`city-${i}`} 
                      defaultChecked={city === 'Addis Ababa'}
                      className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary accent-primary cursor-pointer" 
                    />
                    <Label htmlFor={`city-${i}`} className={`text-xs font-medium cursor-pointer ${city === 'Addis Ababa' ? 'text-slate-900 font-bold' : 'text-slate-600'}`}>{city}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Only */}
            <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-blue-600">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs font-bold">Verified only</span>
              </div>
              <input type="checkbox" className="w-4 h-4 rounded border-blue-200 text-blue-600 focus:ring-blue-500 accent-blue-600 cursor-pointer" />
            </div>
          </div>
        </aside>

        {/* Right Content - Jobs List */}
        <div className="flex-1 space-y-4">
          
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-2">
            <p className="text-xs text-slate-500">
              Showing <span className="font-bold text-slate-900">5 jobs</span> available
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span>Sort by:</span>
            </div>
          </div>

          {/* Job List */}
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white p-5 rounded-xl border border-slate-200 hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-5">
                {/* Logo */}
                <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden">
                  <div className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">Logo</div>
                </div>
                
                {/* Info */}
                <div className="flex-1">
                  <h3 className="font-extrabold text-slate-900 text-base mb-1">{job.title}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium mb-3">
                    <span>{job.company}</span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-bold text-slate-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1 text-slate-900">
                      <Banknote className="w-3.5 h-3.5 text-slate-400" />
                      {job.salary}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {job.posted}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 shrink-0 sm:w-32">
                  <div className="hidden sm:block px-2.5 py-1 bg-slate-50 text-slate-600 text-[10px] font-bold rounded-md">
                    {job.type}
                  </div>
                  <div className="flex gap-2 sm:w-full">
                    <Link href={`/jobs/${job.id}`} className="flex-1">
                      <Button className="w-full h-9 bg-primary text-white hover:bg-primary/90 font-bold text-[11px] shadow-sm">
                        Apply Now
                      </Button>
                    </Link>
                    <Button variant="outline" className="sm:hidden h-9 px-4 font-bold text-[11px] text-slate-600 border-slate-200">
                      Save
                    </Button>
                  </div>
                  <Button variant="outline" className="hidden sm:flex w-full h-8 font-bold text-[11px] text-slate-600 border-slate-200 hover:bg-slate-50">
                    Save
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center pt-8 pb-12 gap-2">
            <Button variant="outline" className="h-9 px-3 text-slate-400 border-slate-200 rounded-md font-medium" disabled>
              &lt;
            </Button>
            <Button variant="outline" className="h-9 w-9 p-0 text-slate-400 border-slate-200 rounded-md font-medium">
              1
            </Button>
            <Button variant="outline" className="h-9 w-9 p-0 bg-primary text-white border-primary shadow-sm hover:bg-primary/90 hover:text-white rounded-md font-bold">
              2
            </Button>
            <Button variant="outline" className="h-9 w-9 p-0 text-slate-600 border-slate-200 hover:bg-slate-50 rounded-md font-medium">
              3
            </Button>
            <span className="text-slate-400 px-2 font-medium">...</span>
            <Button variant="outline" className="h-9 w-9 p-0 text-slate-600 border-slate-200 hover:bg-slate-50 rounded-md font-medium">
              12
            </Button>
            <Button variant="outline" className="h-9 px-4 text-slate-600 border-slate-200 hover:bg-slate-50 rounded-md font-medium">
              Next &gt;
            </Button>
          </div>

          {/* Bottom Banner */}
          <div className="bg-slate-900 rounded-xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-xl mt-4">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/4"></div>
            <div className="relative z-10 max-w-xl">
              <div className="flex items-center gap-1.5 text-primary text-[10px] font-bold tracking-widest uppercase mb-3">
                <CheckCircle2 className="w-3.5 h-3.5" /> For Employers &amp; Clients
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
                Need to hire top talent or find a freelancer?
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed max-w-md">
                Post your job or gig listing today and reach thousands of verified professionals across Ethiopia.
              </p>
            </div>
            <Link href="/dashboard" className="relative z-10 shrink-0 w-full md:w-auto">
              <Button className="w-full bg-primary text-white hover:bg-primary/90 font-bold text-sm h-12 px-8 shadow-lg shadow-primary/20 rounded-lg">
                Post a Listing Now
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
