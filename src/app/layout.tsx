import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../shared/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "왓츠인마이팩",
  description: "왓츠인마이팩",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

import { BottomNav } from "@/widgets/bottom-nav/ui/BottomNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex justify-center bg-gray-50`}
      >
        <div className="w-full max-w-mobile min-h-screen bg-white shadow-xl relative pb-20">
          {children}
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
