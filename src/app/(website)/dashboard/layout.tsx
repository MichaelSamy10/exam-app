import React from "react";
import AppSidebar from "./_components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="min-h-screen flex-1">{children}</div>
    </SidebarProvider>
  );
}
