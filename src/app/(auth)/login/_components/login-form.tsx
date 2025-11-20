"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { LucideEyeOff, LucideEye, CircleX } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
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

export default function LoginForm() {
  const [show, setShow] = useState(false);
  // const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  // const [errors, setErrors] = useState({ email: false, password: false });

  const form = useForm<LoginFields>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleLogin: SubmitHandler<LoginFields> = async (values) => {
    // const newErrors = {
    //   email: !email.trim(),
    //   password: !password.trim(),
    // };
    //   if (response?.ok) {
    //     const callBackUrl =
    //       new URLSearchParams(location.search).get("callbackUrl") ||
    //       "/dashboard";
    //     return (location.href = callBackUrl);
    //   } else {
    //     console.log(response?.error);
    //   }
    // } else {
    //   setErrors(newErrors);
    //   if (newErrors.email || newErrors.password) return;
    // }

    const { email, password } = values;

    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (response?.ok) {
      console.log("OK");
      const callBackUrl =
        new URLSearchParams(location.search).get("callbackUrl") || "/dashboard";
      return (location.href = callBackUrl);
    }
    form.setError("root", {
      message: response?.error || "Login Failed, please try again",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-7">
        {/* Email */}
        <FormField
          control={form.control}
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
                  hasError={!!form.formState.errors.email}
                  autoComplete="email"
                />
              </FormControl>

              {/* Feedback */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          rules={{
            required: {
              value: true,
              message: "Your Password is required",
            },
          }}
          render={({ field }) => (
            <FormItem>
              {/* Label */}
              <FormLabel>Password</FormLabel>

              {/* Field */}
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    placeholder="********"
                    type={show ? "text" : "password"}
                    hasError={!!form.formState.errors.password}
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-2 top-3 text-sm text-gray-500"
                  >
                    {show ? (
                      <LucideEyeOff width={18} height={18} />
                    ) : (
                      <LucideEye width={18} height={18} />
                    )}
                  </button>
                </div>
              </FormControl>

              {/* Feedback */}
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="text-end ">
          <Link href={"/forgot-password"} className="text-primary text-sm">
            Forgot your password?
          </Link>
        </div>
        {form.formState.isSubmitted && !form.formState.isValid && (
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
                Something went wrong
              </p>
            </div>
          </div>
        )}
        <Button
          className="w-full"
          type="submit"
          disabled={!form.formState.isValid && form.formState.isSubmitted}
        >
          Login
        </Button>
      </form>
    </Form>
  );
}

//  <form onSubmit={onSubmit}>
//       <div className="flex flex-col gap-4">
//         <div>
//           <Label htmlFor="email">Email</Label>
//           <Input
//             hasError={errors.email}
//             value={email}
//             id="email"
//             type="email"
//             placeholder="user@example.com"
//             onChange={(e) => setEmail(e.target.value)}
//             errorMessage={errors.email ? "Your email is required" : ""}
//             autoComplete="email"
//           />
//         </div>
//         <div className="flex flex-col relative">
//           <Label
//             htmlFor="password"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Password
//           </Label>
//           <Input
//             hasError={errors.password}
//             id="password"
//             type={show ? "text" : "password"}
//             placeholder="********"
//             onChange={(e) => setPassword(e.target.value)}
//             errorMessage={errors.password ? "Your password is required" : ""}
//             autoComplete="new-password"
//           />
//           <button
//             type="button"
//             onClick={() => setShow(!show)}
//             className="absolute right-2 top-8 text-sm text-gray-500"
//           >
//             {show ? (
//               <LucideEyeOff width={18} height={18} />
//             ) : (
//               <LucideEye width={18} height={18} />
//             )}
//           </button>
//         </div>
//         <div className="text-end ">
//           <Link href={"/forgot-password"} className="text-primary text-sm">
//             Forgot your password?
//           </Link>
//         </div>
//         {(errors.email || errors.password) && (
//           <div className="border border-red-600 bg-red-50 p-2">
//             <div className="relative mx-auto">
//               <div className="absolute -top-6 left-1/2 -translate-x-1/2 rounded-full p-2">
//                 <CircleX
//                   className="text-red-500 fill-white"
//                   width={18}
//                   height={18}
//                 />
//               </div>
//               <p className="text-red-600 text-center text-sm">
//                 Something went wrong
//               </p>
//             </div>
//           </div>
//         )}

//         <Button className="w-full mb-9" type="submit">
//           Login
//         </Button>
//       </div>
//     </form>
