import { toast } from "@/hooks/use-toast";
import { useRouter } from "@/i18n/navigation";
import { registerUser } from "@/lib/actions/auth.action";
import { RegisterFields } from "@/lib/types/auth";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

export default function useRegister() {
  // Translation
  const t = useTranslations("auth-pages.register-page");

  // Navigation
  const router = useRouter();

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: RegisterFields) => {
      const payload = await registerUser(fields);

      if ("code" in payload) {
        throw new Error(payload.error);
      }

      return payload;
    },
    onSuccess: () => {
      toast({
        title: t("register-successful"),
      });

      router.push("/login");
    },
  });

  return { isPending, error, register: mutate };
}
