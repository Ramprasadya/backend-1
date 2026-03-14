import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AuthApp",
    template: "%s | AuthApp",
  },
  description:
    "Secure authentication system built with Next.js and NextAuth. Sign in or create an account to access your dashboard.",

  keywords: [
    "Next.js authentication",
    "NextAuth login",
    "Next.js auth system",
    "secure login",
    "authentication app",
  ],

  authors: [{ name: "AuthApp Team" }],

  creator: "AuthApp",

  metadataBase: new URL("https://yourdomain.com"),

  openGraph: {
    title: "AuthApp - Secure Authentication",
    description:
      "Modern authentication system built with Next.js and NextAuth.",
    url: "https://yourdomain.com",
    siteName: "AuthApp",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "AuthApp",
    description:
      "Secure authentication system built with Next.js and NextAuth.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
