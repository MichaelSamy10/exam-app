"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LucideEyeOff, LucideEye } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginFields } from "@/lib/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/schemas/auth.schema";
import FormError from "@/components/shared/form-error";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
  const [show, setShow] = useState(false);

  const form = useForm<LoginFields>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const handleLogin: SubmitHandler<LoginFields> = async (values) => {
    try {
      const { email, password } = values;

      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!response) {
        throw new Error("Unexpected error occurred");
      }

      if (response.ok) {
        const callbackUrl =
          new URLSearchParams(location.search).get("callbackUrl") ||
          "/dashboard";

        return (location.href = callbackUrl);
      }

      throw new Error(response.error || "Login failed, please try again");
    } catch (err: unknown) {
      const message = (err as Error).message ?? "Something went wrong";

      form.setError("root", { message });
    }
  };

  const { toast } = useToast();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("toast") === "password-changed") {
      toast({
        title: "Your Password has been changed",
      });
    }
  }, [searchParams, toast]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-7">
        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              {/* Label */}
              <FormLabel>Email</FormLabel>

              {/* Field */}
              <FormControl>
                <Input
                  {...field}
                  placeholder="user@example.com"
                  hasError={!!form.formState.errors.email}
                  autoComplete="email"
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
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    placeholder="********"
                    id="password"
                    type={show ? "text" : "password"}
                    hasError={!!form.formState.errors.password}
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-2 top-3 text-sm text-gray-500"
                    tabIndex={-1}
                  >
                    {show ? (
                      <LucideEyeOff width={18} height={18} />
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

        <div className="text-end ">
          <Link href={"/forgot-password"} className="text-primary text-sm">
            Forgot your password?
          </Link>
        </div>
        {form.formState.errors.root && <FormError form={form} />}

        <Button
          className="w-full"
          type="submit"
          // disabled={!form.formState.isValid && form.formState.isSubmitted}
        >
          Login
        </Button>
      </form>
    </Form>
  );
}
