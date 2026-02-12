'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    IcSvgHome,
    IcSvgFolder,
    IcSvgWish,
    IcSvgMypage
} from '@/shared/icons'; // 실제 아이콘 경로로 수정해주세요

export const BottomNav = () => {
    const pathname = usePathname();

    const linkBase = "flex items-center justify-center p-3 transition-colors duration-200";

    return (
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-mobile bg-white border-t border-gray-100 px-6 h-[60px] flex justify-between items-center z-50">

            <Link href="/" aria-label="홈" className={linkBase}>
                <IcSvgHome
                    className={`w-[30px] h-[30px] shrink-0 ${pathname === '/' ? 'text-neutral-10' : 'text-label-subtle'
                        }`}
                />
            </Link>

            <Link href="/my-pack" aria-label="나의 팩" className={linkBase}>
                <IcSvgFolder
                    className={`w-[30px] h-[30px] shrink-0 ${pathname === '/my-pack' ? 'text-neutral-10' : 'text-label-subtle'
                        }`}
                />
            </Link>

            <Link href="/wishlist" aria-label="위시리스트" className={linkBase}>
                <IcSvgWish
                    className={`w-[30px] h-[30px] shrink-0 ${pathname === '/wishlist' ? 'text-neutral-10' : 'text-label-subtle'
                        }`}
                />
            </Link>

            <Link href="/my-page" aria-label="마이페이지" className={linkBase}>
                <IcSvgMypage
                    className={`w-[30px] h-[30px] shrink-0 ${pathname === '/my-page' ? 'text-neutral-10' : 'text-label-subtle'
                        }`}
                />
            </Link>

        </nav>
    );
};