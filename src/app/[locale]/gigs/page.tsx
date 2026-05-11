'use client';

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
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Code2,
  Palette,
  PenTool,
  Camera,
  TrendingUp,
  Globe,
} from 'lucide-react';
import { useState } from 'react';

export default function GigsPage() {
  const [activeTab, setActiveTab] = useState<'find' | 'offer'>('find');

  const gigs = [
    {
      id: 1,
      title: 'Full-Stack Web Development – React & Node.js',
      seller: 'Eyob T.',
      rating: '4.9',
      reviews: 124,
      price: '15,000',
      deliveryDays: 7,
      category: 'Development',
      tags: ['React', 'Node.js', 'TypeScript'],
      level: 'Top Rated',
    },
    {
      id: 2,
      title: 'Professional Logo & Brand Identity Design',
      seller: 'Lulit M.',
      rating: '5.0',
      reviews: 87,
      price: '4,500',
      deliveryDays: 3,
      category: 'Design',
      tags: ['Logo', 'Branding', 'Illustrator'],
      level: 'Pro',
    },
    {
      id: 3,
      title: 'Amharic & English Copywriting for Ads',
      seller: 'Dawit A.',
      rating: '4.8',
      reviews: 56,
      price: '2,000',
      deliveryDays: 2,
      category: 'Writing',
      tags: ['Amharic', 'Copywriting', 'Ads'],
      level: 'Verified',
    },
    {
      id: 4,
      title: 'Product Photography – 10 Items with Editing',
      seller: 'Feven H.',
      rating: '4.9',
      reviews: 43,
      price: '8,000',
      deliveryDays: 5,
      category: 'Photography',
      tags: ['Product', 'Studio', 'Retouching'],
      level: 'Pro',
    },
    {
      id: 5,
      title: 'Social Media Management – 30 Days Package',
      seller: 'Marta G.',
      rating: '4.7',
      reviews: 31,
      price: '6,500',
      deliveryDays: 30,
      category: 'Marketing',
      tags: ['Instagram', 'TikTok', 'Strategy'],
      level: 'Verified',
    },
    {
      id: 6,
      title: 'Mobile App UI/UX Design – Figma Prototype',
      seller: 'Naol B.',
      rating: '5.0',
      reviews: 68,
      price: '18,000',
      deliveryDays: 10,
      category: 'Design',
      tags: ['Figma', 'Mobile', 'UX Research'],
      level: 'Top Rated',
    },
  ];

  const categories = [
    { name: 'Development', icon: Code2, count: 214 },
    { name: 'Design', icon: Palette, count: 158 },
    { name: 'Writing', icon: PenTool, count: 92 },
    { name: 'Photography', icon: Camera, count: 47 },
    { name: 'Marketing', icon: TrendingUp, count: 113 },
    { name: 'Translation', icon: Globe, count: 38 },
  ];

  const levelStyle: Record<string, string> = {
    'Top Rated': 'bg-amber-50 text-amber-700 border-amber-200',
    'Pro': 'bg-blue-50 text-blue-700 border-blue-200',
    'Verified': 'bg-green-50 text-green-700 border-green-200',
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">

      {/* Top Header */}
      <div className="bg-white border-b border-slate-200 py-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
            <div className="max-w-xl">
              <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Gig Economy</h1>
              <p className="text-sm text-slate-500 leading-relaxed">
                Hire skilled freelancers for any project, or offer your own services to thousands of clients across Ethiopia.
              </p>
            </div>
            {/* Tab Toggle */}
            <div className="flex items-center bg-slate-100 p-1 rounded-lg shrink-0 h-12">
              <button
                onClick={() => setActiveTab('find')}
                className={`flex-1 px-6 py-2 text-sm font-bold rounded-md transition-colors ${activeTab === 'find' ? 'bg-primary text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Find a Freelancer
              </button>
              <button
                onClick={() => setActiveTab('offer')}
                className={`flex-1 px-6 py-2 text-sm font-bold rounded-md transition-colors ${activeTab === 'offer' ? 'bg-primary text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Offer a Gig
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1 flex items-center border-r border-slate-100 px-2">
              <Search className="w-5 h-5 text-slate-400 mr-2 shrink-0" />
              <Input
                placeholder="Search for a skill, service, or freelancer..."
                className="border-0 shadow-none focus-visible:ring-0 px-0 h-10 text-sm"
              />
            </div>
            <div className="relative flex-1 flex items-center px-2">
              <MapPin className="w-5 h-5 text-slate-400 mr-2 shrink-0" />
              <Input
                placeholder="Location or Remote"
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

        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-slate-900 flex items-center gap-2">
                <Filter className="w-4 h-4" /> Filters
              </h2>
              <button className="text-xs font-bold text-primary hover:underline">Clear All</button>
            </div>

            {/* Categories */}
            <div className="space-y-3">
              <h3 className="text-[10px] font-bold text-slate-900 tracking-wider uppercase">Category</h3>
              <div className="space-y-1">
                {categories.map((cat, i) => {
                  const Icon = cat.icon;
                  return (
                    <button key={i} className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-slate-50 transition-colors group">
                      <div className="flex items-center gap-3 text-slate-600 group-hover:text-slate-900">
                        <div className="w-7 h-7 rounded bg-slate-100 border border-slate-100 flex items-center justify-center group-hover:border-slate-300">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-medium">{cat.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">{cat.count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Budget */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-bold text-slate-900 tracking-wider uppercase">Budget (ETB)</h3>
              <div className="relative h-1 bg-slate-200 rounded-full">
                <div className="absolute left-[5%] right-[20%] h-full bg-primary rounded-full"></div>
                <div className="absolute left-[5%] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full shadow-sm"></div>
                <div className="absolute right-[20%] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full shadow-sm"></div>
              </div>
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
                <span>0</span>
                <span>50k+ ETB</span>
              </div>
            </div>

            {/* Delivery Time */}
            <div className="space-y-3">
              <h3 className="text-[10px] font-bold text-slate-900 tracking-wider uppercase">Delivery Time</h3>
              <div className="space-y-2">
                {['24 Hours', '3 Days', '7 Days', 'Any'].map((time, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <input type="radio" name="delivery" id={`time-${i}`} className="w-3.5 h-3.5 accent-primary cursor-pointer" defaultChecked={i === 3} />
                    <Label htmlFor={`time-${i}`} className="text-xs font-medium text-slate-600 cursor-pointer">{time}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Seller Level */}
            <div className="space-y-3">
              <h3 className="text-[10px] font-bold text-slate-900 tracking-wider uppercase">Seller Level</h3>
              <div className="space-y-2">
                {['Top Rated', 'Pro', 'Verified'].map((level, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <input type="checkbox" id={`level-${i}`} className="w-4 h-4 rounded border-slate-300 accent-primary cursor-pointer" />
                    <Label htmlFor={`level-${i}`} className="text-xs font-medium text-slate-600 cursor-pointer">{level}</Label>
                  </div>
                ))}
              </div>
            </div>

            <Button className="w-full bg-slate-900 text-white hover:bg-slate-800 font-bold shadow-md">
              Apply Filters
            </Button>
          </div>
        </aside>

        {/* Gig Grid */}
        <div className="flex-1 space-y-5">

          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between bg-white p-3 rounded-xl border border-slate-200 shadow-sm gap-4">
            <p className="text-sm text-slate-500 font-medium">
              Showing <span className="font-bold text-slate-900">6</span> of 662 gigs
            </p>
            <div className="flex items-center gap-3">
              <div className="relative">
                <select className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg pl-3 pr-8 h-9 font-medium focus:outline-none focus:ring-1 focus:ring-primary">
                  <option>Best Match</option>
                  <option>Lowest Price</option>
                  <option>Highest Rated</option>
                  <option>Newest</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
              <div className="flex items-center bg-slate-100 rounded-lg p-1">
                <button className="p-1.5 bg-white text-primary shadow-sm rounded-md"><LayoutGrid className="w-4 h-4" /></button>
                <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md"><List className="w-4 h-4" /></button>
              </div>
            </div>
          </div>

          {/* Gig Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {gigs.map((gig) => (
              <Link key={gig.id} href={`/gigs/${gig.id}`} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all group flex flex-col">
                {/* Thumbnail */}
                <div className="relative h-44 bg-slate-100 overflow-hidden">
                  <div className="absolute inset-0 bg-slate-200"></div>
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-0.5 text-[9px] font-bold border rounded-full ${levelStyle[gig.level]}`}>
                      {gig.level}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-[9px] font-bold text-slate-700 shadow-sm">
                    {gig.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                  {/* Seller */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-slate-300 shrink-0"></div>
                    <span className="text-[11px] font-bold text-slate-700">{gig.seller}</span>
                    <div className="flex items-center gap-0.5 ml-auto text-[10px] font-bold text-slate-700">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {gig.rating}
                      <span className="text-slate-400 font-normal ml-0.5">({gig.reviews})</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm leading-snug mb-3 line-clamp-2 flex-1 group-hover:text-primary transition-colors">
                    {gig.title}
                  </h3>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {gig.tags.map((tag, i) => (
                      <span key={i} className="px-1.5 py-0.5 bg-slate-50 border border-slate-200 text-[9px] font-bold text-slate-500 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[10px] font-medium text-slate-500">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {gig.deliveryDays}d delivery
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 font-medium">Starting at </span>
                      <span className="text-sm font-extrabold text-primary">{gig.price} ETB</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex flex-col items-center justify-center pt-8 space-y-3">
            <div className="flex items-center gap-1.5">
              <Button variant="outline" size="icon" className="w-8 h-8 rounded-md border-slate-200 text-slate-400" disabled>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" className="w-8 h-8 rounded-md bg-primary text-white font-bold border-primary shadow-sm hover:bg-primary/90 hover:text-white">1</Button>
              <Button variant="outline" className="w-8 h-8 rounded-md border-slate-200 text-slate-600 font-medium hover:bg-slate-50">2</Button>
              <Button variant="outline" className="w-8 h-8 rounded-md border-slate-200 text-slate-600 font-medium hover:bg-slate-50">3</Button>
              <span className="text-slate-400 px-1">...</span>
              <Button variant="outline" className="w-8 h-8 rounded-md border-slate-200 text-slate-600 font-medium hover:bg-slate-50">28</Button>
              <Button variant="outline" size="icon" className="w-8 h-8 rounded-md border-slate-200 text-slate-600 hover:bg-slate-50">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-[11px] font-medium text-slate-400">Page 1 of 28</p>
          </div>

          {/* Post a Gig CTA */}
          <div className="bg-slate-900 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-xl mt-4">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/4"></div>
            <div className="relative z-10 max-w-xl">
              <div className="flex items-center gap-1.5 text-primary text-[10px] font-bold tracking-widest uppercase mb-3">
                <CheckCircle2 className="w-3.5 h-3.5" /> For Freelancers & Creatives
              </div>
              <h2 className="text-2xl font-extrabold text-white mb-2">
                Have a skill? Start earning today.
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed max-w-md">
                Post your gig in minutes and connect with thousands of clients across Ethiopia looking for your expertise.
              </p>
            </div>
            <Link href="/auth/signup" className="relative z-10 w-full md:w-auto shrink-0">
              <Button className="w-full bg-primary text-white hover:bg-primary/90 font-bold text-sm h-12 px-8 shadow-lg shadow-primary/20 rounded-lg">
                Post Your Gig
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
