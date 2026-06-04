import React, { ReactNode } from 'react';

import {
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import { UserRound } from 'lucide-react';
import DashboardHeading from '../_components/dashboard-heading';
import SidebarDetails from './_components/account-sidebar-details';
import Logout from '../_components/logout';
import BreadCrumb from '../_components/breadcrumb';
import { getTranslations } from 'next-intl/server';

export default async function layout({
  children,
}: {
  children: ReactNode;
}) {
  const t = await getTranslations('dashboard');

  return (
    <>
      {/* Navigation */}

      <BreadCrumb
        items={[
          {
            label: t('breadcrumb.account'),
            href: '/dashboard/account/profile',
          },
        ]}
      />

      {/* Header */}
      <div className="bg-gray-50 p-6">
        <DashboardHeading
          backButton={true}
          title={t('account-settings')}
          icon={<UserRound width={45} height={45} />}
        />

        {/* Component Sidebar */}
        <div className="mt-6 flex gap-6">
          <div className="w-1/4 flex-shrink-0 xl:w-[282px]">
            <SidebarInset className="min-h-screen lg:p-4">
              <SidebarDetails />
              <SidebarFooter>
                <Logout
                  className="bg-red-50"
                  width="24px"
                  height="24px"
                />
              </SidebarFooter>
            </SidebarInset>
          </div>

          <div className="flex-1">{children}</div>
        </div>
      </div>
    </>
  );
}
