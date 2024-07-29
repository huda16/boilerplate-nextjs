import { Metadata } from "next";

import { LoginForm } from "@/components/login/login-form";

export const metadata: Metadata = {
  title: "Login",
};

type LoginPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function LoginPage({ searchParams }: LoginPageProps) {
  return <LoginForm searchParams={searchParams} />;
}
