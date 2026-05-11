import { createClient } from '@/utils/supabase/server';
import { redirect } from '@/i18n/routing';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, CheckCircle, Clock, Star, Plus } from 'lucide-react';

export default async function EmployeeDashboard({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect({ href: '/auth/login', locale });
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Employee Dashboard</h1>
          <p className="text-slate-500 mt-1">Track your job applications and gig progress</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Create Gig Listing
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-500">Active Applications</CardTitle>
            <div className="w-8 h-8 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">4</div>
            <p className="text-xs text-slate-400 mt-1 font-medium">Under review</p>
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
            <div className="text-2xl font-bold text-slate-900">2</div>
            <p className="text-xs text-amber-500 mt-1 font-medium">In progress</p>
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
            <div className="text-2xl font-bold text-slate-900">18</div>
            <p className="text-xs text-green-500 mt-1 font-medium">+3 this month</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-500">Rating</CardTitle>
            <div className="w-8 h-8 bg-purple-50 text-purple-500 rounded-lg flex items-center justify-center">
              <Star className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">4.9</div>
            <p className="text-xs text-slate-400 mt-1 font-medium">From 15 reviews</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-900">Recent Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { job: 'Frontend React Developer', company: 'Tech Addis', status: 'Interview', date: 'Oct 22' },
                { job: 'UI Designer', company: 'Ethio Designs', status: 'Applied', date: 'Oct 20' },
                { job: 'Fullstack Engineer', company: 'Safaricom ET', status: 'Rejected', date: 'Oct 15' },
              ].map((app, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50">
                  <div>
                    <h4 className="font-semibold text-slate-900">{app.job}</h4>
                    <p className="text-sm text-slate-500">{app.company} • {app.date}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    app.status === 'Interview' ? 'bg-purple-100 text-purple-700' : 
                    app.status === 'Applied' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-900">Active Gig Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: 'E-commerce Website Design', client: 'Abebe K.', due: '2 days', price: 'ETB 15,000' },
                { title: 'Logo & Branding', client: 'Selam Traders', due: '5 days', price: 'ETB 5,000' },
              ].map((gig, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50">
                  <div>
                    <h4 className="font-semibold text-slate-900">{gig.title}</h4>
                    <p className="text-sm text-slate-500">Client: {gig.client} • Due in {gig.due}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-900">{gig.price}</p>
                    <Button variant="link" size="sm" className="h-auto p-0 text-primary">Deliver Work</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
