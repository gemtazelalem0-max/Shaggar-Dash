import { useTranslations } from 'next-intl';
import CreateListingForm from './CreateListingForm';

export default function NewListingPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <CreateListingForm />
    </div>
  );
}
