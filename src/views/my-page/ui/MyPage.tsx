'use client';

import { useState } from 'react';
import Tag1Btn from '@/shared/ui/Tag1Btn';
import { MenuCard } from './components/MenuCard';
import { IcSvgInstagram, IcSvgKakaoTalk } from '@/shared/icons';
import Link from 'next/link';
import { LogoutModal } from './components/LogoutModal';

export const MyPage = () => {
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    return (
        <div className="max-w-md mx-auto min-h-screen bg-white p-5 relative pb-40">
            <header className="flex flex-col gap-2 items-center mb-4">
                <div className="w-[115px] h-[115px] bg-pink-40 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    닉
                </div>
                <h2 className="type-heading2 p-[10px]">닉네임4조짱최고</h2>
                <div className="flex gap-2 p-[10px] flex-wrap justify-center">
                    <Tag1Btn mode="chip" variant="secondary">
                        취미/생활
                    </Tag1Btn>
                    <Tag1Btn mode="chip" variant="secondary">
                        취미/생활
                    </Tag1Btn>
                    <Tag1Btn mode="chip" variant="secondary">
                        취미/생활
                    </Tag1Btn>
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
                    <p>©What &apos;s in my pack all rights reseved.</p>
                    <p>대표이사 DND 4조</p>
                    <p>문의전화 010-1234-5678</p>
                    <p>이메일 dnddndnd@gmail.com</p>
                    <p>호스팅 사업자 (주)왓츠인마이팩</p>
                </div>
                <div className='w-full h-[1px] bg-neutral-90 my-[26px] '></div>
                <div className="flex type-label2 text-label-subtle gap-4">
                    <button>사업자 정보 조회</button>
                    <button>이용약관</button>
                    <button>서비스 탈퇴</button>
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