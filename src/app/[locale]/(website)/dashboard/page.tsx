import { GraduationCap } from 'lucide-react';
import DashboardHeading from './_components/dashboard-heading';
import DiplomaCard from './_components/diploma-card';
import BreadCrumb from './_components/breadcrumb';
import { getTranslations } from 'next-intl/server';

export default async function Home() {
  // Translations
  const t = await getTranslations('dashboard');

  return (
    <>
      {/* Navigation */}
      <BreadCrumb />

      <div className="bg-gray-50 p-6">
        {/* Header */}
        <DashboardHeading
          backButton={false}
          title={t('diplomas')}
          icon={<GraduationCap width={45} height={45} />}
        />
        <DiplomaCard />
      </div>
    </>
  );
}
