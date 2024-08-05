import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/auth-options";

import { SignInForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Sign In",
};

type SignInPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const session = await getServerSession(authOptions);

  if (session) redirect("/");

  return <SignInForm searchParams={searchParams} />;
}
