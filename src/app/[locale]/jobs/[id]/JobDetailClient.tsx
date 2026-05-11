'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { applyToJob } from '@/app/actions/jobs';
import { CheckCircle2, AlertCircle, Briefcase, MapPin, Banknote, Calendar } from 'lucide-react';

export default function JobDetailClient({ job, locale }: { job: any, locale: string }) {
  const t = useTranslations('Jobs');
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [coverNote, setCoverNote] = useState('');

  async function handleApply(e: React.FormEvent) {
    e.preventDefault();
    setIsPending(true);
    setMessage(null);

    const formData = new FormData();
    formData.append('job_id', job.id);
    formData.append('cover_note', coverNote);
    formData.append('locale', locale);

    const result = await applyToJob(formData);

    if (result?.error) {
      setMessage({ type: 'error', text: result.error });
    } else {
      setMessage({ type: 'success', text: 'Application submitted successfully!' });
    }
    setIsPending(false);
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full w-fit uppercase">
            {job.type}
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">{job.title}</h1>
          <p className="text-xl font-bold text-slate-600">{job.company}</p>
          
          <div className="flex flex-wrap gap-6 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2 text-slate-500 font-medium">
              <MapPin className="w-4 h-4" /> {job.city}
            </div>
            <div className="flex items-center gap-2 text-slate-500 font-medium">
              <Banknote className="w-4 h-4" /> {job.salary_range}
            </div>
            <div className="flex items-center gap-2 text-slate-500 font-medium">
              <Calendar className="w-4 h-4" /> {new Date(job.created_at).toLocaleDateString()}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Description</h2>
          <div className="text-slate-600 leading-relaxed whitespace-pre-wrap">
            {job.description}
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-slate-900">Apply for this position</h2>
        <form onSubmit={handleApply} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cover_note">Cover Note / Why should we hire you?</Label>
            <Textarea 
              id="cover_note"
              placeholder="Tell the employer about your experience..."
              className="min-h-[150px]"
              value={coverNote}
              onChange={(e) => setCoverNote(e.target.value)}
              required
            />
          </div>
          <Button 
            type="submit" 
            disabled={isPending}
            className="w-full h-12 bg-primary text-white font-bold text-lg"
          >
            {isPending ? 'Submitting...' : 'Submit Application'}
          </Button>
        </form>

        {message && (
          <div className={`p-4 rounded-xl flex items-start gap-3 ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {message.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
            <p className="text-sm font-medium">{message.text}</p>
          </div>
        )}
      </div>
    </div>
  );
}
