import { type NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

import { AxiosError } from "axios";

import axiosServer from "@/lib/axios-server";

async function refreshToken(token: JWT): Promise<JWT> {
  const body = {
    refreshToken: token?.refreshToken,
  };
  console.log("NextAuth::BodyRefresh", body);
  const response = await axiosServer.put("/authentications", body, {
    isSkipAuth: true,
  });

  console.info("NextAuth::Refresh Token", response.data?.data);

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
      },
      async authorize(credentials) {
        try {
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
  session: {
    strategy: "jwt",
  },
};
