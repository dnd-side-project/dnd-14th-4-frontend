import type { Metadata } from "next";
import "../shared/styles/globals.css";
import { QueryProvider } from "./providers/QueryProvider";
import { AuthHydrate } from "./providers/AuthHydrate";
import { SearchTransitionProvider } from "@/features/search/transition/SearchTransitionContext";
import { BottomNav } from "@/widgets/bottom-nav/ui/BottomNav";
import { pretendard } from "@/shared/fonts/pretendard";
import { ToastProvider } from "./providers/ToastProvider";

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
        className={`${pretendard.variable} antialiased flex justify-center bg-gray-50 dark:bg-gray-50 h-dvh overflow-hidden`}
      >
        <QueryProvider>
          <AuthHydrate>
            <SearchTransitionProvider>
              <div className="w-full max-w-mobile h-dvh bg-white shadow-xl relative overflow-hidden">
                <div className="h-full overflow-y-auto overflow-x-hidden pb-[var(--bottom-nav-space,0px)]">
                  {children}
                </div>
                <BottomNav />
                <ToastProvider />
              </div>
            </SearchTransitionProvider>
          </AuthHydrate>
        </QueryProvider>
      </body>
    </html>
  );
}
