import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function ExamsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="min-h-screen bg-white p-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="mb-4 flex flex-1 flex-row items-center justify-between gap-10 bg-blue-50/50 p-4 rounded-md animate-pulse"
        >
          <div className="space-y-2">
            {/* Exam Title Skeleton */}
            <Skeleton className="h-6 w-48 bg-gray-200" />

            {/* Number of Questions Skeleton */}
            <Skeleton className="h-4 w-24 bg-gray-200" />
          </div>

          {/* Exam Duration Skeleton */}
          <div className="flex flex-row items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-full bg-gray-200" />
            <Skeleton className="h-4 w-32 bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
