'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LucideEyeOff, LucideEye } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import React, { useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginFields } from '@/lib/types/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/lib/schemas/auth.schema';
import FormError from '@/components/shared/form-error';
import { useTranslations } from 'next-intl';
import useLogin from '../_hooks/use-login';
import { Spinner } from '@/components/ui/spinner';

export default function LoginForm() {
  // Translation
  const t = useTranslations('auth-pages.login-page');

  // Mutation
  const { isPending, error, login } = useLogin();

  // state
  const [show, setShow] = useState(false);

  // Form
  const form = useForm<LoginFields>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  // Funtion
  const handleLogin: SubmitHandler<
    LoginFields
  > = async values => {
    login(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleLogin)}
        className="space-y-7"
      >
        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              {/* Label */}
              <FormLabel>{t('email')}</FormLabel>

              {/* Field */}
              <FormControl>
                <Input
                  {...field}
                  placeholder="user@example.com"
                  hasError={!!form.formState.errors.email}
                  autoComplete="email"
                  autoFocus
                />
              </FormControl>

              {/* Feedback */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              {/* Password */}
              <FormLabel htmlFor="password">
                {t('password')}
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    placeholder="********"
                    id="password"
                    type={show ? 'text' : 'password'}
                    hasError={
                      !!form.formState.errors.password
                    }
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute end-3 top-3 text-sm text-gray-500"
                    tabIndex={-1}
                  >
                    {show ? (
                      <LucideEyeOff
                        width={18}
                        height={18}
                      />
                    ) : (
                      <LucideEye width={18} height={18} />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Navigate to forgot password */}
        <div className="text-end">
          <Link
            href={'/forgot-password'}
            className="text-sm text-primary"
          >
            {t('forgot-password')}
          </Link>
        </div>

        {/* Form Error */}
        {error?.message && <FormError error={error} />}

        <Button
          className="w-full"
          type="submit"
          disabled={
            isPending ||
            (!form.formState.isValid &&
              form.formState.isSubmitted)
          }
        >
          {isPending ? <Spinner /> : t('login-button')}
        </Button>
      </form>
    </Form>
  );
}
