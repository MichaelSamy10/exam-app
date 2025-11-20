import NextAuthProvider from "./_components/next-auth.provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <NextAuthProvider>{children}</NextAuthProvider>;
}
