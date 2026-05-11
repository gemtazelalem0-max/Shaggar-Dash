'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Link } from '@/i18n/routing';
import { Search, MapPin, Grid3X3, Filter, ArrowUpDown } from 'lucide-react';

export default function MarketplaceClient({ initialProducts }: { initialProducts: any[] }) {
  const t = useTranslations('Marketplace');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [city, setCity] = useState('all');
  const [sort, setSort] = useState('newest');

  const filteredProducts = initialProducts
    .filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
    .filter(p => category === 'all' || p.category === category)
    .filter(p => city === 'all' || p.city === city)
    .sort((a, b) => {
      if (sort === 'price-low') return a.price - b.price;
      if (sort === 'price-high') return b.price - a.price;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

  const categories = Array.from(new Set(initialProducts.map(p => p.category)));
  const cities = Array.from(new Set(initialProducts.map(p => p.city)));

  return (
    <div className="space-y-8">
      {/* Header & Search */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder={t('search_placeholder')} 
              className="pl-10" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={category} onValueChange={(val) => setCategory(val || 'all')}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder={t('category')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('all_categories')}</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={city} onValueChange={(val) => setCity(val || 'all')}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder={t('city')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('all_cities')}</SelectItem>
                {cities.map(c => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sort} onValueChange={(val) => setSort(val || 'newest')}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t('sort_by')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">{t('newest')}</SelectItem>
                <SelectItem value="price-low">{t('price_low')}</SelectItem>
                <SelectItem value="price-high">{t('price_high')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow group">
            <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
              {product.image_url ? (
                <img 
                  src={product.image_url?.split(',')[0]} 
                  alt={product.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  {t('no_image', { defaultValue: 'No Image' })}
                </div>
              )}
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold text-slate-700 shadow-sm">
                {product.category}
              </div>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <h3 className="font-bold text-slate-900 text-lg leading-tight mb-1 line-clamp-1">{product.title}</h3>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium">{product.city}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xl font-extrabold text-primary">
                  {product.price.toLocaleString()} <span className="text-xs font-bold uppercase">ETB</span>
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {t('sold_by', { name: product.profiles?.full_name?.split(' ')[0] || 'Seller' })}
                </div>
              </div>
              <Link href={`/marketplace/${product.id}`}>
                <Button className="w-full bg-slate-900 text-white hover:bg-slate-800 font-bold">
                  {t('view_details')}
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
          <p className="text-slate-500 font-medium">{t('no_products')}</p>
        </div>
      )}
    </div>
  );
}
