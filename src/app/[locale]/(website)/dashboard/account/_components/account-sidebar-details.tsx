'use client';

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { CircleUserRound, Lock } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

export default function SidebarDetails() {
  // Translations
  const t = useTranslations('dashboard.account-sidebar');

  // state
  const [activeItem, setActiveItem] = useState('');

  // hooks
  const pathname = usePathname();

  // Effects
  useEffect(() => {
    if (pathname.includes('profile')) {
      setActiveItem(t('profile'));
    } else {
      setActiveItem(t('change-password'));
    }
  }, [pathname, t]);

  // Variables
  const items = [
    {
      icon: <CircleUserRound />,
      title: t('profile'),
      url: '/dashboard/account/profile',
    },
    {
      icon: <Lock />,
      title: t('change-password'),
      url: '/dashboard/account/change-password',
    },
  ];

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map(item => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  variant={'default'}
                  className={`h-full lg:h-11 lg:p-4 ${
                    activeItem === item.title
                      ? 'bg-blue-50 text-primary hover:text-primary'
                      : 'text-gray-500 hover:bg-muted'
                  }`}
                  onClick={() => setActiveItem(item.title)}
                >
                  {/* Sidebar item */}
                  <Link
                    href={item.url}
                    className="flex flex-col items-center justify-center text-center lg:flex-row lg:justify-start"
                  >
                    <span className="h-6 w-6 font-normal">
                      {item.icon}
                    </span>
                    <span
                      className="whitespace-pre break-words capitalize"
                      style={{
                        overflow: 'auto',
                        textWrap: 'wrap',
                      }}
                    >
                      {item.title}
                    </span>
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
