'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Link } from '@/i18n/routing';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { createProduct, updateProductStatus, deleteProduct } from '@/app/actions/products';
import { updateOrderStatus } from '@/app/actions/orders';
import { 
  Plus, 
  Package, 
  ShoppingBag, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Truck, 
  Eye,
  Pause,
  Play
} from 'lucide-react';
import { useParams } from 'next/navigation';

export default function SellerDashboardClient({ 
  listings, 
  incomingOrders 
}: { 
  listings: any[], 
  incomingOrders: any[] 
}) {
  const t = useTranslations('Dashboard');
  const params = useParams();
  const locale = params.locale as string;

  return (
    <div className="space-y-12">
      {/* Header & Quick Stats */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">{t('seller_title')}</h1>
          <p className="text-slate-500 font-medium">{t('seller_subtitle')}</p>
        </div>
        <Link href="/dashboard/seller/new">
          <Button className="bg-primary text-white hover:bg-primary/90 font-bold shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4 mr-2" /> {t('post_new')}
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">{listings.length}</div>
            <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">{t('total_listings')}</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">{incomingOrders.length}</div>
            <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">{t('pending_orders')}</div>
          </div>
        </div>
      </div>

      {/* Incoming Orders */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-primary" /> {t('incoming_orders')}
        </h2>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="font-bold">{t('product')}</TableHead>
                <TableHead className="font-bold">{t('customer')}</TableHead>
                <TableHead className="font-bold">{t('payment')}</TableHead>
                <TableHead className="font-bold">{t('status')}</TableHead>
                <TableHead className="text-right font-bold">{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {incomingOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12 text-slate-400 font-medium">{t('no_incoming')}</TableCell>
                </TableRow>
              ) : incomingOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <div className="font-bold text-slate-900">{order.products?.title}</div>
                    <div className="text-xs text-slate-500">{t('qty', { count: order.quantity })} • {t('total')}: {order.total_price} ETB</div>
                  </TableCell>
                  <TableCell className="text-sm font-medium text-slate-600">
                    {order.buyer?.full_name || 'Anonymous'}
                  </TableCell>
                  <TableCell className="capitalize text-sm font-bold text-slate-500">{order.payment_method}</TableCell>
                  <TableCell>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      order.status === 'completed' ? 'bg-green-50 text-green-700' :
                      order.status === 'pending' ? 'bg-amber-50 text-amber-700' :
                      order.status === 'cancelled' ? 'bg-red-50 text-red-700' :
                      'bg-blue-50 text-blue-700'
                    }`}>
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {order.status === 'pending' && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8 text-green-600 border-green-200 hover:bg-green-50"
                          onClick={() => updateOrderStatus(order.id, 'confirmed', locale)}
                        >
                          {t('confirm')}
                        </Button>
                      )}
                      {order.status === 'confirmed' && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8 text-blue-600 border-blue-200 hover:bg-blue-50"
                          onClick={() => updateOrderStatus(order.id, 'delivered', locale)}
                        >
                          <Truck className="w-3 h-3 mr-1" /> {t('delivered')}
                        </Button>
                      )}
                      {['pending', 'confirmed'].includes(order.status) && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8 text-red-600 border-red-200 hover:bg-red-50"
                          onClick={() => updateOrderStatus(order.id, 'cancelled', locale)}
                        >
                          {t('cancel')}
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Your Listings */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Package className="w-5 h-5 text-primary" /> {t('your_listings')}
        </h2>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="font-bold">Product</TableHead>
                <TableHead className="font-bold">Price</TableHead>
                <TableHead className="font-bold">Category</TableHead>
                <TableHead className="font-bold">Status</TableHead>
                <TableHead className="text-right font-bold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12 text-slate-400 font-medium">{t('no_listings')}</TableCell>
                </TableRow>
              ) : listings.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                        <img src={product.image_url?.split(',')[0]} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="font-bold text-slate-900">{product.title}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-extrabold text-primary">{product.price} ETB</TableCell>
                  <TableCell className="text-sm font-medium text-slate-500">{product.category}</TableCell>
                  <TableCell>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      product.is_active ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {product.is_active ? t('active') : t('paused')}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/dashboard/seller/edit/${product.id}`}>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="w-8 h-8 rounded-full"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4 text-blue-500" />
                        </Button>
                      </Link>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="w-8 h-8 rounded-full"
                        onClick={() => updateProductStatus(product.id, !product.is_active, locale)}
                        title={product.is_active ? 'Pause' : 'Activate'}
                      >
                        {product.is_active ? <Pause className="w-4 h-4 text-amber-500" /> : <Play className="w-4 h-4 text-green-500" />}
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="w-8 h-8 rounded-full text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => {
                          if (confirm(t('delete_confirm'))) {
                            deleteProduct(product.id, locale);
                          }
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
}
