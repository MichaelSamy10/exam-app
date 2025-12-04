import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { MoreVerticalIcon, UserRound } from "lucide-react";
import Link from "next/link";
import React from "react";
import Logout from "./logout";

export default function Dropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <MoreVerticalIcon
          width={18}
          height={18}
          className="text-gray-500 text-sm cursor-pointer hover:text-gray-700"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white w-[263px] h-24" side="top">
        <DropdownMenuItem asChild>
          <Link
            href={"/dashboard/account/profile"}
            className="flex items-center gap-2 h-12 p-4 border-b border-gray-100 text-sm"
          >
            <UserRound width={18} height={18} className="text-gray-400" />
            Account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Logout width="18px" height="18px" className="text-sm" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
