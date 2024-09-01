import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Nav from "@/components/nav";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Prowler",
  description: "Find the lowest price for games.",
};

const myFont = localFont({
  src: './fonts/Inter-Regular.ttf'
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      {/* This ensures that the entire screen will be midnight (beyond limits of page) */}
      <section className="min-h-screen bg-midnight">
        {children}
      </section>
      </body>
    </html>
  );
}