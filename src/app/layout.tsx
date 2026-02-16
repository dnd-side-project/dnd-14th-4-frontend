import type { Metadata } from "next";
import "../shared/styles/globals.css";
import { QueryProvider } from "./providers/QueryProvider";
import { SearchTransitionProvider } from "@/features/search/transition/SearchTransitionContext";
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
    <html lang="ko">
      <body
        className={`${pretendard.variable} antialiased flex justify-center bg-gray-50`}
      >
        <QueryProvider>
          <SearchTransitionProvider>
            <div className="w-full max-w-mobile min-h-screen bg-white shadow-xl relative">
              {children}
              <BottomNav />
            </div>
          </SearchTransitionProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
