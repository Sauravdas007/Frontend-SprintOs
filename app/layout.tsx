import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { RootLayoutClient } from "@/components/layout/root-layout-client";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "AI SprintOS - AI-Powered Sprint Management",
  description: "Modern AI-powered sprint and project management platform",
  keywords: ["sprint", "project management", "AI", "kanban", "agile"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans`}>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
