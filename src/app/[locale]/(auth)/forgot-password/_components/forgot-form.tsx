'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { CircleX, MoveLeft, MoveRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import PasswordField from './password-field';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '@/components/ui/form';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  forgotPassword,
  resetPassword,
  verifyResetCode,
} from '@/lib/actions/auth.action';
import { OtpFields, ResetFields } from '@/lib/types/auth';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  forgotPasswordSchema,
  resetSchema,
} from '@/lib/schemas/auth.schema';
import FormError from '@/components/shared/form-error';
import {
  getOtpCookie,
  setOtpCookie,
} from '../utils/otp-cookies';

type Step = 'forgot' | 'otp' | 'changePass';

export default function ForgotForm() {
  // Navigation
  const router = useRouter();

  // State
  const [step, setStep] = useState<Step>('forgot');
  const [timeLeft, setTimeLeft] = useState(60);
  const [receiveCode, setReceiveCode] = useState(true);

  // Forms
  const forgotForm = useForm<{ email: string }>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(forgotPasswordSchema),
  });

  const otpForm = useForm<OtpFields>({
    defaultValues: {
      resetCode: '',
    },
  });

  const resetForm = useForm<ResetFields>({
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
    resolver: zodResolver(resetSchema),
  });

  // Functions
  const handleContinue: SubmitHandler<{
    email: string;
  }> = async values => {
    // check if otp was sent in the last 60 seconds
    const storedTime = getOtpCookie(values.email);
    const now = Math.floor(Date.now() / 1000);

    // if stored time exists and is less than 60 seconds ago, skip sending otp
    if (storedTime) {
      const diff = now - Number(storedTime);
      if (diff < 60) {
        setStep('otp');
        setReceiveCode(true);
        return;
      }
    } else {
      // store time in cookies
      setOtpCookie(values.email);
      setStep('otp');
      setReceiveCode(true);
    }

    // Send OTP
    const response = await forgotPassword(values);

    // Handle errors
    if (!response.ok) {
      forgotForm.setError('root', {
        message: response.error,
      });
      return;
    }
  };

  const resendCode = async () => {
    // Re-assign OTP cookie
    setOtpCookie(forgotForm.getValues('email'));
    setReceiveCode(true);
    setTimeLeft(60);

    toast({
      title: 'A new OTP code has been sent',
    });

    // Resend OTP
    const response = await forgotPassword({
      email: forgotForm.getValues('email'),
    });

    // Handle errors
    if (!response.ok) {
      forgotForm.setError('root', {
        message: response.error,
      });
      return;
    }
  };

  const handleOTP: SubmitHandler<
    OtpFields
  > = async values => {
    // Verify OTP
    const response = await verifyResetCode(values);

    // Handle errors
    if (!response.ok) {
      otpForm.setError('root', { message: response.error });
      return;
    }

    // Proceed to reset password
    resetForm.setValue(
      'email',
      forgotForm.getValues().email,
    );

    setStep('changePass');
  };

  const handleReset: SubmitHandler<
    ResetFields
  > = async values => {
    // Save new password
    const payload = {
      email: forgotForm.getValues('email'),
      newPassword: values.newPassword,
    };

    // Reset Password
    const response = await resetPassword(payload);

    // Handle errors
    if (!response.ok) {
      resetForm.setError('root', {
        message: response.error,
      });
      return;
    }

    // Proceed to login
    toast({
      title: 'Password Reset Successfully',
    });
    router.push('/login');
  };

  // Effects
  useEffect(() => {
    if (step !== 'otp') return;

    // Check if otp was sent in the last 60 seconds
    const storedTime = getOtpCookie(
      forgotForm.getValues('email'),
    );
    const now = Math.floor(Date.now());

    // Calculate time left
    if (storedTime) {
      const diff = Math.floor(
        (now - Number(storedTime)) / 1000,
      );
      if (diff >= 60) {
        // Time expired
        setTimeLeft(0);
        setReceiveCode(false);
      } else {
        // Time remaining
        setTimeLeft(60 - diff);
        setReceiveCode(true);
      }
    }

    // Start timer
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setReceiveCode(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [step, forgotForm, receiveCode]);

  return (
    <div>
      {step === 'forgot' && (
        <div>
          <h2 className="mb-2 font-secondary text-3xl font-bold">
            Forgot Password
          </h2>
          <p className="mb-10 text-gray-500">
            Don’t worry, we will help you recover your
            account.
          </p>
          <Form {...forgotForm}>
            <form
              onSubmit={forgotForm.handleSubmit(
                handleContinue,
              )}
              className="space-y-10"
            >
              <FormField
                control={forgotForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    {/* Email */}
                    <FormLabel>Email</FormLabel>

                    <FormControl>
                      <Input
                        {...field}
                        placeholder="user@example.com"
                        hasError={
                          !!forgotForm.formState.errors
                            .email
                        }
                        autoComplete="email"
                        autoFocus
                      />
                    </FormControl>

                    {/* Feedback */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Form Error */}
              {forgotForm.formState.errors.root && (
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
                      {
                        forgotForm.formState.errors.root
                          ?.message
                      }
                    </p>
                  </div>
                </div>
              )}

              <Button className="mb-9 w-full" type="submit">
                Continue{' '}
                <MoveRight width={18} height={18} />
              </Button>
            </form>
          </Form>
        </div>
      )}
      {step === 'otp' && (
        <div>
          <MoveLeft
            onClick={() => {
              setStep('forgot');
              otpForm.reset();
            }}
            className="mb-10 h-10 w-10 cursor-pointer border-2 border-gray-200 p-2"
          />
          <h2 className="mb-2 font-secondary text-3xl font-bold">
            Verify OTP
          </h2>
          <p className="mb-10 text-gray-500">
            Please enter the 6-digits code we have sent to:{' '}
            <span className="text-gray-800">
              {forgotForm.getValues('email')}
            </span>
            .{' '}
            <span
              className="cursor-pointer text-blue-600 underline"
              onClick={() => {
                setStep('forgot');
                otpForm.reset();
              }}
            >
              Edit
            </span>
          </p>

          {/* OTP */}
          <Form {...otpForm}>
            <form
              onSubmit={otpForm.handleSubmit(handleOTP)}
              className="space-y-6"
            >
              <FormField
                control={otpForm.control}
                name="resetCode"
                rules={{
                  required: 'OTP is required',
                  minLength: {
                    value: 6,
                    message: 'OTP must be 6 digits',
                  },
                }}
                render={({ field, fieldState }) => (
                  <FormItem>
                    {/* OTP */}
                    <div className="mb-5 flex justify-center">
                      <InputOTP
                        maxLength={6}
                        value={field.value}
                        onChange={field.onChange}
                      >
                        <InputOTPGroup>
                          {Array.from(
                            { length: 6 },
                            (_, index) => (
                              <InputOTPSlot
                                key={index}
                                index={index}
                                className={
                                  fieldState.error &&
                                  'border-red-600 focus:border-red-600'
                                }
                              />
                            ),
                          )}
                        </InputOTPGroup>
                      </InputOTP>
                    </div>

                    {/* Form Error */}
                    {fieldState.error && (
                      <FormMessage className="text-center">
                        {fieldState.error.message}
                      </FormMessage>
                    )}
                    {otpForm.formState.errors.root && (
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
                            {
                              otpForm.formState.errors.root
                                ?.message
                            }
                          </p>
                        </div>
                      </div>
                    )}
                  </FormItem>
                )}
              />
              {receiveCode ? (
                <div className="mt-6 text-center text-gray-500">
                  You can request another code in:{' '}
                  {timeLeft}
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  Didn’t receive the code?{' '}
                  <span
                    className="cursor-pointer text-blue-600"
                    onClick={() => {
                      resendCode();
                      otpForm.reset();
                    }}
                  >
                    Resend
                  </span>
                </div>
              )}
              <Button
                className="mb-9 mt-10 w-full"
                type="submit"
              >
                Verify Code
              </Button>
            </form>
          </Form>
        </div>
      )}
      {step === 'changePass' && (
        <div>
          <h2 className="mb-2 font-secondary text-3xl font-bold">
            Create a New Password
          </h2>
          <p className="mb-10 text-gray-500">
            Create a new strong password for your
            account.{' '}
          </p>
          <Form {...resetForm}>
            <form
              onSubmit={resetForm.handleSubmit(handleReset)}
              className="space-y-6"
            >
              {/* Hidden email field */}
              <input
                type="email"
                name="email"
                autoComplete="email"
                className="hidden"
                aria-hidden="true"
              />

              {/* New Password */}
              <FormField
                control={resetForm.control}
                name="newPassword"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <PasswordField
                        field={field}
                        fieldState={fieldState}
                        autoFocus
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm New Password */}
              <FormField
                control={resetForm.control}
                name="confirmPassword"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>
                      Confirm New Password
                    </FormLabel>
                    <FormControl>
                      <PasswordField
                        field={field}
                        fieldState={fieldState}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Form Error */}
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
                    {
                      resetForm.formState.errors.root
                        ?.message
                    }
                  </p>
                </div>
              </div>

              <Button className="mb-9 w-full" type="submit">
                Reset Password
              </Button>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
}
