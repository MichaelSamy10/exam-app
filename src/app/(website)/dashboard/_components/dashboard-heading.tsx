"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import React, { useEffect } from "react";

type DashboardHeadingProps = {
  title: string;
  icon: React.ReactNode;
  backButton: boolean;
};
export default function DashboardHeading({
  title,
  icon,
  backButton,
}: DashboardHeadingProps) {
  const router = useRouter();
  const pathname = usePathname();

  const { setActiveItem } = useSidebar();

  useEffect(() => {
    if (pathname.includes("account")) {
      setActiveItem("Account Settings");
    } else {
      setActiveItem("Diplomas");
    }
  }, [pathname, setActiveItem]);

  return (
    <div className="h-[77px] flex mb-6 gap-2 font-secondary">
      {backButton && (
        <div
          className=" bg-white flex items-center justify-center border border-blue-600 w-9 cursor-pointer"
          onClick={() => {
            if (pathname.includes("account")) {
              setActiveItem("Diplomas");
              return router.push("/dashboard");
            }

            return router.back();
          }}
        >
          <ChevronLeft className="text-primary" />
        </div>
      )}
      <div className=" flex items-center text-white text-3xl font-semibold bg-blue-600 p-4 flex-1">
        {icon}
        <span className="ms-4">{title}</span>
      </div>
    </div>
  );
}
