'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Briefcase, FileText, CheckCircle, Plus, Eye, Check, X } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { updateApplicationStatus } from '@/app/actions/jobs';

export default function EmployerDashboardClient({ 
  jobs, 
  applications, 
  locale 
}: { 
  jobs: any[], 
  applications: any[],
  locale: string 
}) {
  const [isPending, setIsPending] = useState<string | null>(null);

  async function handleStatusUpdate(appId: string, status: string) {
    setIsPending(appId);
    await updateApplicationStatus(appId, status, locale);
    setIsPending(null);
  }

  const activeJobs = jobs.filter(j => j.status === 'active').length;
  const totalApps = applications.length;
  const pendingApps = applications.filter(a => a.status === 'pending').length;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Employer Dashboard</h1>
          <p className="text-slate-500 mt-1">Manage your job posts and review applicants</p>
        </div>
        <Link href="/dashboard/employer/new">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold">
            <Plus className="w-4 h-4 mr-2" />
            Post New Job
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-500">Active Jobs</CardTitle>
            <div className="w-8 h-8 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{activeJobs}</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-500">Total Applicants</CardTitle>
            <div className="w-8 h-8 bg-amber-50 text-amber-500 rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{totalApps}</div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-500">Pending Review</CardTitle>
            <div className="w-8 h-8 bg-purple-50 text-purple-500 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{pendingApps}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-slate-900">Your Job Listings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-y border-slate-100">
                <tr>
                  <th className="px-4 py-3 font-medium">Job Title</th>
                  <th className="px-4 py-3 font-medium">City</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-slate-50/50">
                    <td className="px-4 py-3 font-medium text-slate-900">{job.title}</td>
                    <td className="px-4 py-3 text-slate-600">{job.city}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${job.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link href={`/jobs/${job.id}`}>
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                          <Eye className="w-4 h-4 mr-1" /> View
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
                {jobs.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-slate-500 font-medium">You haven&apos;t posted any jobs yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-slate-900">Incoming Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-y border-slate-100">
                <tr>
                  <th className="px-4 py-3 font-medium">Applicant</th>
                  <th className="px-4 py-3 font-medium">Job</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/50">
                    <td className="px-4 py-3 font-medium text-slate-900">{app.profiles?.full_name}</td>
                    <td className="px-4 py-3 text-slate-600">{app.jobs?.title}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        app.status === 'accepted' ? 'bg-green-100 text-green-700' :
                        app.status === 'rejected' ? 'bg-red-100 text-red-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right space-x-2">
                      {app.status === 'pending' && (
                        <>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-green-600 border-green-200 hover:bg-green-50"
                            disabled={isPending === app.id}
                            onClick={() => handleStatusUpdate(app.id, 'accepted')}
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-600 border-red-200 hover:bg-red-50"
                            disabled={isPending === app.id}
                            onClick={() => handleStatusUpdate(app.id, 'rejected')}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
                {applications.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-slate-500 font-medium">No applications yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
