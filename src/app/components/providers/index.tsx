import NextAuthProvider from "./components/next-auth.provider";
import ReactQueryProvider from "./components/react-query-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthProvider>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </NextAuthProvider>
  );
}
