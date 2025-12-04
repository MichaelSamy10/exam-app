"use client";

import { Button } from "@/components/ui/button";
import { FolderSearch, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function ResultsButtons() {
  const router = useRouter();

  return (
    <div className="mt-10 flex justify-between gap-2 w-full">
      <Button
        variant={"secondary"}
        onClick={() => window.location.reload()}
        className="flex-1 text-gray-800"
      >
        <RotateCcw width={18} height={18} />
        Restart
      </Button>

      <Button
        variant={"default"}
        onClick={() => router.back()}
        className="px-4 py-2 flex-1"
      >
        <FolderSearch width={18} height={18} />
        Explore
      </Button>
    </div>
  );
}
