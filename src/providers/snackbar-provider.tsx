"use client";

import { SnackbarProvider as BaseSnackbarProvider } from "notistack";

type SnackbarProviderProps = {
  children: React.ReactNode;
};

export function SnackbarProvider({ children }: SnackbarProviderProps) {
  return (
    <BaseSnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      {children}
    </BaseSnackbarProvider>
  );
}
