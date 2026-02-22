"use client";

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { MOCK_PACK_CARDS } from '@/features/search/model/mock';
import { ItemAdd } from '@/views/my-pack/ui/components/ItemAdd';
import PackDetailContent from '@/views/pack-detail/ui/components/packDetail';

export default function PackDetailPage() {
    const params = useParams();
    const id = params?.id;

    const packData = MOCK_PACK_CARDS.find((pack) => pack.id === String(id));

    const [isAddingItem, setIsAddingItem] = useState(false);



    if (isAddingItem) {
        return (
            <ItemAdd
                onBack={() => setIsAddingItem(false)}
                addMode="item"
            />
        );
    }

    return (
        <>
            {
                packData ? (
                    <PackDetailContent
                        packData={packData}
                        onAddItem={() => setIsAddingItem(true)}
                    />

                ) :
                    <div>해당 팩을 찾을 수 없습니다.</div>
            }
        </>
    );
}