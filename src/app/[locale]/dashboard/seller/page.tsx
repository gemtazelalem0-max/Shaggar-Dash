import { createClient } from '@/utils/supabase/server';
import SellerDashboardClient from './SellerDashboardClient';
import { redirect } from 'next/navigation';
import { getLocale } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>
}

export default async function SellerDashboardPage({ params }: Props) {
  const { locale } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/${locale}/auth/login`);
  }

  // Fetch listings
  const { data: listings } = await supabase
    .from('products')
    .select('*')
    .eq('seller_id', user!.id)
    .order('created_at', { ascending: false });

  // Fetch incoming orders
  const { data: incomingOrders } = await supabase
    .from('orders')
    .select('*, products(title), buyer:profiles!orders_buyer_id_fkey(full_name)')
    .in('product_id', listings?.map(l => l.id) || [])
    .order('created_at', { ascending: false });

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <SellerDashboardClient 
        listings={listings || []} 
        incomingOrders={incomingOrders || []} 
      />
    </div>
  );
}
