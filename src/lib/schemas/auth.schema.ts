import z from 'zod';
import { Translations } from '../types/global';

export const loginSchema = z.object({
  email: z.email({
    error: issue =>
      issue.input === ''
        ? 'Email is required'
        : 'Invalid email',
  }),
  password: z.string().nonempty('Password is required'),
});

export const registerSchema = (t: Translations) => {
  return z
    .object({
      firstName: z
        .string()
        .nonempty(t('firstname-required'))
        .min(3, t('firstname-min')),
      lastName: z
        .string()
        .nonempty(t('lastname-required'))
        .min(3, t('lastname-min')),
      username: z
        .string()
        .nonempty(t('username-required'))
        .min(3, t('username-min')),

      email: z.email({
        error: issue =>
          issue.input === ''
            ? t('email-required')
            : t('email-invalid'),
      }),

      password: z
        .string()
        .nonempty(t('password-required'))
        .min(8, t('password-min'))
        .regex(/[a-z]/, t('password-lowercase'))
        .regex(/[A-Z]/, t('password-uppercase'))
        .regex(/\d/, t('password-number'))
        .regex(/[^\w\s]/, t('password-special')),

      rePassword: z
        .string()
        .nonempty(t('password-required')),
      phone: z.string().nonempty(t('phone-required')),
    })
    .refine(data => data.password === data.rePassword, {
      message: t('passwords-not-match'),
      path: ['rePassword'],
    });
};

export const forgotPasswordSchema = z.object({
  email: z.email({
    error: issue =>
      issue.input === ''
        ? 'Email is required'
        : 'Invalid email',
  }),
});

export const resetSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /[a-z]/,
        'Password must include at least one lowercase letter',
      )
      .regex(
        /[A-Z]/,
        'Password must include at least one uppercase letter',
      )
      .regex(
        /\d/,
        'Password must include at least one number',
      )
      .regex(
        /[^\w\s]/,
        'Password must include at least one special character',
      ),
    confirmPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /[a-z]/,
        'Password must include at least one lowercase letter',
      )
      .regex(
        /[A-Z]/,
        'Password must include at least one uppercase letter',
      )
      .regex(
        /\d/,
        'Password must include at least one number',
      )
      .regex(
        /[^\w\s]/,
        'Password must include at least one special character',
      ),
  })
  .refine(
    data => data.newPassword === data.confirmPassword,
    {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    },
  );

export const profileSchema = (t: Translations) =>
  z.object({
    firstName: z
      .string()
      .nonempty(t('validation.firstname-required'))
      .min(3, t('validation.firstname-min')),
    lastName: z
      .string()
      .nonempty(t('validation.lastname-required'))
      .min(3, t('validation.lastname-min')),
    username: z
      .string()
      .nonempty(t('validation.username-required'))
      .min(3, t('validation.username-min')),
    email: z.email({
      error: issue =>
        issue.input === ''
          ? t('validation.email-required')
          : t('validation.email-invalid'),
    }),
    phone: z
      .string()
      .nonempty(t('validation.phone-required'))
      .transform(val =>
        val.startsWith('+20') ? val.slice(3) : val,
      )
      .refine(
        val => /^(\+20)?01[0125][0-9]{8}$/.test(val),
        {
          message: t('validation.invalid-phone'),
        },
      ),
  });

export const changePasswordSchema = (t: Translations) =>
  z
    .object({
      currentPassword: z
        .string()
        .nonempty(t('validation.current-pass-required')),
      newPassword: z
        .string()
        .nonempty(t('validation.new-pass-required'))
        .min(8, t('validation.new-pass-min'))
        .regex(/[a-z]/, t('validation.new-pass-lowercase'))
        .regex(/[A-Z]/, t('validation.new-pass-uppercase'))
        .regex(/\d/, t('validation.new-pass-number'))
        .regex(/[^\w\s]/, t('validation.new-pass-special')),
      confirmNewPassword: z
        .string()
        .nonempty(t('validation.confirm-pass-required'))
        .min(8, t('validation.confirm-pass-min'))
        .regex(
          /[a-z]/,
          t('validation.confirm-pass-lowercase'),
        )
        .regex(
          /[A-Z]/,
          t('validation.confirm-pass-uppercase'),
        )
        .regex(/\d/, t('validation.confirm-pass-number'))
        .regex(
          /[^\w\s]/,
          t('validation.confirm-pass-special'),
        ),
    })
    .refine(
      data => data.newPassword === data.confirmNewPassword,
      {
        message: t('validation.passwords-not-match'),
        path: ['confirmNewPassword'],
      },
    );
