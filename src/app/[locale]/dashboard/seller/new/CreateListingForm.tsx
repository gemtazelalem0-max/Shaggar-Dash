'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, type ChangeEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createProduct } from '@/app/actions/products';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { 
  ChevronRight, 
  Upload, 
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
  Eye
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

export default function CreateListingForm() {
  const t = useTranslations('Dashboard');
  const [images, setImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState('New');
  const [inStock, setInStock] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;

  async function handlePublish() {
    setIsPending(true);
    setErrorMsg('');
    setUploadProgress(5);

    if (imageFiles.length === 0) {
      setErrorMsg('Please select at least one image.');
      setIsPending(false);
      setUploadProgress(0);
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price.replace(/,/g, ''));
    formData.append('category', 'Fashion'); // Fixed for demo, should be state
    formData.append('city', 'Addis Ababa'); // Fixed for demo, should be state
    imageFiles.forEach((file) => formData.append('images', file));
    formData.append('description', 'New listing from advanced form');
    formData.append('locale', locale);

    setUploadProgress(35);

    const result = await createProduct(formData);
    setUploadProgress(100);
    if (result?.error) {
      setErrorMsg(result.error);
      setUploadProgress(0);
    } else {
      router.push('/dashboard/seller');
    }
    setIsPending(false);
  }

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    const allowedTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);
    const validFiles = files.filter((file) => allowedTypes.has(file.type)).slice(0, 5);

    if (validFiles.length !== files.length || validFiles.length > 5) {
      setErrorMsg('Only jpg, png, webp are allowed, up to 5 images.');
    } else {
      setErrorMsg('');
    }

    setImageFiles(validFiles);
    setImages(validFiles.map((file) => URL.createObjectURL(file)));
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8">
      {/* Breadcrumbs & Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="space-y-1">
          <nav className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            <Link href="/dashboard/seller" className="hover:text-primary">Listings</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-600">Create Listing</span>
          </nav>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Add New Product</h1>
          <p className="text-slate-500 font-medium">Reach thousands of buyers across Ethiopia and East Africa.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-11 px-6 font-bold text-slate-600 border-slate-200" disabled={isPending}>Save Draft</Button>
          <Button 
            onClick={handlePublish}
            disabled={isPending}
            className="h-11 px-6 bg-slate-900 text-white font-bold hover:bg-slate-800 shadow-lg shadow-slate-200"
          >
            {isPending ? 'Publishing...' : 'Publish Listing'}
          </Button>
        </div>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm font-bold flex items-center gap-2">
          <Info className="w-4 h-4" /> {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
        {/* Left Column: Form Sections */}
        <div className="space-y-8">
          
          {/* Product Images Section */}
          <Section title="Product Images" description="Upload up to 5 images (jpg, png, webp). The first image is your main listing cover.">
            <div className="space-y-6">
              <label htmlFor="product-images-upload" className="border-2 border-dashed border-slate-200 rounded-2xl p-12 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer group">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6 text-slate-400" />
                </div>
                <h4 className="font-bold text-slate-900 mb-1">Drag and drop images here</h4>
                <p className="text-xs text-slate-400 font-medium mb-6 text-center">PNG, JPG, WEBP up to 5 files. Recommended 1200x1200px.</p>
                <Button type="button" variant="outline" className="h-9 px-6 text-xs font-bold bg-white">Browse Files</Button>
                <input
                  id="product-images-upload"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>

              {isPending && (
                <div className="space-y-2">
                  <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                    <div className="h-full bg-primary transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                  </div>
                  <p className="text-xs text-slate-500 font-medium">Uploading images... {uploadProgress}%</p>
                </div>
              )}

              <div className="flex flex-wrap gap-4">
                {images.map((img, i) => (
                  <div key={i} className="relative w-32 h-32 rounded-xl overflow-hidden border-2 border-white shadow-md group">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    {i === 0 && (
                      <div className="absolute bottom-0 left-0 right-0 bg-slate-900/80 text-[8px] font-bold text-white text-center py-1 uppercase tracking-widest">
                        Primary
                      </div>
                    )}
                    <button className="absolute top-1 right-1 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="w-3 h-3 text-red-500" />
                    </button>
                  </div>
                ))}
                {images.length === 0 && (
                  <div className="w-full text-xs text-slate-400 font-medium">No images selected yet.</div>
                )}
              </div>
            </div>
          </Section>

          {/* Basic Details Section */}
          <Section icon={<Info className="w-5 h-5" />} title="Basic Details" description="Help buyers find your item with a clear title and correct category.">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-xs font-bold text-slate-700 uppercase tracking-wider">Product Title *</Label>
                <Input 
                  id="title" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)}
                  className="h-12 bg-slate-50/50 border-slate-200 focus:bg-white transition-all text-sm font-medium" 
                />
                <p className="text-[10px] text-slate-400 font-medium">Keep it descriptive but concise (max 80 chars).</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Category *</Label>
                  <Select>
                    <SelectTrigger className="h-12 bg-slate-50/50 border-slate-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fashion">Fashion & Clothing</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Subcategory</Label>
                  <Select>
                    <SelectTrigger className="h-12 bg-slate-50/50 border-slate-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="shoes">Shoes & Sneakers</SelectItem>
                      <SelectItem value="bags">Bags & Accessories</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Condition *</Label>
                <div className="flex flex-wrap gap-2">
                  {['New', 'Used', 'Refurbished'].map((c) => (
                    <button 
                      key={c}
                      onClick={() => setCondition(c)}
                      className={`px-6 py-2.5 rounded-lg text-xs font-bold transition-all border ${
                        condition === c 
                          ? 'bg-slate-900 text-white border-slate-900 shadow-md' 
                          : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          {/* Pricing & Stock Section */}
          <Section title="Pricing & Stock" description="Set your price in ETB and manage your inventory counts.">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Selling Price *</Label>
                <div className="relative group">
                  <div className="absolute left-0 inset-y-0 w-12 flex items-center justify-center bg-slate-100 border-r border-slate-200 rounded-l-lg text-[10px] font-bold text-slate-500 uppercase">
                    ETB
                  </div>
                  <Input 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="h-12 pl-16 bg-slate-50/50 border-slate-200 group-hover:bg-white transition-all text-base font-extrabold text-primary" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Available Quantity</Label>
                <Input type="number" className="h-12 bg-slate-50/50 border-slate-200 transition-all font-bold" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">SKU (Optional)</Label>
                <Input placeholder="e.g. NIK-270-BLK-42" className="h-12 bg-slate-50/50 border-slate-200 transition-all font-medium" />
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl border border-slate-200 self-end h-12">
                <div className="space-y-0.5">
                  <div className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">In Stock</div>
                  <div className="text-[9px] text-slate-400 font-medium">Currently visible to buyers</div>
                </div>
                <button 
                  onClick={() => setInStock(!inStock)}
                  className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${inStock ? 'bg-primary' : 'bg-slate-300'}`}
                >
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-200 ${inStock ? 'left-6' : 'left-1'}`} />
                </button>
              </div>
            </div>
          </Section>

          {/* Product Description Section */}
          <Section title="Product Description" description="Provide detailed information about features, quality, and origin.">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Short Summary</Label>
                <Input placeholder="Brief one-line summary" className="h-12 bg-slate-50/50 border-slate-200 transition-all text-sm font-medium" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Full Description *</Label>
                <div className="rounded-xl border border-slate-200 overflow-hidden bg-white shadow-sm">
                  <div className="flex items-center gap-1 p-2 border-b border-slate-100 bg-slate-50/50">
                    <button className="p-1.5 hover:bg-white rounded transition-colors text-slate-400 hover:text-slate-900"><Bold className="w-3.5 h-3.5" /></button>
                    <button className="p-1.5 hover:bg-white rounded transition-colors text-slate-400 hover:text-slate-900"><Italic className="w-3.5 h-3.5" /></button>
                    <button className="p-1.5 hover:bg-white rounded transition-colors text-slate-400 hover:text-slate-900"><Underline className="w-3.5 h-3.5" /></button>
                    <div className="w-px h-4 bg-slate-200 mx-1"></div>
                    <button className="p-1.5 hover:bg-white rounded transition-colors text-slate-400 hover:text-slate-900"><Type className="w-3.5 h-3.5" /></button>
                  </div>
                  <Textarea 
                    placeholder="Tell potential buyers why they should choose your product..." 
                    className="border-none focus:ring-0 min-h-[200px] bg-transparent text-sm leading-relaxed p-4"
                  />
                </div>
              </div>
            </div>
          </Section>

          {/* Location & Delivery Section */}
          <Section title="Location & Delivery" description="Set your city and how you'll get the product to the buyer.">
            <div className="space-y-8">
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">City *</Label>
                <Select>
                  <SelectTrigger className="h-12 bg-slate-50/50 border-slate-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="addis">Addis Ababa</SelectItem>
                    <SelectItem value="dire">Dire Dawa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Shipping Options</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button className="p-5 rounded-2xl border-2 border-primary bg-primary/5 flex items-start gap-4 text-left group transition-all">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                      <div className="w-4 h-4 rounded bg-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm mb-1">Local Pickup</h4>
                      <p className="text-[10px] text-slate-500 leading-snug">Buyer comes to your location to collect.</p>
                    </div>
                  </button>
                  <button className="p-5 rounded-2xl border border-slate-200 hover:border-slate-300 flex items-start gap-4 text-left group transition-all">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 shrink-0 group-hover:scale-110 transition-transform">
                      <div className="w-4 h-4 rounded border-2 border-slate-200" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm mb-1">Standard Delivery</h4>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Fee:</span>
                        <div className="bg-slate-100 px-2 py-1 rounded text-[10px] font-extrabold">150 ETB</div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </Section>

          {/* Payment Options Section */}
          <Section title="Payment Options" description="Select which Ethiopian payment methods you accept.">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <OptionCard title="Cash on Delivery" icon={<div className="w-3 h-3 rounded-sm bg-amber-500" />} subtitle="LOCAL STANDARD" selected />
                <OptionCard title="Telebirr" icon={<div className="w-3 h-3 rounded-sm bg-blue-500" />} subtitle="FAST PAY" />
                <OptionCard title="CBE Birr" icon={<div className="w-3 h-3 rounded-sm bg-orange-500" />} subtitle="BANK TRANSFER" />
              </div>
              <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 flex items-start gap-3">
                <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <p className="text-[11px] text-blue-700 font-medium leading-relaxed">
                  <span className="font-bold">Pro Tip:</span> Sellers who accept digital payments (Telebirr, CBE) typically sell items 40% faster on Shaggar Dash.
                </p>
              </div>
            </div>
          </Section>

          {/* Action Buttons Bottom */}
          <div className="pt-8 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <Button variant="ghost" className="text-slate-500 font-bold hover:text-red-500 transition-colors">Discard Changes</Button>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="h-11 px-8 font-bold border-slate-200" disabled={isPending}>Save as Draft</Button>
              <Button 
                onClick={handlePublish}
                disabled={isPending}
                className="h-11 px-8 bg-slate-900 text-white font-bold hover:bg-slate-800 shadow-xl shadow-slate-200"
              >
                {isPending ? 'Publishing...' : 'Publish Listing Now'}
              </Button>
            </div>
          </div>

          <div className="text-center pt-12 pb-8 border-t border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">© 2024 Shaggar Dash. Built for East Africa.</p>
            <div className="flex justify-center gap-6 mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <Link href="#" className="hover:text-primary transition-colors">Twitter</Link>
              <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-primary transition-colors">Support</Link>
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Preview & Tips */}
        <div className="space-y-8 h-fit lg:sticky lg:top-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <div className="w-2 h-2 rounded-full bg-green-500" /> Live Preview
            </div>
            
            {/* Preview Card */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-2xl shadow-slate-200/50 group">
              <div className="relative aspect-[4/5] bg-slate-100 overflow-hidden">
                {images[0] ? (
                  <img src={images[0]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs font-semibold text-slate-400">
                    No image selected
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold shadow-sm">New</div>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-extrabold text-slate-900 leading-tight line-clamp-1">{title || 'Your listing title'}</h3>
                  <div className="text-2xl font-black text-primary flex items-baseline gap-1">
                    {price || '0'} <span className="text-xs font-bold uppercase tracking-widest text-slate-400">ETB</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1.5 text-slate-500">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="text-xs font-semibold">Addis Ababa &bull; <span className="text-slate-400">Just now</span></span>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center font-bold text-slate-500 text-xs uppercase">AK</div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-slate-900 leading-tight">Abelko Kikila</div>
                    <div className="text-[10px] font-semibold text-green-600 flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Verified Seller
                    </div>
                  </div>
                </div>

                <Button className="w-full h-12 bg-slate-400 text-white font-bold cursor-not-allowed opacity-80 rounded-xl">Message Seller</Button>
              </div>
            </div>
            
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
              <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                This is a real-time overview of how your listing will look to shoppers in the marketplace.
              </p>
            </div>
          </div>

          {/* Selling Tips */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-slate-400" />
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Selling Tips</h4>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Detailed descriptions reduce buyer questions by 60%.</p>
              </li>
              <li className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Items with 5+ photos receive 2x more messages.</p>
              </li>
              <li className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Use the brand and model clearly in the title.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, description, children, icon }: any) {
  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-start gap-4 pb-6 border-b border-slate-50">
        <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400">
          {icon || <Package className="w-5 h-5" />}
        </div>
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">{title}</h3>
          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{description}</p>
        </div>
      </div>
      <div className="pt-2">
        {children}
      </div>
    </div>
  );
}

function OptionCard({ title, icon, subtitle, selected }: any) {
  return (
    <button className={`p-4 rounded-xl border-2 text-left flex items-start gap-3 transition-all group ${
      selected ? 'border-primary bg-primary/5' : 'border-slate-100 bg-slate-50/50 hover:border-slate-200'
    }`}>
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-all group-hover:scale-110 ${
        selected ? 'bg-primary/10 border-primary/20' : 'bg-white border-slate-100'
      }`}>
        {icon}
      </div>
      <div>
        <h4 className="text-[11px] font-bold text-slate-900 mb-0.5 line-clamp-1">{title}</h4>
        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.15em]">{subtitle}</p>
      </div>
    </button>
  );
}
