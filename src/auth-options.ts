import { type NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

import { AxiosError } from "axios";

import axiosServer from "@/lib/axios-server";

async function refreshToken(token: JWT): Promise<JWT> {
  const body = {
    refreshToken: token?.refreshToken,
  };
  const response = await axiosServer.post("/auth/refresh", body, {
    isSkipAuth: true,
  });

  console.info(
    "NextAuth::Refresh Token",
    response.data?.data?.accessToken?.substr(-5),
  );

  return {
    ...token,
    ...response.data?.data,
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
        recaptcha: {
          label: "Recaptcha",
          type: "text",
        },
      },
      async authorize(credentials) {
        try {
          if (
            !credentials?.email ||
            !credentials?.password ||
            !credentials?.recaptcha
          )
            return null;
          const { email, password, recaptcha } = credentials;
          const body = {
            email,
            password,
          };
          const response = await axiosServer.post("/auth/login", body, {
            isSkipAuth: true,
          });
          return response.data?.data;
        } catch (error) {
          if (error instanceof AxiosError) {
            throw new Error(error.response?.data?.message);
          }
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (trigger === "update") {
        return await refreshToken(token);
      }

      if (user) {
        return { ...token, ...user };
      }

      if (Date.now() / 1000 < token.accessTokenExpiresAt) {
        return token;
      }

      return await refreshToken(token);
    },
    async session({ token, session }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.accessTokenExpiresAt = token.accessTokenExpiresAt;
      session.refreshToken = token.refreshToken;
      session.refreshTokenExpiresAt = token.refreshTokenExpiresAt;

      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};
