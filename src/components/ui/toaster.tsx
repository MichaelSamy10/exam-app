"use client";

import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { Check } from "lucide-react";
import { ReactNode } from "react";

type ToastVariant = "default" | "destructive";

interface ToastItem {
  id: string;
  title?: ReactNode | null;
  description?: ReactNode | null;
  action?: ReactNode | null;
  variant?: ToastVariant | null;
}
export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        variant,
        ...props
      }: ToastItem) {
        return (
          <Toast
            key={id}
            {...props}
            className={variant === "destructive" ? "bg-red-500" : ""}
          >
            <div className="flex items-center gap-3">
              {variant !== "destructive" && (
                <Check width={18} height={18} className="text-green-500" />
              )}
              {title && (
                <ToastTitle className="font-medium ">{title}</ToastTitle>
              )}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
