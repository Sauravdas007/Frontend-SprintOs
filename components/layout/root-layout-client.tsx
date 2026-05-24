"use client";

import { ReactNode } from "react";
import { QueryProvider, ThemeProvider } from "@/providers";
import { Toaster } from "sonner";

export function RootLayoutClient({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <QueryProvider>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            className: "glass",
          }}
        />
      </QueryProvider>
    </ThemeProvider>
  );
}
