import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/providers/auth-provider";
import { ToastProvider } from "@/components/ui/toast"; // Import ToastProvider
import { Toaster } from "@/components/ui/toaster"; // Keeps your existing Toaster
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HackMate",
  description: "Find your perfect team for hackathons, challenges, and group projects.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Wrap with ToastProvider for global toast context */}
        <ToastProvider>
          <AuthProvider>{children}</AuthProvider>
          <Toaster /> {/* Keeps the existing toaster functionality */}
        </ToastProvider>
      </body>
    </html>
  );
}
