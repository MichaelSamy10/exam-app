"use client";

import { Spinner } from "@/components/ui/spinner";
import { getExams } from "@/lib/services/auth.service";
import { useQuery } from "@tanstack/react-query";
import { Timer } from "lucide-react";
import Link from "next/link";

export default function ExamsCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["Exam"],
    queryFn: () => getExams(),
  });

  return (
    <div className="bg-white p-6 min-h-screen">
      {isLoading ? (
        <Spinner className="size-24 m-auto text-primary min-h-screen" />
      ) : (
        <div>
          {data?.exams.map((exam) => (
            <Link
              href={`/dashboard/questions/?examId=${exam._id}&examName=${exam.title}`}
              key={exam._id}
              className="flex flex-row justify-between items-center bg-blue-50 flex-1 mb-4 p-4"
            >
              <div>
                <h3 className="text-primary font-semibold text-xl">
                  {exam.title}
                </h3>
                <p className="text-gray-500">
                  {exam.numberOfQuestions} Questions
                </p>
              </div>
              <div className="flex flex-row gap-2">
                <span>
                  <Timer width={24} height={24} className="text-gray-400" />
                </span>
                Duration:
                {exam.duration} minutes
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
