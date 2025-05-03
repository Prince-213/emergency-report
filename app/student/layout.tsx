import type React from "react";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Campus Emergency System",
  description: "Emergency reporting system for students",
  generator: "v0.dev"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
