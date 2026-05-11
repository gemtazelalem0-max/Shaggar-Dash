import { createClient } from '@/utils/supabase/server';
import MarketplaceClient from './MarketplaceClient';
import { useTranslations } from 'next-intl';

export default function MarketplacePage() {
  const t = useTranslations('Marketplace');
  
  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 pt-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2">{t('title')}</h1>
          <p className="text-slate-500 font-medium">{t('description')}</p>
        </div>
        <MarketplacePageContent />
      </div>
    </div>
  );
}

async function MarketplacePageContent() {
  const supabase = await createClient();

  const { data: products } = await supabase
    .from('products')
    .select('*, profiles(full_name)')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  return <MarketplaceClient initialProducts={products || []} />;
}
