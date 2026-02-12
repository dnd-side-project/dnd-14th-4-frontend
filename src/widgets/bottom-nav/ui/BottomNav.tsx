'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    IcSvgHome,
    IcSvgFolder,
    IcSvgWish,
    IcSvgMypage
} from '@/shared/icons';

export const BottomNav = () => {
    const pathname = usePathname();

    const linkBase = "flex items-center justify-center p-3 transition-colors duration-200";

    const getIconClass = (path: string) => {
        const isActive = pathname === path;
        return `w-[30px] h-[30px] shrink-0 ${isActive ? 'text-neutral-10' : 'text-label-subtler'}`;
    };

    return (
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-mobile bg-white border-t border-gray-100 h-[84px] flex justify-between px-5 z-50 pt-2 pb-[46px]">

            <Link href="/" aria-label="홈" className={linkBase}>
                <IcSvgHome className={getIconClass('/')} />
            </Link>

            <Link href="/my-pack" aria-label="나의 팩" className={linkBase}>
                <IcSvgFolder className={getIconClass('/my-pack')} />
            </Link>

            <Link href="/wishlist" aria-label="위시리스트" className={linkBase}>
                <IcSvgWish className={getIconClass('/wishlist')} />
            </Link>

            <Link href="/my-page" aria-label="마이페이지" className={linkBase}>
                <IcSvgMypage className={getIconClass('/my-page')} />
            </Link>

        </nav>
    );
};