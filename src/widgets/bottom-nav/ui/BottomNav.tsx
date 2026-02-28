"use client";

import { BOTTOM_NAV_HIDE_RULES } from "@/shared/constants/nav.constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IcSvgHome, IcSvgFolder, IcSvgWish, IcSvgMypage } from "@/shared/icons";
import FabMenu from "@/shared/ui/FabMenu";

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

  if (shouldHideBottomNav(pathname)) return <div className="h-[72px] w-full bg-white" aria-hidden="true" />;

  const navItems = [
    { href: "/", label: "홈", icon: IcSvgHome },
    { href: "/my-pack", label: "나의 팩", icon: IcSvgFolder },
    { href: "/wishlist", label: "위시리스트", icon: IcSvgWish },
    { href: "/my-page", label: "마이페이지", icon: IcSvgMypage },
  ];

  const linkBase =
    "flex items-center justify-center p-3 transition-colors duration-200";

  return (
    <>
      <div className="fixed bottom-[100px] left-1/2 -translate-x-1/2 w-full max-w-mobile z-40 pointer-events-none">
        <div className="absolute right-4 bottom-0 pointer-events-auto">
          <FabMenu />
        </div>
      </div>

      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-mobile bg-white border-t border-gray-100 h-[72px] flex justify-between px-5 z-30 pt-3 pb-[max(env(safe-area-inset-bottom),12px)]">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <Link key={href} href={href} aria-label={label} className={linkBase}>
              <Icon
                className={`w-[30px] h-[30px] shrink-0 transition-colors ${isActive ? "text-neutral-10" : "text-neutral-70"
                  }`}
              />
            </Link>
          );
        })}
      </nav>
      {/* 바텀 바 뒤에서 공간을 확보해줄 placeholder (페이지 스크롤 시 바텀 바가 컨텐츠를 가리지 않게 함) */}
      <div className="h-[72px] w-full shrink-0" aria-hidden="true" />
    </>
  );
};