/* eslint-disable no-unused-vars */
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    accessTokenExpiresAt: number;
    refreshToken: string;
    refreshTokenExpiresAt: number;
    client: string;
    user: {
      userId: string;
      fullname: string;
      profilePicture?: string;
      permission_keys: string[];
      role_keys: string[];
      email: string;
      mobile?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    accessTokenExpiresAt: number;
    refreshToken: string;
    refreshTokenExpiresAt: number;
    client: string;
    user: {
      userId: string;
      fullname: string;
      profilePicture?: string;
      permission_keys: string[];
      role_keys: string[];
      email: string;
      mobile?: string;
    };
  }
}

declare module "next-auth" {
  interface User {
    userId: string;
    fullname: string;
    permission_keys: string[];
    role_keys: string[];
    email: string;
    mobile?: string;
    profilePicture?: string;
    status: "verified" | "pending" | "registered";
  }
}
