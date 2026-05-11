import CreateGigForm from './CreateGigForm';

export default async function NewGigPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4">
        <CreateGigForm locale={locale} />
      </div>
    </div>
  );
}
