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
import PasswordField from "../../register/_components/password-field";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
// import { LoginFields } from "@/lib/types/auth";
import {
  forgotPassword,
  resetPassword,
  verifyResetCode,
} from "@/lib/actions/auth.action";
import { ResetPasswordForm } from "@/lib/types/auth";
import { useRouter } from "next/navigation";

type Step = "forgot" | "otp" | "changePass";

type OTPFormValues = { otp: string };

export default function ForgotForm() {
  const route = useRouter();
  const [step, setStep] = useState<Step>("forgot");
  const forogtForm = useForm<{ email: string }>({
    defaultValues: {
      email: "",
    },
  });
  const otpForm = useForm<OTPFormValues>({
    defaultValues: {
      otp: "",
    },
  });
  const resetForm = useForm<ResetPasswordForm>({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [timeLeft, setTimeLeft] = useState(60);
  const [receiveCode, setReceiveCode] = useState(true);

  // const [email, setEmail] = useState("");
  // const [emailError, setEmailError] = useState(false);

  const handleContinue: SubmitHandler<{ email: string }> = async (values) => {
    try {
      const res = await forgotPassword(values.email);
      console.log("OTP Sent", res);
    } catch (err: any) {
      // setError(err.message);
    }

    // const trimmedEmail = email.trim();

    // if (!trimmedEmail) {
    //   setEmailError(true);
    //   return;
    // }

    setStep("otp");
  };

  const handleOTP: SubmitHandler<{ otp: string }> = async (values) => {
    try {
      const res = await verifyResetCode(values.otp);
      console.log("Verify OTP", res);
    } catch (err: any) {
      // setError(err.message);
    }
    setStep("changePass");
  };

  const handleReset: SubmitHandler<ResetPasswordForm> = async (values) => {
    try {
      const res = await resetPassword(
        forogtForm.getValues("email"),
        values.newPassword
      );
      console.log("Password reset");
    } catch (err: any) {
      // setError(err.message);
    }
    route.push("/login");
  };

  useEffect(() => {
    if (step !== "otp") return;
    setTimeLeft(60);

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setReceiveCode(false);
          return 0;
        }
        // console.log(prev);
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [step]);

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
          <Form {...forogtForm}>
            <form
              onSubmit={forogtForm.handleSubmit(handleContinue)}
              className="space-y-10"
            >
              <FormField
                control={forogtForm.control}
                name="email"
                rules={{
                  required: {
                    value: true,
                    message: "Your email is required",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    {/* Label */}
                    <FormLabel>Email</FormLabel>

                    {/* Field */}
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="user@example.com"
                        hasError={!!forogtForm.formState.errors.email}
                        autoComplete="email"
                      />
                    </FormControl>

                    {/* Feedback */}
                    <FormMessage />
                  </FormItem>
                )}
              />
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
            onClick={() => setStep("forgot")}
            className="mb-10 border-2 border-gray-200 w-10 h-10 p-2 cursor-pointer"
          />
          <h2 className="font-secondary font-bold text-3xl mb-2">Verify OTP</h2>
          <p className="mb-10 text-gray-500">
            Please enter the 6-digits code we have sent to:{" "}
            <span className="text-gray-800">
              {forogtForm.getValues("email")}
            </span>
            .{" "}
            <span
              className="text-blue-600 underline cursor-pointer"
              onClick={() => setStep("forgot")}
            >
              Edit
            </span>
          </p>
          {/* OTP */}
          <Form {...otpForm}>
            <form
              onSubmit={otpForm.handleSubmit(handleOTP)}
              className="space-y-4"
            >
              <FormField
                control={otpForm.control}
                name="otp"
                rules={{
                  required: "OTP is required",
                  minLength: { value: 6, message: "OTP must be 6 digits" },
                }}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <div className="flex justify-center">
                      <InputOTP
                        maxLength={6}
                        value={field.value}
                        onChange={field.onChange}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>

                    {fieldState.error && (
                      <FormMessage>{fieldState.error.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <Button className="w-full mt-10 mb-9" type="submit">
                Verify Code
              </Button>
            </form>
          </Form>

          {receiveCode ? (
            <div className="text-center text-gray-500 mt-6">
              You can request another code in: {timeLeft}
            </div>
          ) : (
            <div className="text-center text-gray-500">
              Didn’t receive the code? Resend
            </div>
          )}

          {/* <Button
          onClick={() => {
            toast({
              title: "Your changes have been saved.",
            });
          }}
        >
          Show Toast
        </Button>  */}
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
              {/* <input type="hidden" {...resetForm.register("newPassword")} /> */}

              {/* Confirm New Password */}
              <FormField
                control={resetForm.control}
                name="newPassword"
                rules={{
                  required: "New password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                }}
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
              <FormField
                control={resetForm.control}
                name="confirmPassword"
                rules={{
                  required: "New password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                }}
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
