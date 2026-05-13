import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import EditListingForm from './EditListingForm';

type Props = {
  params: Promise<{ id: string, locale: string }>
}

export default async function EditListingPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (!product) {
    notFound();
  }

  // Fetch other listings for the sidebar
  const { data: otherListings } = await supabase
    .from('products')
    .select('*')
    .eq('seller_id', product.seller_id)
    .neq('id', product.id)
    .limit(3);

  return (
    <div className="bg-slate-50 min-h-screen">
      <EditListingForm product={product} otherListings={otherListings || []} />
    </div>
  );
}
