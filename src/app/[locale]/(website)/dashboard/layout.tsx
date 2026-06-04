import React from 'react';
import AppSidebar from './_components/app-sidebar';
import {
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

export default function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="relative">
        <SidebarTrigger className="absolute start-4 top-4 z-50 md:hidden" />
      </div>
      <div className="flex-1 pt-9 md:p-0">{children}</div>
    </SidebarProvider>
  );
}
