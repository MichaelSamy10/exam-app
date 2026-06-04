'use client';

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar';
import { GraduationCap, UserRound } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function SidebarDetails() {
  // Translations
  const t = useTranslations('dashboard');

  // Hooks
  const { activeItem, setActiveItem } = useSidebar();

  // Variables
  const items = [
    {
      icon: <GraduationCap />,
      title: t('diplomas'),
      url: '/dashboard',
    },
    {
      icon: <UserRound />,
      title: t('account-settings'),
      url: '/dashboard/account/profile',
    },
  ];

  return (
    <SidebarContent className="ms-10 mt-14 w-56 md:w-72">
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map(item => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  variant={'default'}
                  className={`h-14 p-4 ${
                    activeItem === item.title
                      ? 'border border-blue-500 bg-blue-100 text-primary hover:text-primary'
                      : 'hover:bg-muted'
                  }`}
                  onClick={() => setActiveItem(item.title)}
                >
                  <Link
                    href={item.url}
                    className="flex items-center"
                  >
                    <span className="h-6 w-6 font-normal">
                      {item.icon}
                    </span>
                    {item.title}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}
