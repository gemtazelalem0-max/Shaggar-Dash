import CreateJobForm from './CreateJobForm';

export default async function NewJobPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4">
        <CreateJobForm locale={locale} />
      </div>
    </div>
  );
}
