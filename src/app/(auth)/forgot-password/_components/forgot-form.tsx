"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { MoveLeft, MoveRight } from "lucide-react";
import { useEffect, useState } from "react";
import PasswordField from "./password-field";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  forgotPassword,
  resetPassword,
  verifyResetCode,
} from "@/lib/actions/auth.action";
import { OtpFields, ResetFields } from "@/lib/types/auth";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, resetSchema } from "@/lib/schemas/auth.schema";
import FormError from "@/components/shared/form-error";
import { getOtpCookie, setOtpCookie } from "../utils/otp-cookies";

type Step = "forgot" | "otp" | "changePass";

export default function ForgotForm() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("forgot");

  const [timeLeft, setTimeLeft] = useState(60);
  const [receiveCode, setReceiveCode] = useState(true);

  const forgotForm = useForm<{ email: string }>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotPasswordSchema),
  });

  const otpForm = useForm<OtpFields>({
    defaultValues: {
      resetCode: "",
    },
  });

  const resetForm = useForm<ResetFields>({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    resolver: zodResolver(resetSchema),
  });

  const handleContinue: SubmitHandler<{ email: string }> = async (values) => {
    const storedTime = getOtpCookie(values.email);
    const now = Math.floor(Date.now() / 1000);

    if (storedTime) {
      const diff = now - Number(storedTime);
      if (diff < 60) {
        setStep("otp");
        setReceiveCode(true);
        return;
      }
    } else {
      // store time in cookies
      setOtpCookie(values.email);
      setStep("otp");
      setReceiveCode(true);
    }

    const response = await forgotPassword(values);

    if (!response.ok) {
      forgotForm.setError("root", { message: response.error });
      return;
    }
  };

  const resendCode = async () => {
    setOtpCookie(forgotForm.getValues("email"));

    setReceiveCode(true);
    setTimeLeft(60);

    toast({
      title: "A new OTP code has been sent",
    });
    const response = await forgotPassword({
      email: forgotForm.getValues("email"),
    });

    if (!response.ok) {
      forgotForm.setError("root", { message: response.error });
      return;
    }
  };

  const handleOTP: SubmitHandler<OtpFields> = async (values) => {
    const response = await verifyResetCode(values);
    if (!response.ok) {
      otpForm.setError("root", { message: response.error });
      return;
    }

    resetForm.setValue("email", forgotForm.getValues().email);

    setStep("changePass");
  };

  const handleReset: SubmitHandler<ResetFields> = async (values) => {
    const payload = {
      email: forgotForm.getValues("email"),
      newPassword: values.newPassword,
    };

    const response = await resetPassword(payload);

    if (!response.ok) {
      resetForm.setError("root", { message: response.error });
      return;
    }

    toast({
      title: "Password Reset Successfully",
    });
    router.push("/login");
  };

  useEffect(() => {
    if (step !== "otp") return;

    const storedTime = getOtpCookie(forgotForm.getValues("email"));
    const now = Math.floor(Date.now());

    if (storedTime) {
      const diff = Math.floor((now - Number(storedTime)) / 1000);
      if (diff >= 60) {
        // Time expired
        setTimeLeft(0);
        setReceiveCode(false);
        console.log("I AM HERE");
      } else {
        // Time remaining
        setTimeLeft(60 - diff);
        setReceiveCode(true);
      }
    }
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
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
      {step === "forgot" && (
        <div>
          <h2 className="font-secondary font-bold text-3xl mb-2">
            Forgot Password
          </h2>
          <p className="mb-10 text-gray-500">
            Don’t worry, we will help you recover your account.
          </p>
          <Form {...forgotForm}>
            <form
              onSubmit={forgotForm.handleSubmit(handleContinue)}
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
                        hasError={!!forgotForm.formState.errors.email}
                        autoComplete="email"
                        autoFocus
                      />
                    </FormControl>

                    {/* Feedback */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {forgotForm.formState.errors.root && (
                <FormError form={forgotForm} />
              )}

              <Button className="w-full mb-9" type="submit">
                Continue <MoveRight width={18} height={18} />
              </Button>
            </form>
          </Form>
        </div>
      )}
      {step === "otp" && (
        <div>
          <MoveLeft
            onClick={() => {
              setStep("forgot");
              otpForm.reset();
            }}
            className="mb-10 border-2 border-gray-200 w-10 h-10 p-2 cursor-pointer"
          />
          <h2 className="font-secondary font-bold text-3xl mb-2">Verify OTP</h2>
          <p className="mb-10 text-gray-500">
            Please enter the 6-digits code we have sent to:{" "}
            <span className="text-gray-800">
              {forgotForm.getValues("email")}
            </span>
            .{" "}
            <span
              className="text-blue-600 underline cursor-pointer"
              onClick={() => {
                setStep("forgot");
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
                  required: "OTP is required",
                  minLength: { value: 6, message: "OTP must be 6 digits" },
                }}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <div className="flex justify-center mb-5">
                      <InputOTP
                        maxLength={6}
                        value={field.value}
                        onChange={field.onChange}
                      >
                        <InputOTPGroup>
                          {Array.from({ length: 6 }, (_, index) => (
                            <InputOTPSlot
                              key={index}
                              index={index}
                              className={
                                fieldState.error &&
                                "border-red-600 focus:border-red-600"
                              }
                            />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                    </div>

                    {fieldState.error && (
                      <FormMessage className="text-center">
                        {fieldState.error.message}
                      </FormMessage>
                    )}
                    {otpForm.formState.errors.root && (
                      <FormError form={otpForm} />
                    )}
                  </FormItem>
                )}
              />
              {receiveCode ? (
                <div className="text-center text-gray-500 mt-6">
                  You can request another code in: {timeLeft}
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  Didn’t receive the code?{" "}
                  <span
                    className="text-blue-600 cursor-pointer"
                    onClick={() => {
                      resendCode();
                      otpForm.reset();
                    }}
                  >
                    Resend
                  </span>
                </div>
              )}
              <Button className="w-full mt-10 mb-9" type="submit">
                Verify Code
              </Button>
            </form>
          </Form>
        </div>
      )}
      {step === "changePass" && (
        <div>
          <h2 className="font-secondary font-bold text-3xl mb-2">
            Create a New Password
          </h2>
          <p className="mb-10 text-gray-500">
            Create a new strong password for your account.{" "}
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

              {/* Confirm New Password */}
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
              <FormField
                control={resetForm.control}
                name="confirmPassword"
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
              {resetForm.formState.errors.root && (
                <FormError form={resetForm} />
              )}

              <Button className="w-full mb-9" type="submit">
                Reset Password
              </Button>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
}
