"use client";

import { ThemeProvider } from "next-themes";

export default function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
