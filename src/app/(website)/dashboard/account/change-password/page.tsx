"use client";

import PasswordField from "@/app/(auth)/forgot-password/_components/password-field";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { changePassword } from "@/lib/actions/change-password.action";
import { changePasswordSchema } from "@/lib/schemas/auth.schema";

import { changePasswordFields } from "@/lib/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleX } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function ChangePassword() {
  const form = useForm<changePasswordFields>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    resolver: zodResolver(changePasswordSchema),
  });

  const router = useRouter();
  const handleReset: SubmitHandler<changePasswordFields> = async (values) => {
    const payload = {
      oldPassword: values.currentPassword,
      password: values.newPassword,
      rePassword: values.confirmNewPassword,
    };

    const response = await changePassword(payload);

    if (!response.ok) {
      form.setError("root", {
        message: response.error || "Something went wrong",
      });

      return;
    }

    await signOut({ redirect: false });
    setTimeout(() => {
      router.push("/login?toast=password-changed");
    }, 500);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleReset)}
        className="flex flex-col gap-4 bg-background p-6"
      >
        {/* Hidden email field */}
        <input
          type="email"
          name="email"
          autoComplete="email"
          className="hidden"
          aria-hidden="true"
        />

        {/* Current Password */}
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <PasswordField field={field} fieldState={fieldState} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* New Password */}
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <PasswordField field={field} fieldState={fieldState} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm Password */}
        <FormField
          control={form.control}
          name="confirmNewPassword"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <PasswordField field={field} fieldState={fieldState} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.formState.errors.root && (
          <div className="border border-red-600 bg-red-50 p-2">
            <div className="relative mx-auto">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 rounded-full p-2">
                <CircleX
                  className="text-red-500 fill-white"
                  width={18}
                  height={18}
                />
              </div>
              <p className="text-red-600 text-center text-sm">
                {form.formState.errors.root.message}
              </p>
            </div>
          </div>
        )}

        <Button className="w-full mt-4 mb-9" type="submit">
          Update Password
        </Button>
      </form>
    </Form>
  );
}
