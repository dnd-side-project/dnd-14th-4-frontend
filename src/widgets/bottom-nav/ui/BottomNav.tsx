"use client";

import { BOTTOM_NAV_HIDE_RULES } from "@/shared/constants/nav.constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IcSvgHome, IcSvgFolder, IcSvgWish, IcSvgMypage } from "@/shared/icons";

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

  const navItems = [
    { href: "/", label: "홈", icon: IcSvgHome },
    { href: "/my-pack", label: "나의 팩", icon: IcSvgFolder },
    { href: "/wishlist", label: "위시리스트", icon: IcSvgWish },
    { href: "/my-page", label: "마이페이지", icon: IcSvgMypage },
  ];

  const linkBase =
    "flex items-center justify-center p-3 transition-colors duration-200";

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-mobile bg-white border-t border-gray-100 h-[84px] flex justify-between px-5 z-50 pt-2 pb-[46px]">
      {navItems.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href;

        return (
          <Link key={href} href={href} aria-label={label} className={linkBase}>
            <Icon
              className={`w-[30px] h-[30px] shrink-0 transition-colors ${
                isActive ? "text-neutral-10" : "text-neutral-70" // label-subtler 대신 아까 만든 토큰 사용 권장
              }`}
            />
          </Link>
        );
      })}
    </nav>
  );
};
