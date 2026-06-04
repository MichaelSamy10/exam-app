'use client';

import { useSidebar } from '@/components/ui/sidebar';
import { ChevronLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

import React, { useEffect } from 'react';

type DashboardHeadingProps = {
  title: string;
  icon: React.ReactNode;
  backButton: boolean;
};
export default function DashboardHeading({
  title,
  icon,
  backButton,
}: DashboardHeadingProps) {
  // Translations
  const t = useTranslations('dashboard');

  const router = useRouter();
  const pathname = usePathname();

  const { setActiveItem } = useSidebar();

  useEffect(() => {
    if (pathname.includes('account')) {
      setActiveItem(t('account-settings'));
    } else {
      setActiveItem(t('diplomas'));
    }
  }, [pathname, setActiveItem, t]);

  return (
    <div className="mb-6 flex h-20 gap-2 font-secondary rtl:font-tajawal">
      {backButton && (
        <div
          className="flex w-9 cursor-pointer items-center justify-center border border-blue-600 bg-white"
          onClick={() => {
            if (pathname.includes('account')) {
              setActiveItem(t('diplomas'));
              return router.push('/dashboard');
            }

            return router.back();
          }}
        >
          <ChevronLeft className="text-primary rtl:rotate-180" />
        </div>
      )}
      <div className="flex flex-1 items-center bg-blue-600 p-4 text-3xl font-semibold text-white">
        {icon}
        <span className="ms-4">{title}</span>
      </div>
    </div>
  );
}
