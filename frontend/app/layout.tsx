import { Toaster } from "@/components/ui/toaster"
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import ThemeProvider from "@/components/provider";
import LayoutWrapper from "../components/LayoutWrapper";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "TestGenius - AI-Powered Jest Test Generation",
  description: "Revolutionize your JavaScript testing workflow with AI-generated Jest tests.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <UserProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
            <Toaster />
          </body>
        </ThemeProvider>
      </UserProvider>
    </html>
  )
}
