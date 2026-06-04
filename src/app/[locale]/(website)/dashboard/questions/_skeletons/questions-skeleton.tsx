import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function QuestionsSkeleton() {
  return (
    <div className="bg-white p-6 animate-pulse">
      {/* Header Info */}
      <div className="flex flex-row justify-between items-center mb-4">
        {/* Exam Title Placeholder */}
        <Skeleton className="h-6 w-64 bg-gray-200" />
        {/* Question Counter Placeholder */}
        <Skeleton className="h-5 w-24 bg-gray-200" />
      </div>

      {/* Progress Bar Placeholder */}
      <Skeleton className="h-3 w-full bg-gray-200 rounded-full mb-10" />

      {/* Question Text Placeholder */}
      <div className="space-y-3 mb-8">
        <Skeleton className="h-8 w-3/4 bg-gray-200" />
        <Skeleton className="h-8 w-1/2 bg-gray-200" />
      </div>

      {/* Answer Options Placeholders */}
      <div className="space-y-4 mb-12">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-3 bg-gray-50/50 p-4 border border-gray-100 rounded-md"
          >
            {/* Radio Circle Placeholder */}
            <Skeleton className="h-5 w-5 rounded-full bg-gray-200 shrink-0" />
            {/* Answer Text Placeholder */}
            <Skeleton className={`h-5 bg-gray-200 ${index % 2 === 0 ? 'w-1/2' : 'w-2/3'}`} />
          </div>
        ))}
      </div>

      {/* Action Footer Placeholders */}
      <div className="flex w-full items-center justify-between gap-4">
        {/* Previous Button Placeholder */}
        <Skeleton className="h-10 flex-1 bg-gray-200 rounded-md" />

        {/* Circular Timer Placeholder */}
        <div className="relative flex items-center justify-center shrink-0">
          <Skeleton className="h-20 w-20 rounded-full bg-gray-200" />
          <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
            <Skeleton className="h-4 w-10 bg-gray-200" />
          </div>
        </div>

        {/* Next/Finish Button Placeholder */}
        <Skeleton className="h-10 flex-1 bg-gray-200 rounded-md" />
      </div>
    </div>
  );
}
