import React from "react";
import AppSidebar from "./_components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="relative">
        <SidebarTrigger className="md:hidden absolute top-4 left-4 z-50" />
      </div>
      <div className="min-h-screen flex-1 md:p-0 pt-9">{children}</div>
    </SidebarProvider>
  );
}
