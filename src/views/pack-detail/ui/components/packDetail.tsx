"use client";

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { Item } from '@/entities/item/model/types';
import { BackHeader } from '@/shared/ui/BackHeader';
import { ItemBox } from '@/shared/ui/item/ItemBox';
import { Tag2Btn } from '@/shared/ui/Tag2Btn';
import { TextArea } from '@/shared/ui/TextArea';
import { FixedBottomButton } from '@/shared/ui/FixedBottomButton';
import { Modal } from '@/shared/ui/Modal';
import { ItemAddButton } from '@/shared/ui/ItemAddButton';
import { PackCardData } from '@/shared/ui/item/PackCard';
import { ProfileModal } from '@/views/pack-detail/ui/components/profileModal';
import { useUserStore } from "@/entities/user/model";
import { useToggleWish } from '@/entities/wishlist/model/useToggleWish';
import { useUpdatePack } from '@/entities/pack/model/useUpdatePack';

type PageMode = 'view' | 'edit' | 'add';

interface PackDetailContentProps {
    packData: PackCardData;
    items: Item[];
    onAddItem: () => void;
}

function PackDetailInner({ packData, items, onAddItem }: PackDetailContentProps) {
    const router = useRouter()
    const { user } = useUserStore();
    const searchParams = useSearchParams();
    const rawMode = searchParams.get('mode');
    const initialMode: PageMode =
        rawMode === 'edit' || rawMode === 'add' ? rawMode : 'view';

    const [pageMode, setPageMode] = useState<PageMode>(initialMode);
    const [descriptionValue, setDescriptionValue] = useState(packData.description || "");
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const { title, author, tag, date } = packData;
    const isMyPack = user?.name === author;
    const shouldShowWish = pageMode === 'view' && !isMyPack;
    const { mutate: toggleItemWish } = useToggleWish();
    const { mutate: updatePack } = useUpdatePack(packData.id);


    const handleComplete = () => {
        const itemIdsParam = searchParams.get('itemIds');
        const addItems = itemIdsParam ? itemIdsParam.split(',').map(Number) : [];

        updatePack({
            introduction: descriptionValue,
            addItems: addItems.length > 0 ? addItems : undefined,
            // removeItems: [] // 필요 시 구현
        }, {
            onSuccess: () => {
                setPageMode('view');
                // URL에서 쿼리 파라미터 제거하며 상세 페이지로 클린업 이동
                router.replace(`/pack/${packData.id}`);
            }
        });
    };

    const handleBackClick = () => {
        if (pageMode !== 'view') {
            setIsCancelModalOpen(true);
        } else {
            router.back();
        }
    };

    const handleConfirmCancel = () => {
        setIsCancelModalOpen(false);
        router.back();
    };

    return (
        <>
            <BackHeader onBack={handleBackClick} />
            <div className="px-6 pb-[100px] py-5">
                <h1 className="type-heading1 text-label-default mb-[10px]">{title}</h1>
                <Tag2Btn status>{tag}</Tag2Btn>

                <div className='flex mt-6 items-center gap-2 mb-6'>
                    <button
                        type="button"
                        aria-label={`${author} 프로필 보기`}
                        className="w-12 h-12 bg-common-100 rounded-full cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => setIsProfileModalOpen(true)}
                    />
                    <div className='flex flex-col gap-0.5'>
                        <p className='type-label1'>{author}</p>
                        <p className='type-caption1 text-gray-300'>{date}</p>
                    </div>
                </div>

                <TextArea
                    value={descriptionValue}
                    onChange={(e) => setDescriptionValue(e.target.value)}
                    readOnly={pageMode === 'view'}
                    variant="lg"
                    placeholder="팩에 대한 설명을 입력해주세요."
                />

                <div className="type-heading2 mt-[50px] flex gap-1">
                    아이템 <span className="text-primary-normal">{items.length}</span>
                </div>

                <div className="flex flex-col gap-4 mt-4">
                    {items.map((card) => (
                        <ItemBox
                            key={card.id}
                            item={card}
                            showWishBtn={shouldShowWish}
                            isWished={card.liked}
                            onWishClick={() => {
                                toggleItemWish({
                                    itemId: card.id,
                                    isWished: !!card.liked
                                });
                            }}
                        />
                    ))}

                    {pageMode !== 'view' && (
                        <ItemAddButton onClick={onAddItem} />
                    )}
                </div>
            </div>

            {pageMode !== 'view' && (
                <FixedBottomButton onClick={handleComplete}>
                    {pageMode === 'add' ? '작성완료' : '저장하기'}
                </FixedBottomButton>
            )}

            <Modal
                isOpen={isCancelModalOpen}
                onClose={() => setIsCancelModalOpen(false)}
                title={pageMode === 'add' ? "팩 작성을 취소할까요?" : "팩 수정을 그만둘까요?"}
                description={pageMode === 'add' ? "지금 나가면 작성 중인 팩이 저장되지 않아요." : "변경된 내용은 저장되지 않아요."}
                confirmText="확인"
                onConfirm={handleConfirmCancel}
            />

            <ProfileModal
                isOpen={isProfileModalOpen}
                onClose={() => setIsProfileModalOpen(false)}
                authorName={author}
            />
        </>
    );
}

export default function PackDetailContent(props: PackDetailContentProps) {
    return (
        <Suspense fallback={<div className="min-h-screen" />}>
            <PackDetailInner {...props} />
        </Suspense>
    );
}