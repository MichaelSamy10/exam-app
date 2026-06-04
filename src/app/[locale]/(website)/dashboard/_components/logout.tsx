'use client';

import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import React from 'react';
import { useTranslations } from 'next-intl';

interface LogoutProps {
  className?: string;
  width: string;
  height: string;
}
export default function Logout({
  className,
  width,
  height,
}: LogoutProps) {
  // Translations
  const t = useTranslations('dashboard.dropdown');

  return (
    <div
      onClick={() => signOut()}
      className={`flex h-12 cursor-pointer flex-col items-center gap-2 pt-1 text-red-600 md:flex-row md:p-4 ${className}`}
    >
      <LogOut
        width={width}
        height={height}
        className="rotate-180"
      />
      {t('logout')}
    </div>
  );
}
