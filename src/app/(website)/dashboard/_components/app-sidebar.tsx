import Image from "next/image";
import { Sidebar, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import SidebarDetails from "./sidebar-details";
import Dropdown from "./dropdown";

export default async function AppSidebar() {
  const session = await getServerSession(authOptions);

  return (
    <Sidebar collapsible="icon" side="left">
      <SidebarHeader className="mt-10 ms-10">
        <Image
          src="/assets/images/Logo.png"
          alt="logo"
          priority
          width={192}
          height={77}
        />
      </SidebarHeader>
      <SidebarDetails />
      <SidebarFooter>
        <div className="flex flex-row gap-2 md:ms-10 md:mb-10">
          <div>
            <Image
              src="/assets/images/Avatar.svg"
              alt="logo"
              width={54}
              height={54}
            />
          </div>
          <div className="flex flex-row md:mt-2 md:me-1">
            <div>
              <h3 className="text-primary font-medium">
                {session?.user?.firstName}
              </h3>
              <p className="text-gray-500 text-sm">{session?.user?.email}</p>
            </div>
            <Dropdown />
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
