import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@radix-ui/react-dropdown-menu';
import { MoreVerticalIcon, UserRound } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import React from 'react';
import Logout from './logout';
import { useTranslations } from 'next-intl';

export default function Dropdown() {
  // Translations
  const t = useTranslations('dashboard.dropdown');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <MoreVerticalIcon
          width={18}
          height={18}
          className="cursor-pointer text-sm text-gray-500 hover:text-gray-700"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="h-24 w-[263px] bg-white"
        side="top"
      >
        <DropdownMenuItem>
          <Link
            href={'/dashboard/account/profile'}
            className="flex h-12 items-center gap-2 border-b border-gray-100 p-4 text-sm hover:bg-muted"
          >
            <UserRound
              width={18}
              height={18}
              className="text-gray-400"
            />
            {t('account')}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Logout
            width="18px"
            height="18px"
            className="text-sm hover:bg-muted"
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
