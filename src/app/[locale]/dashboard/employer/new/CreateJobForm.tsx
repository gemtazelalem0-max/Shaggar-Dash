'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createJob } from '@/app/actions/jobs';
import { useRouter } from '@/i18n/routing';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function CreateJobForm({ locale }: { locale: string }) {
  const t = useTranslations('Jobs');
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    formData.append('locale', locale);

    const result = await createJob(formData);

    if (result?.error) {
      setMessage({ type: 'error', text: result.error });
      setIsPending(false);
    } else {
      setMessage({ type: 'success', text: 'Job posted successfully!' });
      setTimeout(() => {
        router.push('/dashboard/employer');
      }, 1500);
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Post a New Job</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Job Title</Label>
          <Input id="title" name="title" placeholder="e.g. Senior React Developer" required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="company">Company Name</Label>
            <Input id="company" name="company" placeholder="e.g. Ethio Telecom" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" name="city" placeholder="e.g. Addis Ababa" required />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="type">Job Type</Label>
            <Select name="type" defaultValue="full-time">
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="salary_range">Salary Range</Label>
            <Input id="salary_range" name="salary_range" placeholder="e.g. 25,000 - 35,000 ETB" required />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Full Job Description</Label>
          <Textarea id="description" name="description" placeholder="Describe the role, requirements, and benefits..." className="min-h-[200px]" required />
        </div>

        <Button type="submit" disabled={isPending} className="w-full h-12 font-bold text-lg">
          {isPending ? 'Posting...' : 'Post Job Listing'}
        </Button>
      </form>

      {message && (
        <div className={`p-4 rounded-xl flex items-start gap-3 ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
          <p className="text-sm font-medium">{message.text}</p>
        </div>
      )}
    </div>
  );
}
