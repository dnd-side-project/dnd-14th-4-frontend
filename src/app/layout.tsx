import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../shared/styles/globals.css";
import { QueryProvider } from "./providers/QueryProvider";
import { BottomNav } from "@/widgets/bottom-nav/ui/BottomNav";
import { pretendard } from "@/shared/fonts/pretendard";

export const metadata: Metadata = {
  title: "What's in my pack",
  description: "What's in my pack",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body className="bg-gray-50">
        <QueryProvider>
          <div className="w-full max-w-mobile min-h-screen bg-white shadow-xl relative pb-20">
            {children}
            <BottomNav />
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
