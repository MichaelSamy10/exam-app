'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PhoneInput } from '@/components/ui/phone-input';
import PasswordField from '../../forgot-password/_components/password-field';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RegisterFields } from '@/lib/types/auth';
import { registerSchema } from '@/lib/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import FormError from '@/components/shared/form-error';
import { useTranslations } from 'next-intl';
import useRegister from '../_hooks/use-register';
import { Spinner } from '@/components/ui/spinner';

export default function RegisterForm() {
  // Translation
  const t = useTranslations('auth-pages.register-page');

  // Mutation
  const { isPending, error, register } = useRegister();

  // Navigation

  // Form
  const form = useForm<RegisterFields>({
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      phone: '',
      password: '',
      rePassword: '',
    },
    resolver: zodResolver(registerSchema(t)),
  });

  // Functions
  const handleRegister: SubmitHandler<
    RegisterFields
  > = async values => {
    // Edit phone number format
    const editPhone =
      form.getValues('phone').replace(/^\+?20/, '') || '';

    const payload = {
      ...values,
      phone: editPhone,
    };

    register(payload);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleRegister)}
        className="grid grid-cols-2 gap-4"
      >
        {/* First Name */}
        <FormField
          control={form.control}
          name="firstName"
          render={({ field, fieldState }) => (
            <FormItem className="col-span-1">
              {/* Label */}
              <FormLabel>{t('firstname-label')}</FormLabel>
              {/* Field */}
              <FormControl>
                <Input
                  {...field}
                  placeholder={t('firstname-placeholder')}
                  hasError={Boolean(fieldState.error)}
                  autoFocus
                />
              </FormControl>

              {/* Feedback */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Last Name */}
        <FormField
          control={form.control}
          name="lastName"
          render={({ field, fieldState }) => (
            <FormItem className="col-span-1">
              {/* Label */}
              <FormLabel>{t('lastname-label')}</FormLabel>

              {/* Field */}
              <FormControl>
                <Input
                  {...field}
                  placeholder={t('lastname-placeholder')}
                  hasError={Boolean(fieldState.error)}
                />
              </FormControl>

              {/* Feedback */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Username */}
        <FormField
          control={form.control}
          name="username"
          render={({ field, fieldState }) => (
            <FormItem className="col-span-2">
              {/* Label */}
              <FormLabel>{t('username-label')}</FormLabel>

              {/* Field */}
              <FormControl>
                <Input
                  {...field}
                  placeholder="user123"
                  hasError={Boolean(fieldState.error)}
                  autoComplete="off"
                />
              </FormControl>

              {/* Feedback */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem className="col-span-2">
              {/* Label */}
              <FormLabel>{t('email-label')}</FormLabel>

              {/* Field */}
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="user@example.com"
                  hasError={Boolean(fieldState.error)}
                />
              </FormControl>

              {/* Feedback */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field, fieldState }) => (
            <FormItem className="col-span-2">
              {/* Label */}
              <FormLabel>{t('phone-label')}</FormLabel>

              {/* Field */}
              <FormControl>
                <PhoneInput
                  {...field}
                  maxLength={11}
                  placeholder="1012345678"
                  hasError={Boolean(fieldState.error)}
                  autoComplete="off"
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
          render={({ field, fieldState }) => (
            <FormItem className="col-span-2">
              {/* Label */}
              <FormLabel>{t('password-label')}</FormLabel>

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
          name="rePassword"
          render={({ field, fieldState }) => (
            <FormItem className="col-span-2">
              {/* Label */}
              <FormLabel>
                {t('confirm-pass-label')}
              </FormLabel>

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
        {error && <FormError>{error?.message}</FormError>}

        <Button
          className="col-span-2 mb-9 mt-4 w-full"
          type="submit"
          disabled={
            isPending ||
            (!form.formState.isValid &&
              form.formState.isSubmitted)
          }
        >
          {isPending ? <Spinner /> : t('button')}
        </Button>
      </form>
    </Form>
  );
}
