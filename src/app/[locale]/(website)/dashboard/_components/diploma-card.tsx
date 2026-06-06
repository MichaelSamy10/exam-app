'use client';

import { getSubjects } from '@/lib/services/auth.service';
import { useInfiniteQuery } from '@tanstack/react-query';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useTranslations } from 'next-intl';
import DiplomaSkeleton from '../_skeletons/diploma-skeleton';

export default function DiplomaCard() {
  // Translations
  const t = useTranslations('dashboard.diplomas-page');

  // Query
  const {
    isLoading,
    data: payload,
    error,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['Subjects'],
    queryFn: ({ pageParam }) => getSubjects({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: lastPage =>
      lastPage.metadata.currentPage <
      lastPage.metadata.numberOfPages
        ? lastPage.metadata.currentPage + 1
        : undefined,
  });

  // Error handling
  if (isError) {
    return <div>{error.message}</div>;
  }

  const subjects =
    payload?.pages.flatMap(page => page.subjects) ?? [];

  return (
    <div>
      {isLoading ? (
        <DiplomaSkeleton />
      ) : (
        <InfiniteScroll
          dataLength={subjects.length}
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          className="overflow-x-hidden"
          loader={
            <div className="my-6 flex h-16 flex-col items-center justify-center">
              <p className="text-center text-secondary">
                {t('scroll-btn')}
              </p>
              <ChevronDown
                width={18}
                height={18}
                className="mt-1 text-gray-400"
              />
            </div>
          }
          endMessage={
            <p className="my-6 text-center text-secondary">
              {t('end')}
            </p>
          }
        >
          <div className="grid grid-cols-2 gap-x-4 gap-y-5 xl:grid-cols-3">
            {subjects.map(subject => (
              <Link
                key={subject._id}
                href={`/dashboard/${subject._id}`}
                className="relative h-64 xl:h-[448px]"
              >
                <Image
                  src={subject.icon}
                  alt={subject.name}
                  fill
                  sizes="336px"
                  priority
                  className="object-cover"
                />
                <div className="absolute bottom-2 left-1/2 flex h-16 w-11/12 -translate-x-1/2 transform items-center justify-center bg-[#155DFC]/50 text-center text-white">
                  {subject.name}
                </div>
              </Link>
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
}
