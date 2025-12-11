"use client";

import PasswordField from "@/app/(auth)/forgot-password/_components/password-field";
import FormError from "@/components/shared/form-error";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { changePassword } from "@/lib/actions/change-password.action";
import { changePasswordSchema } from "@/lib/schemas/auth.schema";

import { changePasswordFields } from "@/lib/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function ChangePassword() {
  // Hooks
  const { toast } = useToast();
  const { update } = useSession();

  // Form
  const form = useForm<changePasswordFields>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    resolver: zodResolver(changePasswordSchema),
  });

  // Functions
  const handleReset: SubmitHandler<changePasswordFields> = async (values) => {
    const payload = {
      oldPassword: values.currentPassword,
      password: values.newPassword,
      rePassword: values.confirmNewPassword,
    };

    // Change password
    const response = await changePassword(payload);

    // Handle errors
    if (!response.ok) {
      form.setError("root", {
        message: response.error || "Something went wrong",
      });

      return;
    }

    toast({
      title: "Your Password has been updated.",
    });

    // Refresh session and reload after 2 seconds
    setTimeout(async () => {
      await update();
      window.location.reload();
    }, 2000);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleReset)}
        className="flex flex-col gap-4 bg-background p-6 min-h-screen"
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
              {/* Label */}
              <FormLabel>Current Password</FormLabel>

              {/* Field */}
              <FormControl>
                <PasswordField
                  field={field}
                  fieldState={fieldState}
                  autoFocus
                />
              </FormControl>

              {/* Feedback */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator className="mt-2 mb-2" />
        {/* New Password */}
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field, fieldState }) => (
            <FormItem>
              {/* Label */}
              <FormLabel>New Password</FormLabel>

              {/* Field */}
              <FormControl>
                <PasswordField field={field} fieldState={fieldState} />
              </FormControl>

              {/* Feedback */}
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
              {/* Label */}
              <FormLabel>Confirm New Password</FormLabel>

              {/* Field */}
              <FormControl>
                <PasswordField field={field} fieldState={fieldState} />
              </FormControl>

              {/* Feedback */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Form Error */}
        {form.formState.errors.root && <FormError form={form} />}

        <Button className="w-full mt-4 mb-9" type="submit">
          Update Password
        </Button>
      </form>
    </Form>
  );
}
