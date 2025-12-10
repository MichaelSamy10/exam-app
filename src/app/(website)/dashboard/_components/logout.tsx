"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import React from "react";

interface LogoutProps {
  className?: string;
  width: string;
  height: string;
}
export default function Logout({ className, width, height }: LogoutProps) {
  return (
    <div
      onClick={() => signOut()}
      className={`flex md:flex-row flex-col items-center gap-2 text-red-600 h-12 md:p-4 pt-1 cursor-pointer ${className}`}
    >
      <LogOut width={width} height={height} className="rotate-180" />
      Logout
    </div>
  );
}
