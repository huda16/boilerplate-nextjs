"use client";

import { SessionProvider as BaseSessionProvider } from "next-auth/react";

type SessionProviderProps = {
  children: React.ReactNode;
};

export function SessionProvider({ children }: SessionProviderProps) {
  return <BaseSessionProvider>{children}</BaseSessionProvider>;
}
