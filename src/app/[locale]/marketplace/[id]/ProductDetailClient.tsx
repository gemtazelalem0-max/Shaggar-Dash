'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { placeOrder } from '@/app/actions/orders';
import { ShoppingBag, CreditCard, Wallet, Banknote, CheckCircle2, AlertCircle } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function ProductDetailClient({ product }: { product: any }) {
  const t = useTranslations('ProductDetail');
  const [quantity, setQuantity] = useState('1');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const params = useParams();
  const locale = params.locale as string;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log('Submitting order form:', { productId: product.id, quantity, paymentMethod, unitPrice: product.price });
    setIsPending(true);
    setMessage(null);

    const formData = new FormData();
    formData.append('productId', product.id);
    formData.append('quantity', quantity);
    formData.append('paymentMethod', paymentMethod);
    formData.append('unitPrice', product.price.toString());
    formData.append('locale', locale);

    const result = await placeOrder(formData);

    if (result?.error) {
      setMessage({ type: 'error', text: result.error });
    } else {
      setMessage({ type: 'success', text: t('order_success') });
    }
    setIsPending(false);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Product Image */}
      <div className="rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 aspect-square">
        {product.image_url ? (
          <img 
            src={product.image_url?.split(',')[0]} 
            alt={product.title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">
            {t('no_image')}
          </div>
        )}
      </div>

      {/* Product Info & Order Form */}
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wider">
            {product.category}
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 leading-tight">{product.title}</h1>
          <div className="flex items-center gap-4">
            <div className="text-3xl font-extrabold text-primary">
              {product.price.toLocaleString()} <span className="text-sm font-bold uppercase">ETB</span>
            </div>
            <div className="h-6 w-px bg-slate-200"></div>
            <div className="text-slate-500 font-medium">{product.city}</div>
          </div>
          <p className="text-slate-600 leading-relaxed text-lg">{product.description}</p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase text-slate-500">{t('quantity')}</Label>
                <Select value={quantity} onValueChange={(val) => setQuantity(val || '1')}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 10].map(q => (
                      <SelectItem key={q} value={q.toString()}>{q}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase text-slate-500">{t('payment_method')}</Label>
                <Select value={paymentMethod} onValueChange={(val) => setPaymentMethod(val || 'cash')}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">
                      <div className="flex items-center gap-2">
                        <Banknote className="w-4 h-4" /> {t('cash_on_delivery')}
                      </div>
                    </SelectItem>
                    <SelectItem value="telebirr">
                      <div className="flex items-center gap-2">
                        <Wallet className="w-4 h-4" /> {t('telebirr')}
                      </div>
                    </SelectItem>
                    <SelectItem value="cbebirr">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4" /> {t('cbebirr')}
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isPending}
              className="w-full h-14 bg-slate-900 text-white hover:bg-slate-800 font-bold text-lg rounded-xl shadow-lg shadow-slate-200 transition-all active:scale-[0.98]"
            >
              {isPending ? t('placing_order') : (
                <span className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" /> {t('place_order_btn')}
                </span>
              )}
            </Button>
          </form>

          {message && (
            <div className={`p-4 rounded-xl flex items-start gap-3 ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
              {message.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
              <p className="text-sm font-medium">{message.text}</p>
            </div>
          )}
        </div>

        {/* Seller Info Card */}
        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500">
            {product.profiles?.full_name?.charAt(0) || 'S'}
          </div>
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">{t('sold_by')}</div>
            <div className="font-bold text-slate-900">{product.profiles?.full_name || 'Anonymous Seller'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
