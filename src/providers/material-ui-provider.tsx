"use client";

import React from "react";

import { ThemeProvider } from "@mui/material";

import { theme } from "@/styles/theme";

type MaterialUiProviderProps = {
  children: React.ReactNode;
};

export default function MaterialUiProvider({
  children,
}: MaterialUiProviderProps) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
