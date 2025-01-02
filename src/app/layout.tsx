import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs';

import "./globals.css";
import { ThemeProvider } from "./ThemeProvider";

export const metadata: Metadata = {
  title: "Scribble",
  description: "The intelligent note taking app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ThemeProvider attribute="class">
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
};