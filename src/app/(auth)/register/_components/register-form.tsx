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
import { CircleX } from "lucide-react";
import { useRouter } from "next/navigation";
import { RegisterFields } from "@/lib/types/auth";
import { registerUser } from "@/lib/actions/auth.action";

export default function RegisterForm() {
  const router = useRouter();

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
  });

  const handleRegister: SubmitHandler<RegisterFields> = async (values) => {
    try {
      const response = await registerUser(values);
      // console.log("Form values:", values);

      if (response.ok) {
        router.push("/dashboard");
      }
    } catch (err: unknown) {
      const message = (err as Error).message ?? "Something went wrong";

      form.setError("root", { message });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleRegister)}
        className="flex flex-col gap-4"
      >
        {/* First Name & Last Name */}
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="firstName"
            rules={{ required: "First Name is required" }}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Ahmed"
                    hasError={!!fieldState.error}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            rules={{ required: "Last Name is required" }}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Abdullah"
                    hasError={!!fieldState.error}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Username */}
        <FormField
          control={form.control}
          name="username"
          rules={{ required: "Username is required" }}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="user123"
                  hasError={!!fieldState.error}
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org)$/,
              message: "Please enter a valid email address",
            },
          }}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="user@example.com"
                  hasError={!!fieldState.error}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          rules={{ required: "Phone is required" }}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <PhoneInput
                  {...field}
                  placeholder="1012345678"
                  hasError={!!fieldState.error}
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          rules={{ required: "Password is required" }}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordField field={field} fieldState={fieldState} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Confirm Password */}
        <FormField
          control={form.control}
          name="rePassword"
          rules={{
            required: "Confirm Password is required",
            validate: (value) =>
              value === form.getValues("password") || "Passwords do not match",
          }}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordField field={field} fieldState={fieldState} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.formState.errors.root && (
          <div className="border border-red-600 bg-red-50 p-2">
            <div className="relative mx-auto">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 rounded-full p-2">
                <CircleX
                  className="text-red-500 fill-white"
                  width={18}
                  height={18}
                />
              </div>
              <p className="text-red-600 text-center text-sm">
                {form.formState.errors.root.message}
              </p>
            </div>
          </div>
        )}

        <Button className="w-full mt-4 mb-9" type="submit">
          Create Account
        </Button>
      </form>
    </Form>
  );
}
