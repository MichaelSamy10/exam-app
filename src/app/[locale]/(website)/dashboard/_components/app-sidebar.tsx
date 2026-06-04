import Image from 'next/image';
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { authOptions } from '@/auth';
import { getServerSession } from 'next-auth';
import SidebarDetails from './sidebar-details';
import Dropdown from './dropdown';

import { getLocale } from 'next-intl/server';

export default async function AppSidebar() {
  const session = await getServerSession(authOptions);
  const locale = await getLocale();

  return (
    <Sidebar
      collapsible="icon"
      side={locale === 'ar' ? 'right' : 'left'}
    >
      <SidebarHeader className="ms-10 mt-10">
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
        <div className="flex flex-row gap-2 md:mb-10 md:ms-10">
          <div>
            <Image
              src="/assets/images/Avatar.svg"
              alt="logo"
              width={54}
              height={54}
            />
          </div>
          <div className="flex flex-row md:me-1 md:mt-2">
            <div>
              <h3 className="font-medium text-primary">
                {session?.user?.firstName}
              </h3>
              <p className="text-sm text-gray-500">
                {session?.user?.email}
              </p>
            </div>
            <Dropdown />
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
