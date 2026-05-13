import { createClient } from '@/utils/supabase/server';
import { redirect } from '@/i18n/routing';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, CheckCircle, Clock, Plus, Eye } from 'lucide-react';
import { Link } from '@/i18n/routing';

type Props = {
  params: Promise<{ locale: string }>
}

export default async function EmployeeDashboard({ params }: Props) {
  const { locale } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect({ href: '/auth/login', locale });
  }

  // Fetch applications
  const { data: applications } = await supabase
    .from('applications')
    .select('*, jobs(title, company)')
    .eq('applicant_id', user!.id)
    .order('created_at', { ascending: false });

  // Fetch gig orders (as freelancer)
  const { data: gigOrders } = await supabase
    .from('gig_orders')
    .select('*, gigs(title), profiles!gig_orders_client_id_fkey(full_name)')
    .eq('freelancer_id', user!.id)
    .order('created_at', { ascending: false });

  const activeApps = applications?.filter(a => a.status === 'pending').length || 0;
  const activeGigs = gigOrders?.filter(g => g.delivery_status === 'pending' || g.delivery_status === 'in_progress').length || 0;
  const completedGigs = gigOrders?.filter(g => g.delivery_status === 'completed').length || 0;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Employee Dashboard</h1>
          <p className="text-slate-500 mt-1">Track your job applications and gig progress</p>
        </div>
        <Link href="/dashboard/employee/gigs/new">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold">
            <Plus className="w-4 h-4 mr-2" />
            Create Gig Listing
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-500">Active Applications</CardTitle>
            <div className="w-8 h-8 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{activeApps}</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-500">Active Gigs</CardTitle>
            <div className="w-8 h-8 bg-amber-50 text-amber-500 rounded-lg flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{activeGigs}</div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-500">Completed Gigs</CardTitle>
            <div className="w-8 h-8 bg-green-50 text-green-500 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{completedGigs}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-900">Your Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {applications?.map((app) => (
                <div key={app.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                  <div>
                    <h4 className="font-bold text-slate-900">{app.jobs?.title}</h4>
                    <p className="text-sm text-slate-500">{app.jobs?.company} • {new Date(app.created_at).toLocaleDateString()}</p>
                  </div>
                  <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${
                    app.status === 'accepted' ? 'bg-green-100 text-green-700' : 
                    app.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {app.status}
                  </span>
                </div>
              ))}
              {applications?.length === 0 && (
                <div className="text-center py-10 text-slate-500">No applications yet.</div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-900">Your Gigs / Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {gigOrders?.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                  <div>
                    <h4 className="font-bold text-slate-900">{order.gigs?.title}</h4>
                    <p className="text-sm text-slate-500">Client: {order.profiles?.full_name} • {order.delivery_status}</p>
                  </div>
                  <Link href={`/dashboard/employee/gigs/orders/${order.id}`}>
                    <Button variant="ghost" size="sm" className="text-primary font-bold">
                      <Eye className="w-4 h-4 mr-1" /> View
                    </Button>
                  </Link>
                </div>
              ))}
              {gigOrders?.length === 0 && (
                <div className="text-center py-10 text-slate-500">No gig orders yet.</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
