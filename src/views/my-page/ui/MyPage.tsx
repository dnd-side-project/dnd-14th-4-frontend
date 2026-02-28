'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Tag2Btn } from '@/shared/ui/Tag2Btn';
import { MenuCard } from './components/MenuCard';
import { IcSvgInstagram, IcSvgKakaoTalk } from '@/shared/icons';
import Link from 'next/link';
import { LogoutModal } from './components/LogoutModal';
import { useUserStore, isProfileDefaultColor } from '@/entities/user/model';

export const PROFILE_COLOR_CLASS: Record<string, string> = {
    yellow: 'bg-[#FFD37C]',
    red: 'bg-[#FF7BAC]',
    blue: 'bg-[#86BEFF]',
    green: 'bg-[#D7D467]',
    purple: 'bg-[#C1B7F7]',
    butter: 'bg-[#FFD37C]',
    pink: 'bg-[#FF7BAC]',
    skyblue: 'bg-[#86BEFF]',
    lime: 'bg-[#D7D467]',
    lilac: 'bg-[#C1B7F7]',
};

export const MyPage = () => {

    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const router = useRouter();
    const { user, isLoaded } = useUserStore();

    useEffect(() => {
        if (isLoaded && !user) {
            router.replace('/login');
        }
    }, [isLoaded, user, router]);

    if (!isLoaded) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="max-w-md mx-auto min-h-screen bg-white p-5 relative pb-40">
            <header className="flex flex-col gap-2 items-center mb-4">
                <div
                    className={`w-[115px] h-[115px] rounded-full flex items-center justify-center text-white text-xl font-bold overflow-hidden ${isProfileDefaultColor(user.profileImageUrl) ? PROFILE_COLOR_CLASS[user.profileImageUrl] ?? 'bg-neutral-300' : ''}`}
                    style={!isProfileDefaultColor(user.profileImageUrl) ? { backgroundImage: `url(${user.profileImageUrl})`, backgroundSize: 'cover' } : undefined}
                >
                    {isProfileDefaultColor(user.profileImageUrl) ? (
                        (user.name || '?').charAt(0).toUpperCase()
                    ) : null}
                </div>
                <h2 className="type-heading2 p-[10px]">마이페이지</h2>
                <div className="flex gap-2 p-[10px] flex-wrap justify-center">
                    {user.contextCategoryNames.length > 0 ? (
                        user.contextCategoryNames.map((name) => (
                            <Tag2Btn key={name} mode="chip" status={true}>
                                {name}
                            </Tag2Btn>
                        ))
                    ) : (
                        <span className="type-caption1 text-label-subtle">관심 카테고리를 설정해 보세요.</span>
                    )}
                </div>
            </header>

            <main>
                <MenuCard title="내 정보 수정">
                    <Link href="/my-page/profile-edit">프로필 설정</Link>
                    <Link href="/my-page/interest-edit">관심 상황 수정</Link>
                </MenuCard>

                <MenuCard title="서비스 정보">
                    <Link href="/my-page/notice">공지사항</Link>
                    <Link href="/my-page/policies">이용약관 및 정책</Link>
                    <div className="flex justify-between items-center w-full">
                        <span>버전 정보</span>
                        <span className="type-caption1 text-label-subtle">2.31.22</span>
                    </div>
                </MenuCard>

                <MenuCard>
                    <button
                        className='text-left w-full'
                        onClick={() => setIsLogoutModalOpen(true)}
                    >
                        로그아웃
                    </button>
                </MenuCard>
            </main>

            <footer className="mt-4">
                <div className="type-caption1 text-neutral-70 flex flex-col gap-[6px]">
                    <p>©What &apos;s in my pack all rights reserved.</p>
                    <p>대표이사 DND 4조</p>
                    <p>문의전화 010-1234-5678</p>
                    <p>이메일 dnddndnd@gmail.com</p>
                    <p>호스팅 사업자 (주)왓츠인마이팩</p>
                </div>
                <div className='w-full h-[1px] bg-neutral-90 my-[26px] '></div>
                <div className="flex type-label2 text-label-subtle gap-4">
                    <button>사업자 정보 조회</button>
                    <button>이용약관</button>
                    <Link href="/my-page/withdrawal">서비스 탈퇴</Link>
                </div>

                <div className="flex gap-4 mt-6 text-gray-400">
                    <IcSvgInstagram width={24} height={24} />
                    <IcSvgKakaoTalk width={24} height={24} />
                </div>
            </footer>

            <LogoutModal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
            />
        </div>
    );
};