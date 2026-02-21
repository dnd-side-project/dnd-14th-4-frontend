"use client";

import { useState } from 'react';
import { BackHeader } from '@/shared/ui/BackHeader';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { MOCK_ITEMS, MOCK_PACK_CARDS } from '@/features/search/model/mock';
import { ItemBox } from '@/shared/ui/item/ItemBox';
import { Tag2Btn } from '@/shared/ui/Tag2Btn';
import { TextArea } from '@/shared/ui/TextArea';
import { FixedBottomButton } from '@/shared/ui/FixedBottomButton';
import { Modal } from '@/shared/ui/Modal';
import { ItemAddButton } from '@/shared/ui/ItemAddButton';

export default function PackDetailPage() {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    const id = params?.id;

    const isEditModeQuery = searchParams?.get('edit') === 'true';

    const packData = MOCK_PACK_CARDS.find((pack) => pack.id === String(id));

    const [isEditing, setIsEditing] = useState(isEditModeQuery);
    const [descriptionValue, setDescriptionValue] = useState("");

    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);




    if (!packData) {
        return (
            <div className="flex flex-col h-screen">
                <BackHeader onBack={() => router.back()} />
                <div className="flex flex-1 items-center justify-center">
                    <p>팩을 찾을 수 없습니다.</p>
                </div>
            </div>
        );
    }

    const { title, author, tag, date } = packData;

    const handleSave = () => {
        console.log("저장됨:", descriptionValue);
        setIsEditing(false);
    };

    const handleAddItem = () => {
        console.log("아이템 추가하기 버튼 클릭됨");
    };

    const handleBackClick = () => {
        if (isEditing) {
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
                    readOnly={!isEditing}
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

                    {isEditing && (
                        <ItemAddButton onClick={handleAddItem} />
                    )}
                </div>
            </div>

            {isEditing && (
                <FixedBottomButton onClick={handleSave}>
                    저장하기
                </FixedBottomButton>
            )}

            <Modal
                isOpen={isCancelModalOpen}
                onClose={() => setIsCancelModalOpen(false)}
                title="팩 수정을 그만둘까요?"
                description="변경된 내용은 저장되지 않아요."
                confirmText="확인"
                onConfirm={handleConfirmCancel}
            />
        </>
    );
}