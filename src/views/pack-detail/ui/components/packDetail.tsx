"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MOCK_ITEMS } from '@/features/search/model/mock';
import { BackHeader } from '@/shared/ui/BackHeader';
import { ItemBox } from '@/shared/ui/item/ItemBox';
import { Tag2Btn } from '@/shared/ui/Tag2Btn';
import { TextArea } from '@/shared/ui/TextArea';
import { FixedBottomButton } from '@/shared/ui/FixedBottomButton';
import { Modal } from '@/shared/ui/Modal';
import { ItemAddButton } from '@/shared/ui/ItemAddButton';
import { PackCardData } from '@/shared/ui/item/PackCard';

type PageMode = 'view' | 'edit' | 'add';

interface PackDetailContentProps {
    packData: PackCardData;
    onAddItem: () => void;
}

export default function PackDetailContent({ packData, onAddItem }: PackDetailContentProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const initialMode = (searchParams?.get('mode') as PageMode) || 'view';

    const [pageMode, setPageMode] = useState<PageMode>(initialMode);
    const [descriptionValue, setDescriptionValue] = useState("");
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

    const { title, author, tag, date } = packData;

    const handleComplete = () => {
        if (pageMode === 'edit') {
            console.log("수정된 내용 저장됨:", descriptionValue);
            setPageMode('view');
        } else if (pageMode === 'add') {
            console.log("새로운 팩 생성 완료!");
            setPageMode('view');
        }
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
                    <div className="w-12 h-12 bg-common-100 rounded-full" />
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
                    아이템 <span className="text-primary-normal">{MOCK_ITEMS.length}</span>
                </div>

                <div className="flex flex-col gap-4 mt-4">
                    {MOCK_ITEMS.map((card) => (
                        <ItemBox key={card.id} item={card} />
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
        </>
    );
}