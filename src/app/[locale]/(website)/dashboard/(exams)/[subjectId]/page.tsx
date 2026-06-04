import { BookOpenCheck } from 'lucide-react';
import React from 'react';
import BreadCrumb from '../../_components/breadcrumb';
import DashboardHeading from '../../_components/dashboard-heading';
import ExamsCard from './_components/examsCard';

export default function Exams({
  params,
}: {
  params: { subjectId: string };
}) {
  const { subjectId } = params;

  return (
    <div>
      {/* Breadcrumb */}
      <BreadCrumb
        items={[
          {
            label: 'Exams',
            href: `/dashboard/${subjectId}`,
          },
        ]}
      />

      <div className="bg-gray-50 p-6">
        {/* Header */}
        <DashboardHeading
          title="Exams"
          icon={<BookOpenCheck width={45} height={45} />}
          backButton={true}
        />
        <ExamsCard subjectId={subjectId} />
      </div>
    </div>
  );
}
