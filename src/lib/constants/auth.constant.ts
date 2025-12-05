export const NEXTAUTH_COOKIE =
  process.env.NODE_ENV === "production" &&
  process.env.HOST?.includes("localhost")
    ? "next-auth.session-token"
    : "__Secure-next-auth.session-token";
