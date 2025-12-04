import * as React from "react";

import { cn } from "@/lib/utils/tailwind-merge";

interface InputProps extends React.ComponentProps<"input"> {
  hasError?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, hasError, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-0  focus:ring-offset-0 focus:rounded-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus:ring-blue-600 focus:border-blue-600 transition-colors mt-0.5",
          hasError &&
            "ring-red-600 border-red-600 focus:ring-red-600 focus:border-red-600",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
