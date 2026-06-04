import NextAuthProvider from "./components/next-auth.provider";
import ReactQueryProvider from "./components/react-query-provider";
import { NextIntlClientProvider } from "next-intl";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthProvider>
      <NextIntlClientProvider>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </NextIntlClientProvider>
    </NextAuthProvider>
  );
}
