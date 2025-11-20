import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResetPasswordForm } from "@/lib/types/auth";
import { LucideEyeOff, LucideEye } from "lucide-react";

import React, { useState } from "react";
import { ControllerRenderProps, ControllerFieldState } from "react-hook-form";

interface passwordFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  field: ControllerRenderProps<ResetPasswordForm>;
  fieldState: ControllerFieldState;
  autoComplete?: string;
}

export default function PasswordField({
  field,
  fieldState,
  autoComplete = "new-password",
}: passwordFieldProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <Input
        {...field}
        type={show ? "text" : "password"}
        placeholder="********"
        autoComplete={autoComplete}
        hasError={!!fieldState.error}
      />

      {/* Toggle Button */}
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-3 text-gray-500"
      >
        {show ? (
          <LucideEyeOff width={18} height={18} />
        ) : (
          <LucideEye width={18} height={18} />
        )}
      </button>
    </div>
  );
}
