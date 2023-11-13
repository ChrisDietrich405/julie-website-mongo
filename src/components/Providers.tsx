"use client";

import { ThemeProvider } from "next-themes";
import { ContextProvider } from "@/app/context/cartContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ContextProvider>{children}</ContextProvider>
    </ThemeProvider>
  );
}
