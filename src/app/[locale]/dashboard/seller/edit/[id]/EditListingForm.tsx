'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { 
  ChevronRight, 
  Upload, 
  Plus, 
  Info, 
  ChevronDown, 
  Type, 
  Bold, 
  Italic, 
  Underline,
  MapPin,
  Check,
  Package,
  Trash2,
  Eye,
  ArrowUpRight,
  History,
  AlertCircle,
  Clock,
  MoreHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useParams, useRouter } from 'next/navigation';

export default function EditListingForm({ product, otherListings }: { product: any, otherListings: any[] }) {
  const t = useTranslations('Dashboard');
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price.toString());
  const [isPending, setIsPending] = useState(false);
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  async function handleSave() {
    setIsPending(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price.replace(/,/g, ''));
    formData.append('locale', locale);
    // ... other fields
    
    // For now just alert and redirect
    alert('Changes saved successfully!');
    router.push('/dashboard/seller');
    setIsPending(false);
  }
  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8 pb-32">
      {/* Breadcrumbs & Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div className="space-y-1">
          <nav className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] mb-2">
            <Link href="/dashboard/seller" className="hover:text-primary">Listings</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-600">Edit Listing</span>
          </nav>
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">{title}</h1>
            <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-bold uppercase tracking-widest border border-green-100">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Active
            </div>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-medium text-slate-400 mt-2">
            <span>ID: #SD-{product.id.slice(0, 5)}</span>
            <div className="w-1 h-1 rounded-full bg-slate-300" />
            <span>Last updated: Oct 24, 2024 at 11:30 AM</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-11 px-6 font-bold text-slate-600 border-slate-200 flex items-center gap-2">
            <Eye className="w-4 h-4" /> Preview Live
          </Button>
          <Button variant="outline" className="h-11 px-6 font-bold text-red-500 border-red-100 hover:bg-red-50 flex items-center gap-2">
            <Trash2 className="w-4 h-4" /> Delete
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatsCard label="Views this week" value="1,248" change="+14.2%" />
        <StatsCard label="Saved by buyers" value="86" change="+5.3%" />
        <StatsCard label="Successful orders" value="12" change="+2.1%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Media Section */}
          <Section title="Media" description="Update the photos of your product. High-quality images increase sales.">
            <div className="flex flex-wrap gap-4">
              <div className="relative w-48 h-48 rounded-2xl overflow-hidden group shadow-lg border-2 border-white">
                <img src={product.image_url?.split(',')[0]} alt="" className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 bg-slate-900/90 text-[8px] font-bold text-white px-2 py-1 rounded-full uppercase tracking-widest">Primary</div>
              </div>
              <div className="w-32 h-32 rounded-2xl bg-slate-100 border-2 border-white shadow-sm overflow-hidden opacity-60">
                <img src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&q=80" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="w-32 h-32 rounded-2xl bg-slate-100 border-2 border-white shadow-sm overflow-hidden opacity-60">
                <img src="https://images.unsplash.com/photo-1580915411954-282cb1b0d780?w=400&q=80" alt="" className="w-full h-full object-cover" />
              </div>
              <button className="w-32 h-32 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-1 hover:bg-slate-50 transition-colors group">
                <Plus className="w-5 h-5 text-slate-400 group-hover:scale-110 transition-transform" />
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Add More</span>
              </button>
            </div>
          </Section>

          {/* Basic Details Section */}
          <Section title="Basic Details" description="Essential information buyers need to find your listing.">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Listing Title*</Label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} className="h-12 bg-white border-slate-200 shadow-sm font-medium" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Category*</Label>
                  <Select defaultValue="industrial">
                    <SelectTrigger className="h-12 bg-white border-slate-200 shadow-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="industrial">Industrial Equipment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">City Location*</Label>
                  <Select defaultValue="addis">
                    <SelectTrigger className="h-12 bg-white border-slate-200 shadow-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="addis">Addis Ababa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </Section>

          {/* Pricing & Inventory */}
          <Section title="Pricing & Inventory" description="Manage your price points and stock availability.">
            <div className="grid grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sale Price (ETB)*</Label>
                <div className="relative group">
                  <div className="absolute left-0 inset-y-0 w-10 flex items-center justify-center bg-slate-50 border-r border-slate-200 rounded-l-lg text-[9px] font-bold text-slate-400">ETB</div>
                  <Input value={price} className="h-12 pl-12 bg-white border-slate-200 shadow-sm font-bold text-primary" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Regular Price (Optional)</Label>
                <div className="relative group">
                  <div className="absolute left-0 inset-y-0 w-10 flex items-center justify-center bg-slate-50 border-r border-slate-200 rounded-l-lg text-[9px] font-bold text-slate-400">ETB</div>
                  <Input defaultValue="48,500" className="h-12 pl-12 bg-white border-slate-200 shadow-sm font-medium text-slate-400" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Available Stock</Label>
                <Input defaultValue="3" className="h-12 bg-white border-slate-200 shadow-sm font-bold" />
              </div>
            </div>
          </Section>

          {/* Full Description */}
          <Section title="Full Description" description="Describe your product in detail. Use keywords for better search visibility.">
            <div className="space-y-4">
              <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                <div className="p-6">
                  <p className="text-sm text-slate-600 leading-relaxed">
                    High-performance industrial grade coffee processing machine. Perfect for small to medium size washing stations.<br/><br/>
                    Features:<br/>
                    - Stainless steel construction<br/>
                    - Adjustable grinding settings<br/>
                    - Energy efficient motor<br/>
                    - Easy cleaning access<br/><br/>
                    This unit was imported from Italy and has been serviced regularly. Works like new.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                <Info className="w-3.5 h-3.5" />
                A well-written description can increase sales by up to 30%.
              </div>
            </div>
          </Section>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Buyer Preview */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Buyer Preview</h4>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-300" />
            </div>
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/50">
              <div className="relative aspect-[4/3] bg-slate-100">
                <img src={product.image_url?.split(',')[0]} alt="" className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 bg-slate-900 text-[9px] font-bold text-white px-2.5 py-1 rounded-full">NEW</div>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-1">
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Industrial • Addis Ababa</div>
                  <h3 className="text-lg font-extrabold text-slate-900 leading-tight">Industrial Coffee Processing Machine - Grade A</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-black text-primary">45,000 <span className="text-[10px] font-bold uppercase tracking-tighter">ETB</span></span>
                    <span className="text-xs text-slate-300 line-through">48,500 ETB</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 pt-3 border-t border-slate-50">
                  <div className="w-8 h-8 rounded-full bg-slate-200 border border-white" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Abebe Bikila</div>
                    <div className="text-[9px] text-slate-400 font-medium italic">4.8 ★ (120 reviews)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Log */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-6 shadow-sm">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-slate-400" />
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Activity Log</h4>
            </div>
            <div className="space-y-6 relative before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-px before:bg-slate-100">
              <ActivityItem 
                title="Price Reduced" 
                time="TODAY, 11:20 AM" 
                desc="Sale price updated from 47,000 ETB to 45,000 ETB."
                active
              />
              <ActivityItem 
                title="Listing Featured" 
                time="YESTERDAY" 
                desc="Listing was boosted for 3 days in Ethiopia Industrial category."
              />
              <ActivityItem 
                title="Stock Updated" 
                time="OCT 22" 
                desc="Available inventory changed from 5 to 3 units."
              />
              <ActivityItem 
                title="Listing Created" 
                time="OCT 10" 
                desc="Initially published with 4 photos and description."
              />
            </div>
          </div>

          {/* Other Listings */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Other Listings by You</h4>
              <Link href="/dashboard/seller" className="text-[9px] font-bold text-primary hover:underline">View All</Link>
            </div>
            <div className="space-y-3">
              {otherListings.map((l) => (
                <div key={l.id} className="flex items-center gap-4 p-3 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 transition-colors group cursor-pointer">
                  <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
                    <img src={l.image_url?.split(',')[0]} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-[11px] font-bold text-slate-900 truncate">{l.title}</h5>
                    <div className="text-[10px] font-extrabold text-slate-500 mt-0.5">{l.price.toLocaleString()} ETB &bull; <span className="text-green-500 uppercase font-bold">Active</span></div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors" />
                </div>
              ))}
              <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50/50 border border-slate-100 opacity-60">
                <div className="w-14 h-14 rounded-xl bg-slate-200" />
                <div className="flex-1">
                  <div className="h-3 w-32 bg-slate-200 rounded animate-pulse mb-2" />
                  <div className="h-2 w-20 bg-slate-200 rounded animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 h-24 bg-white border-t border-slate-100 z-50 flex items-center px-8">
        <div className="max-w-[1400px] mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button className="text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors">Discard changes</button>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
              <Clock className="w-3.5 h-3.5" />
              Auto-saved 2 mins ago
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="h-12 px-8 font-bold border-slate-200 text-slate-700" disabled={isPending}>Unpublish Listing</Button>
            <Button 
              onClick={handleSave}
              disabled={isPending}
              className="h-12 px-10 bg-slate-950 text-white font-bold hover:bg-slate-900 shadow-xl shadow-slate-200"
            >
              {isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Footer (matches image) */}
      <div className="text-center pt-24 pb-8 border-t border-slate-100">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">© 2024 Shaggar Dash. Built for East Africa.</p>
        <div className="flex justify-center gap-6 mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
          <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
          <Link href="#" className="hover:text-primary transition-colors">Support</Link>
        </div>
      </div>
    </div>
  );
}

function Section({ title, description, children }: any) {
  return (
    <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm space-y-6">
      <div className="space-y-1">
        <h3 className="text-xl font-black text-slate-900 tracking-tight">{title}</h3>
        <p className="text-xs font-medium text-slate-400 leading-relaxed">{description}</p>
      </div>
      <div className="pt-4 border-t border-slate-50">
        {children}
      </div>
    </div>
  );
}

function StatsCard({ label, value, change }: any) {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm group hover:border-primary/20 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">{label}</div>
        <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-primary/5 transition-colors">
          <Eye className="w-3.5 h-3.5 text-slate-400 group-hover:text-primary" />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div className="text-3xl font-black text-slate-900">{value}</div>
        <div className="text-[10px] font-black text-green-500 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
          {change}
        </div>
      </div>
    </div>
  );
}

function ActivityItem({ title, time, desc, active }: any) {
  return (
    <div className="relative pl-6">
      <div className={`absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm z-10 ${
        active ? 'bg-primary' : 'bg-slate-200'
      }`} />
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <h5 className="text-[11px] font-bold text-slate-900">{title}</h5>
          <span className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">{time}</span>
        </div>
        <p className="text-[10px] text-slate-400 font-medium leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
