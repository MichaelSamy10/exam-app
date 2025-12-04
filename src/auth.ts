import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginResponse } from "./lib/types/auth";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`,
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const payload: ApiResponse<LoginResponse> = await response.json();

        if ("code" in payload) {
          throw new Error(payload.message);
        }

        return {
          id: payload.user._id,
          accessToken: payload.token,
          user: payload.user,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token.accessToken = user?.accessToken;
        token.user = user?.user;
      }

      if (trigger === "update") {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/profileData`,
            {
              headers: {
                "Content-Type": "application/json",
                token: token.accessToken as string,
              },
            }
          );

          if (response.ok) {
            const updatehUserData = await response.json();
            token.user = updatehUserData.user;
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      }

      return token;
    },
    session: ({ session, token }) => {
      session.user = token.user;

      return session;
    },
  },
};
