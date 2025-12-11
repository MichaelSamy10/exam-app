"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProfileFields } from "@/lib/types/auth";
import { profileSchema } from "@/lib/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { getUserInfo } from "@/lib/services/auth.service";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { editUserInfo } from "@/lib/actions/edit-user.action";
import { useToast } from "@/hooks/use-toast";
import { deleteUser } from "@/lib/actions/delete-user.action";
import { signOut, useSession } from "next-auth/react";
import FormError from "@/components/shared/form-error";
import DeleteDialog from "./_components/deleteDialog";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

export default function Profile() {
  // Navigation
  const router = useRouter();

  // Query
  const { data, isLoading } = useQuery({
    queryKey: ["UserInfo"],
    queryFn: () => getUserInfo(),
    refetchOnWindowFocus: false,
  });

  // Hooks
  const { toast } = useToast();
  const { update } = useSession();

  // Form
  const form = useForm<ProfileFields>({
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      phone: "",
    },
    resolver: zodResolver(profileSchema),
  });

  // Functions
  const handleEdit: SubmitHandler<ProfileFields> = async (values) => {
    // Change phone format
    const phone = values?.phone.startsWith("+20")
      ? values?.phone.slice(3)
      : values?.phone;

    const payload = { ...values, phone };

    // Edit user info
    const response = await editUserInfo(payload);

    // Handle errors
    if (!response.ok) {
      form.setError("root", {
        message: response.error || "Something went wrong",
      });

      return;
    }

    toast({
      title: "Your changes have been saved.",
    });

    // Refresh session and reload
    await update();
    router.refresh();
  };

  const handleDelete = async () => {
    // Delete user account
    const response = await deleteUser();

    // Handle errors
    if (!response.ok) {
      form.setError("root", { message: response.error });
      return;
    }

    toast({ title: "Your account has been deleted." });

    setTimeout(async () => {
      // Sign out user
      await signOut({ callbackUrl: "/login" });
    }, 2000);
  };

  // Effects
  useEffect(() => {
    // Fill form with user data
    if (data?.user) {
      form.reset({
        firstName: data?.user.firstName,
        lastName: data?.user.lastName,
        username: data?.user.username,
        email: data?.user.email,
        phone: data?.user.phone,
      });
    }
  }, [data, form]);

  return (
    <Form {...form}>
      {isLoading ? (
        <Spinner className="size-24 m-auto text-primary min-h-screen" />
      ) : (
        <form
          onSubmit={form.handleSubmit(handleEdit)}
          className="flex flex-col gap-4 bg-background p-6 min-h-screen"
        >
          <div className="lg:grid grid-cols-2 gap-2">
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
                    <Input {...field} hasError={Boolean(fieldState.error)} />
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
                  <FormLabel className="lg:m-0 mt-3">Last Name</FormLabel>

                  {/* Field */}
                  <FormControl>
                    <Input {...field} hasError={Boolean(fieldState.error)} />
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
                    maxLength={11}
                    {...field}
                    hasError={Boolean(fieldState.error)}
                    autoComplete="off"
                  />
                </FormControl>

                {/* Feedback */}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Form Error */}
          {form.formState.errors.root && <FormError form={form} />}

          <div className="mt-4 mb-9 grid lg:grid-cols-2 grid-row-2 gap-2">
            {/* Show Delete Dialog */}
            <DeleteDialog handleDelete={handleDelete} />

            <Button type="submit">Save changes</Button>
          </div>
        </form>
      )}
    </Form>
  );
}
