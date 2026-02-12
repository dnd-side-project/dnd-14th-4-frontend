"use client";

import { BOTTOM_NAV_HIDE_RULES } from "@/shared/constants/nav.constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "홈", href: "/" },
  { label: "나의 팩", href: "/my-pack" },
  { label: "위시리스트", href: "/wishlist" },
  { label: "마이페이지", href: "/my-page" },
];

export const BottomNav = () => {
  const pathname = usePathname();

  function shouldHideBottomNav(pathname: string) {
    return BOTTOM_NAV_HIDE_RULES.some((rule) => {
      if (rule.endsWith("*")) {
        return pathname.startsWith(rule.replace("*", ""));
      }
      return pathname === rule;
    });
  }
  
  if (shouldHideBottomNav(pathname)) return null;

  return (
    <>
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-mobile bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center z-50">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 transition-colors ${
                isActive ? "text-blue-600" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {/* 아이콘 대신 네모 박스 안에 글자 첫 글자 또는 약어를 표시 */}
              <div
                className={`w-10 h-10 flex items-center justify-center border-2 rounded-md font-bold text-sm mb-1 transition-all ${
                  isActive
                    ? "border-blue-600 bg-blue-50 text-blue-600"
                    : "border-gray-200 bg-gray-50 text-gray-400"
                }`}
              >
                {item.label[0]}
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="h-20" aria-hidden />
    </>
  );
};
