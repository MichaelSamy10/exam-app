"use client";

import { Spinner } from "@/components/ui/spinner";
import { getSubjects } from "@/lib/services/auth.service";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function DiplomaCard() {
  // Query
  const {
    isLoading,
    data: payload,
    error,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["Subjects"],
    queryFn: ({ pageParam }) => getSubjects({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.metadata.currentPage < lastPage.metadata.numberOfPages
        ? lastPage.metadata.currentPage + 1
        : undefined,
  });

  // Error handling
  if (isError) {
    return <div>{error.message}</div>;
  }

  const subjects = payload?.pages.flatMap((page) => page.subjects) ?? [];

  return (
    <div>
      {isLoading ? (
        <Spinner className="size-24 m-auto text-primary min-h-screen" />
      ) : (
        <InfiniteScroll
          dataLength={subjects.length}
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          loader={
            <div className="flex flex-col justify-center items-center my-6 h-16">
              <p className="text-center text-secondary">Scroll to view more</p>
              <ChevronDown
                width={18}
                height={18}
                className="text-gray-400 mt-1"
              />
            </div>
          }
          endMessage={
            <p className="text-center text-secondary my-6">End of List</p>
          }
        >
          <div className="grid xl:grid-cols-3 grid-cols-2 gap-2">
            {subjects.map((subject) => (
              <Link
                key={subject._id}
                href={`/dashboard/exams`}
                className="relative xl:w-[336px] h-[448px]"
              >
                <Image
                  src={subject.icon}
                  alt={subject.name}
                  fill
                  sizes="336px"
                  priority
                  className="object-cover"
                />
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-11/12 h-16 flex items-center justify-center text-white bg-[#155DFC]/50">
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
