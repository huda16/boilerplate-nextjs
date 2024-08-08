import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { AxiosError } from "axios";

import axiosServer from "@/lib/axios-server";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
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
        accessToken: {
          label: "accessToken",
          type: "text",
        },
        accessTokenExpiresAt: {
          label: "accessTokenExpiresAt",
          type: "number",
        },
        refreshToken: {
          label: "refreshToken",
          type: "text",
        },
        refreshTokenExpiresAt: {
          label: "refreshTokenExpiresAt",
          type: "number",
        },
      },
      async authorize(credentials) {
        try {
          if (
            credentials?.accessToken &&
            credentials?.accessTokenExpiresAt &&
            credentials?.refreshToken &&
            credentials?.refreshTokenExpiresAt
          ) {
            return {
              ...credentials,
              accessTokenExpiresAt: Number(credentials?.accessTokenExpiresAt),
              refreshTokenExpiresAt: Number(credentials?.refreshTokenExpiresAt),
            };
          }
          if (!credentials?.username || !credentials?.password) return null;
          const { username, password } = credentials;
          const body = {
            username,
            password,
          };
          const response = await axiosServer.post("/authentications", body, {
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
    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user };
      }

      return token;
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
  session: {
    strategy: "jwt",
  },
};
