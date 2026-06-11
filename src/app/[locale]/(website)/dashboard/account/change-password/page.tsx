'use client';

import PasswordField from '@/app/[locale]/(auth)/forgot-password/_components/password-field';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { changePassword } from '@/lib/actions/change-password.action';
import { changePasswordSchema } from '@/lib/schemas/auth.schema';

import { changePasswordFields } from '@/lib/types/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { CircleX } from 'lucide-react';

export default function ChangePassword() {
  // Translations
  const t = useTranslations('dashboard.change-password');

  // Hooks
  const { toast } = useToast();
  const { update } = useSession();

  // Form
  const form = useForm<changePasswordFields>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    resolver: zodResolver(changePasswordSchema(t)),
  });

  // Functions
  const handleReset: SubmitHandler<
    changePasswordFields
  > = async values => {
    const payload = {
      oldPassword: values.currentPassword,
      password: values.newPassword,
      rePassword: values.confirmNewPassword,
    };

    // Change password
    const response = await changePassword(payload);

    // Handle errors
    if (!response.ok) {
      form.setError('root', {
        message: response.error || 'Something went wrong',
      });

      return;
    }

    toast({
      title: 'Your Password has been updated.',
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
        className="flex min-h-screen flex-col gap-4 bg-background p-6"
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
              <FormLabel>{t('current-password')}</FormLabel>

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
        <Separator className="mb-2 mt-2" />
        {/* New Password */}
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field, fieldState }) => (
            <FormItem>
              {/* Label */}
              <FormLabel>{t('new-password')}</FormLabel>

              {/* Field */}
              <FormControl>
                <PasswordField
                  field={field}
                  fieldState={fieldState}
                />
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
              <FormLabel>{t('confirm-password')}</FormLabel>

              {/* Field */}
              <FormControl>
                <PasswordField
                  field={field}
                  fieldState={fieldState}
                />
              </FormControl>

              {/* Feedback */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Form Error */}
        {form.formState.errors.root && (
          <div className="border border-red-600 bg-red-50 p-2">
            <div className="relative mx-auto">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 rounded-full p-2">
                <CircleX
                  className="fill-white text-red-500"
                  width={18}
                  height={18}
                />
              </div>
              <p className="text-center text-sm text-red-600">
                {form.formState.errors.root?.message}
              </p>
            </div>
          </div>
        )}

        <Button className="mb-9 mt-4 w-full" type="submit">
          {t('update-password-btn')}
        </Button>
      </form>
    </Form>
  );
}
