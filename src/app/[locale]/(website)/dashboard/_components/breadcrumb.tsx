'use client';

import LanguageSwitcher from '@/components/shared/language-switcher';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';

type BreadcrumbItem = {
  label: string;
  href: string;
};

type breadcrumbProps = {
  items?: BreadcrumbItem[];
};

export default function BreadCrumb({
  items = [],
}: breadcrumbProps) {
  // Translations
  const t = useTranslations('dashboard.breadcrumb');

  return (
    <div className="flex items-center justify-between">
      <div className="h-12 p-4 text-sm text-gray-400">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">{t('home')}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            {/* separator */}
            {items.length > 0 && (
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
            )}

            {items.map((item, index) => {
              const isLast = index === items.length - 1;

              return (
                <React.Fragment key={index}>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link
                        href={item.href}
                        className={
                          isLast
                            ? 'text-blue-600 hover:text-blue-500'
                            : ''
                        }
                      >
                        {item.label}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {index !== items.length - 1 && (
                    <BreadcrumbSeparator>
                      /
                    </BreadcrumbSeparator>
                  )}
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <LanguageSwitcher />
    </div>
  );
}
