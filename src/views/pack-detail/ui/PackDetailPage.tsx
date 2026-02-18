"use client";

import { BackHeader } from '@/shared/ui/BackHeader';
import { useParams, useRouter } from 'next/navigation';
import { MOCK_ITEMS, MOCK_PACK_CARDS } from '@/features/search/model/mock';
import { ItemBox } from '@/shared/ui/item/ItemBox';
import Tag2Btn from '@/shared/ui/Tag1Btn';
import { TextArea } from '@/shared/ui/TextArea';

export default function PackDetailPage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id;


    const packData = MOCK_PACK_CARDS.find((pack) => pack.id === String(id));

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

    const { title, author, tag, description, date } = packData;

    return (
        <>
            <BackHeader onBack={() => router.back()} />
            <div className="px-6 pb-[90px] py-5">
                <h1 className="type-heading1 text-label-default mb-[10px]">{title}</h1>
                <Tag2Btn variant="pressed">{tag}</Tag2Btn>
                <div className='flex mt-6 items-center gap-2 mb-6'>
                    <div className="w-12 h-12 bg-common-100 rounded-full" />

                    <div className='flex flex-col gap-0.5'>
                        <p className='type-label1'>{author}</p>
                        <p className='type-caption1 text-gray-300'>{date}</p>
                    </div>
                </div>
                <TextArea
                    value={description}
                    readOnly={true}
                    variant="lg"
                />

                <div className="type-heading2 mt-[50px] flex gap-1">아이템 <p className="text-primary-normal">{MOCK_ITEMS.length}</p></div>
                <div className="flex flex-col gap-4 mt-4">
                    {MOCK_ITEMS.map((card) => (
                        <ItemBox key={card.id} item={card} />
                    ))}
                </div>
            </div>
        </>
    );
};