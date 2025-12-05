export const NEXTAUTH_COOKIE =
  process.env.NODE_ENV === "production" &&
  process.env.HOST?.includes("localhost")
    ? "__Secure-next-auth.session-token"
    : "next-auth.session-token";
