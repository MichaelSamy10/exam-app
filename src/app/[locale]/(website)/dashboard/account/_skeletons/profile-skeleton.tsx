import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProfileSkeleton() {
  return (
    <div className="flex min-h-screen flex-col gap-4 bg-background p-6 animate-pulse">
      {/* First Name & Last Name Grid */}
      <div className="grid-cols-2 gap-2 lg:grid">
        {/* First Name */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24 bg-gray-200" />
          <Skeleton className="h-10 w-full bg-gray-200" />
        </div>

        {/* Last Name */}
        <div className="space-y-2 mt-3 lg:mt-0">
          <Skeleton className="h-4 w-24 bg-gray-200" />
          <Skeleton className="h-10 w-full bg-gray-200" />
        </div>
      </div>

      {/* Username */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-24 bg-gray-200" />
        <Skeleton className="h-10 w-full bg-gray-200" />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-24 bg-gray-200" />
        <Skeleton className="h-10 w-full bg-gray-200" />
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-24 bg-gray-200" />
        <Skeleton className="h-10 w-full bg-gray-200" />
      </div>

      {/* Buttons Row */}
      <div className="grid-row-2 mb-9 mt-4 grid gap-2 lg:grid-cols-2">
        {/* Delete Dialog Button Placeholder */}
        <Skeleton className="h-10 w-full bg-gray-200" />
        {/* Save Changes Button Placeholder */}
        <Skeleton className="h-10 w-full bg-gray-200" />
      </div>
    </div>
  );
}
