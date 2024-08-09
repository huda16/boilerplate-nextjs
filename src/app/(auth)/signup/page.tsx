import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/auth-options";

import { SignUp } from "@/components/auth/signup";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default async function SignUpPage() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/");

  return <SignUp />;
}
