import React, { ReactNode } from "react";

import { SidebarFooter, SidebarInset } from "@/components/ui/sidebar";
import { UserRound } from "lucide-react";
import DashboardHeading from "../_components/dashboard-heading";
import SidebarDetails from "./_components/account-sidebar-details";
import Logout from "../_components/logout";
import BreadCrumb from "../_components/breadcrumb";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <BreadCrumb
        items={[{ label: "Account", href: "/dashboard/account/profile" }]}
      />

      <div className="bg-gray-50 p-6">
        <DashboardHeading
          backButton={true}
          title="Account Settings"
          icon={<UserRound width={45} height={45} />}
        />

        <div className="flex gap-6 mt-6">
          <div className="xl:w-[282px] w-1/4 flex-shrink-0">
            <SidebarInset className="lg:p-4 min-h-screen">
              <SidebarDetails />
              <SidebarFooter>
                <Logout className="bg-red-50" width="24px" height="24px" />
              </SidebarFooter>
            </SidebarInset>
          </div>

          <div className="flex-1">{children}</div>
        </div>
      </div>
    </>
  );
}
