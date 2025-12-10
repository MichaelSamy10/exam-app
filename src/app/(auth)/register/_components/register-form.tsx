"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import PasswordField from "../../forgot-password/_components/password-field";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { RegisterFields } from "@/lib/types/auth";
import { registerUser } from "@/lib/actions/auth.action";
import { registerSchema } from "@/lib/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormError from "@/components/shared/form-error";
import { toast } from "@/hooks/use-toast";

export default function RegisterForm() {
  // Navigation
  const router = useRouter();

  // Form
  const form = useForm<RegisterFields>({
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(registerSchema),
  });

  // Functions
  const handleRegister: SubmitHandler<RegisterFields> = async (values) => {
    // Edit phone number format
    const editPhone = form.getValues("phone").replace(/^\+?20/, "") || "";

    const payload = {
      ...values,
      phone: editPhone,
    };

    // Register user
    const response = await registerUser(payload);

    // Handle errors
    if (!response.ok) {
      form.setError("root", {
        message: response.error || "Something went wrong",
      });

      return;
    }

    toast({
      title: "Account created successfully",
    });

    // Redirect to dashboard
    router.push("/dashboard");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleRegister)}
        className="flex flex-col gap-4"
      >
        <div className="flex gap-2">
          {/* First Name */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field, fieldState }) => (
              <FormItem>
                {/* Label */}
                <FormLabel>First Name</FormLabel>
                {/* Field */}
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Ahmed"
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
              <FormItem>
                {/* Label */}
                <FormLabel>Last Name</FormLabel>

                {/* Field */}
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Abdullah"
                    hasError={Boolean(fieldState.error)}
                  />
                </FormControl>

                {/* Feedback */}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Username */}
        <FormField
          control={form.control}
          name="username"
          render={({ field, fieldState }) => (
            <FormItem>
              {/* Label */}
              <FormLabel>Username</FormLabel>

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
            <FormItem>
              {/* Label */}
              <FormLabel>Email</FormLabel>

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
            <FormItem>
              {/* Label */}
              <FormLabel>Phone</FormLabel>

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
            <FormItem>
              {/* Label */}
              <FormLabel>Password</FormLabel>

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
          name="rePassword"
          render={({ field, fieldState }) => (
            <FormItem>
              {/* Label */}
              <FormLabel>Confirm Password</FormLabel>

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
          Create Account
        </Button>
      </form>
    </Form>
  );
}
