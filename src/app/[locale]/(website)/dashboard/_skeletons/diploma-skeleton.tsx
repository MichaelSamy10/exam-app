import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function DiplomaSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-x-2 gap-y-5 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="relative h-64 w-full xl:h-[448px] xl:w-[336px] overflow-hidden rounded-md"
        >
          {/* Card background/image placeholder */}
          <Skeleton className="h-full w-full bg-gray-200" />

          {/* Name banner placeholder */}
          <div className="absolute bottom-2 left-1/2 h-16 w-11/12 -translate-x-1/2 transform p-2 flex items-center justify-center bg-white/30 backdrop-blur-sm rounded-sm">
            <Skeleton className="h-6 w-3/4 bg-gray-300" />
          </div>
        </div>
      ))}
    </div>
  );
}
