import { type NextAuthOptions, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

import { AxiosError } from "axios";

import axiosServer from "@/lib/axios-server";

function extractUserData(user: User) {
  const {
    userId,
    fullname,
    profilePicture,
    permission_keys,
    role_keys,
    email,
    mobile,
  } = user;
  return {
    userId,
    fullname,
    profilePicture,
    permission_keys,
    role_keys,
    email,
    mobile,
  };
}

async function refreshToken(token: JWT): Promise<JWT> {
  const body = new URLSearchParams({
    refresh_token: token?.refreshToken,
    grant_type: "refresh_token",
  });
  const config = {
    headers: {
      apikey: process.env.API_KEY,
    },
    auth: {
      username: process.env.API_USERNAME,
      password: process.env.API_PASSWORD,
    },
  };
  const response = await axiosServer.post(
    "/account/users/v1/token/oauth",
    body,
    config,
  );

  console.info(
    "NextAuth::Refresh Token",
    response.data.data.accessToken?.substr(-5),
  );

  return {
    ...token,
    ...response.data.data,
    user: extractUserData(response.data.data.user),
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
          const body = new URLSearchParams({
            username: email,
            password,
            grant_type: "password",
            "g-recaptcha-response": recaptcha,
          });
          const config = {
            headers: {
              apikey: process.env.API_KEY,
            },
            auth: {
              username: process.env.API_USERNAME,
              password: process.env.API_PASSWORD,
            },
          };
          const response = await axiosServer.post(
            "/account/users/v1/auth/recaptcha",
            body,
            config,
          );
          return {
            ...response.data.data,
            user: extractUserData(response.data.data.user),
          };
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

      if (Date.now() < Date.parse(token.accessTokenExpiresAt)) {
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
      session.client = token.client;

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
