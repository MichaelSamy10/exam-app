'use client';

import { useSearchParams } from 'next/navigation';
import DashboardHeading from '../_components/dashboard-heading';
import { CircleQuestionMark } from 'lucide-react';
import QuestionCard from './_components/question-card';
import BreadCrumb from '../_components/breadcrumb';

export default function Questions() {
  const searchParams = useSearchParams();
  const examName = searchParams.get('examName');
  const url = window.location.href;

  return (
    <div>
      {/* Navigation */}
      <BreadCrumb
        items={[
          { label: 'Exams', href: '/dashboard' },
          { label: `${examName}`, href: `${url}` },
        ]}
      />

      <div className="min-h-screen bg-gray-50 p-6">
        {/* Header */}
        <DashboardHeading
          title={`${examName} Questions`}
          icon={
            <CircleQuestionMark width={45} height={45} />
          }
          backButton={true}
        />
        <QuestionCard />
      </div>
    </div>
  );
}
