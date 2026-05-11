import { createClient } from '@/utils/supabase/server';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { ShoppingBag, Clock, CheckCircle2, XCircle, Truck } from 'lucide-react';
import { redirect } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';

export default function BuyerDashboardPage({ params }: { params: Promise<{ locale: string }> }) {
  return <BuyerDashboardContent params={params} />;
}

async function BuyerDashboardContent({ params }: { params: Promise<{ locale: string }> }) {
  const t = await getTranslations('Dashboard');
  const { locale } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect({ href: '/auth/login', locale });
  }

  const { data: orders } = await supabase
    .from('orders')
    .select('*, products(title, image_url)')
    .eq('buyer_id', user!.id)
    .order('created_at', { ascending: false });

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">{t('buyer_title')}</h1>
        <p className="text-slate-500 font-medium">{t('buyer_subtitle')}</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-bold">{t('product')}</TableHead>
              <TableHead className="font-bold">{t('date')}</TableHead>
              <TableHead className="font-bold">{t('total')}</TableHead>
              <TableHead className="font-bold">{t('payment')}</TableHead>
              <TableHead className="font-bold">{t('status')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-20 text-slate-400 font-medium">
                  <div className="flex flex-col items-center gap-2">
                    <ShoppingBag className="w-8 h-8 opacity-20" />
                    {t('no_orders')}
                  </div>
                </TableCell>
              </TableRow>
            ) : orders?.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-100">
                      <img src={order.products?.image_url?.split(',')[0]} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{order.products?.title}</div>
                      <div className="text-xs text-slate-500">{t('qty', { count: order.quantity })}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm font-medium text-slate-600">
                  {new Date(order.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="font-extrabold text-primary">{order.total_price.toLocaleString()} ETB</TableCell>
                <TableCell className="capitalize text-sm font-bold text-slate-500">{order.payment_method}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    {order.status === 'pending' && <Clock className="w-3.5 h-3.5 text-amber-500" />}
                    {order.status === 'confirmed' && <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />}
                    {order.status === 'delivered' && <Truck className="w-3.5 h-3.5 text-green-500" />}
                    {order.status === 'cancelled' && <XCircle className="w-3.5 h-3.5 text-red-500" />}
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      order.status === 'completed' || order.status === 'delivered' ? 'bg-green-50 text-green-700' :
                      order.status === 'pending' ? 'bg-amber-50 text-amber-700' :
                      order.status === 'cancelled' ? 'bg-red-50 text-red-700' :
                      'bg-blue-50 text-blue-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
