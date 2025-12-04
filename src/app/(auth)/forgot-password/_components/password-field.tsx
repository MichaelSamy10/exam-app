import { Input } from "@/components/ui/input";
import { LucideEyeOff, LucideEye } from "lucide-react";
import React, { useState } from "react";
import {
  ControllerRenderProps,
  ControllerFieldState,
  FieldValues,
} from "react-hook-form";

interface PasswordFieldProps<TFieldValues extends FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  field: ControllerRenderProps<TFieldValues>;
  fieldState: ControllerFieldState;
  id?: string;
  autoComplete?: string;
}

export default function PasswordField<TFieldValues extends FieldValues>({
  field,
  fieldState,
  id,
  autoComplete = "new-password",
}: PasswordFieldProps<TFieldValues>) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <Input
        {...field}
        id={id}
        type={show ? "text" : "password"}
        placeholder="********"
        autoComplete={autoComplete}
        hasError={Boolean(fieldState.error)}
      />

      {/* Toggle Button */}
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-3 text-gray-400"
        tabIndex={-1}
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
