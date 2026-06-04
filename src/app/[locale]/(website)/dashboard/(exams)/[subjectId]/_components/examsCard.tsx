'use client';

import { getExams } from '@/lib/services/auth.service';
import { useQuery } from '@tanstack/react-query';
import { Timer } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import ExamsSkeleton from '../_skeletons/exams-skeleton';

export default function ExamsCard({
  subjectId,
}: {
  subjectId: string;
}) {
  // Translations
  const t = useTranslations('dashboard.exams');

  // Query
  const { data, isLoading } = useQuery({
    queryKey: ['Exams', subjectId],
    queryFn: () => getExams(subjectId),
  });

  if (isLoading) {
    return <ExamsSkeleton />;
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div>
        {/* Exam card */}
        {data?.exams.map(exam => (
          <Link
            href={`/dashboard/questions/?examId=${exam._id}&examName=${exam.title}`}
            key={exam._id}
            className="mb-4 flex flex-1 flex-row items-center justify-between gap-10 bg-blue-50 p-4"
          >
            <div>
              {/* Exam Title */}
              <h3 className="text-xl font-semibold text-primary">
                {exam.title}
              </h3>

              {/* Number of Questions */}
              <p className="text-gray-500">
                {exam.numberOfQuestions} {t('questions')}
              </p>
            </div>

            {/* Exam Duration */}
            <div className="flex flex-row gap-2">
              <span>
                <Timer
                  width={24}
                  height={24}
                  className="text-gray-400"
                />
              </span>
              {t('duration')}:{exam.duration} {t('minutes')}
            </div>
          </Link>
        ))}
        <p className="my-6 text-center text-secondary">
          {t('end-of-list')}
        </p>
      </div>
    </div>
  );
}
