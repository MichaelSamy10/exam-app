"use client";

import { Spinner } from "@/components/ui/spinner";
import { getSubjects } from "@/lib/services/auth.service";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function DiplomaCard() {
  const {
    isLoading,
    data: payload,
    error,
    isError,
  } = useQuery({
    queryKey: ["Subjects"],
    queryFn: getSubjects,
  });

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      {isLoading ? (
        <Spinner className="size-24 m-auto text-primary min-h-screen" />
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {payload?.subjects.map((subject) => (
            <Link
              key={subject._id}
              href={`/dashboard/exams`}
              className="relative w-[336px] h-[448px]"
            >
              <Image
                src={subject.icon}
                alt={subject.name}
                fill
                sizes="336px"
                priority
                className="object-cover"
              />
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-80 h-16 flex items-center justify-center text-white bg-[#155DFC]/50">
                {subject.name}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
