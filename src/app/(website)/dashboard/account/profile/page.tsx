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

  const router = useRouter();
  const { toast } = useToast();
  const { update } = useSession();

  const { data, isLoading } = useQuery({
    queryKey: ["UserInfo"],
    queryFn: () => getUserInfo(),
    refetchOnWindowFocus: false,
  });

  const handleEdit: SubmitHandler<ProfileFields> = async (values) => {
    const phone = values?.phone.startsWith("+20")
      ? values?.phone.slice(3)
      : values?.phone;

    const payload = { ...values, phone };
    const response = await editUserInfo(payload);

    await update();
    router.refresh();

    if (!response.ok) {
      form.setError("root", {
        message: response.error || "Something went wrong",
      });

      return;
    }
    toast({
      title: "Your changes have been saved.",
    });
  };

  const handleDelete = async () => {
    const response = await deleteUser();
    if (!response.ok) {
      form.setError("root", { message: response.error });
      return;
    }

    // toast({
    //   title: "Your account has been deleted successfully",
    // });

    await signOut({ callbackUrl: "/login" });
  };

  useEffect(() => {
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
          {/* First Name & Last Name */}
          <div className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} hasError={Boolean(fieldState.error)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} hasError={Boolean(fieldState.error)} />
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
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    hasError={Boolean(fieldState.error)}
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
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    hasError={Boolean(fieldState.error)}
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
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <PhoneInput
                    maxLength={11}
                    {...field}
                    hasError={Boolean(fieldState.error)}
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.formState.errors.root && <FormError form={form} />}

          <div className="mt-4 mb-9 grid grid-cols-2 gap-2">
            <DeleteDialog handleDelete={handleDelete} />

            <Button type="submit">Save changes</Button>
          </div>
        </form>
      )}
    </Form>
  );
}
