import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/auth-options";

import { SignIn } from "@/components/auth/signin";

export const metadata: Metadata = {
  title: "Sign In",
};

type SignInPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const session = await getServerSession(authOptions);

  if (session) redirect("/");

  return <SignIn searchParams={searchParams} />;
}
