"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import React from "react";

type BreadcrumbItem = {
  label: string;
  href: string;
};

type breadcrumbProps = {
  items?: BreadcrumbItem[];
};

export default function BreadCrumb({ items = [] }: breadcrumbProps) {
  return (
    <div className="h-12 p-4 text-gray-400 text-sm">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {/* separator */}
          {items.length > 0 && <BreadcrumbSeparator>/</BreadcrumbSeparator>}

          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      href={item.href}
                      className={
                        isLast ? "text-blue-600 hover:text-blue-500" : ""
                      }
                    >
                      {item.label}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {index !== items.length - 1 && (
                  <BreadcrumbSeparator>/</BreadcrumbSeparator>
                )}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
