import React from "react";
import RegisterForm from "./_components/register-form";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function RegisterPage() {
  const t = useTranslations("auth-pages.register-page");

  return (
    <main className="md:w-[452px] w-4/5 m-auto">
      {/* Header */}
      <h2 className="font-secondary rtl:font-tajawal font-bold text-3xl mb-10">
        {t("header")}
      </h2>

      {/* Form */}
      <RegisterForm />

      {/* Footer */}
      <footer className="text-center text-gray-500">
        {t.rich("sub-text", {
          a: (chunk) => (
            <Link className="text-primary text-sm" href={"/login"}>
              {chunk}
            </Link>
          ),
        })}
      </footer>
    </main>
  );
}
