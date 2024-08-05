"use client";

import React from "react";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { theme } from "@/styles/theme";

type MaterialUiProviderProps = {
  children: React.ReactNode;
};

export default function MaterialUiProvider({
  children,
}: MaterialUiProviderProps) {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        {children}
      </LocalizationProvider>
    </ThemeProvider>
  );
}
