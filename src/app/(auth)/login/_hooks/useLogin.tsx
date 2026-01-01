import { LoginFields } from "@/lib/types/auth";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

export default function useLogin() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (credentials: LoginFields) => {
      // Sign in user
      const response = await signIn("credentials", {
        email: credentials.email,
        password: credentials.password,
        redirect: false,
      });

      // Handle errors
      if (response?.error) {
        throw new Error(response.error);
      }

      return response;
    },
    onSuccess: () => {
      const callbackUrl =
        new URLSearchParams(location.search).get("callbackUrl") || "/dashboard";

      location.href = callbackUrl;
    },
  });

  return { isPending, error, login: mutate };
}
