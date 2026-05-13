import { createClient } from '@/utils/supabase/server';
import ProductDetailClient from './ProductDetailClient';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
/* eslint-disable @typescript-eslint/no-explicit-any */

type Props = {
  params: Promise<{ id: string, locale: string }>
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: product } = await supabase
    .from('products')
    .select('*, profiles(full_name)')
    .eq('id', id)
    .single();

  if (!product) {
    notFound();
  }

  // Related products (same category)
  const { data: relatedProducts } = await supabase
    .from('products')
    .select('*, profiles(full_name)')
    .eq('category', product.category)
    .neq('id', product.id)
    .limit(3);
  
  return <ProductPageContent product={product} relatedProducts={relatedProducts} />;
}

function ProductPageContent({ product, relatedProducts }: { product: any, relatedProducts: any[] | null }) {
  const t = useTranslations('ProductDetail');

  return (
    <div className="min-h-screen bg-white pb-20 pt-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <ProductDetailClient product={product} />

        {/* Related Products */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div className="mt-24 space-y-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-2xl font-extrabold text-slate-900">{t('related_products')}</h2>
              <Link href="/marketplace" className="text-sm font-bold text-primary hover:underline">{t('view_all')}</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((p) => (
                <div key={p.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="aspect-[4/3] bg-slate-100 relative">
                    {p.image_url && (
                      <img src={p.image_url?.split(',')[0]} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    )}
                  </div>
                  <div className="p-5 space-y-4">
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg line-clamp-1">{p.title}</h3>
                      <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium mt-1">
                        <MapPin className="w-3 h-3" />
                        {p.city}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="font-extrabold text-primary">
                        {p.price.toLocaleString()} <span className="text-[10px] uppercase">ETB</span>
                      </div>
                      <Link href={`/marketplace/${p.id}`}>
                        <Button variant="ghost" size="sm" className="font-bold text-slate-900">{t('details')}</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
