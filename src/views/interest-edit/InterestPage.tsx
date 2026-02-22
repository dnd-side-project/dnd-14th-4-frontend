'use client';

import { useState } from 'react';
import { FlowLayout } from '@/shared/ui/layouts/flow-chart';
import { MOMENT_OPTIONS } from '@/views/onboarding/model/constants';
import { MultiSelectGroup } from '@/shared/ui/MultiSelectGroup';
import { BackHeader } from '@/shared/ui/BackHeader';
import { useRouter } from 'next/navigation';

export const InterestPage = () => {
    const router = useRouter();
    const [selectedMoments, setSelectedMoments] = useState<string[]>([]);

    const handleSubmit = () => {
        console.log('서버로 저장할 관심 상황:', selectedMoments);
    };

    return (
        <div className='min-h-screen'>
            <BackHeader onBack={() => router.back()}></BackHeader>
            <div className='max-w-md mx-auto bg-white pt-5'>
                <FlowLayout>
                    <FlowLayout.Header
                        title="내 일상에 새로운 순간이 생겼나요?"
                        description={"나에게 꼭 맞는 관심 상황을 자유롭게 수정해 보세요.\n최대 3개까지 선택할 수 있어요."}
                    />

                    <FlowLayout.Content hasFooter>
                        <div className="mt-6">
                            <MultiSelectGroup
                                options={MOMENT_OPTIONS}
                                selected={selectedMoments}
                                onChange={setSelectedMoments}
                                maxCount={3}
                            />
                        </div>
                    </FlowLayout.Content>

                    <FlowLayout.Footer
                        label="완료"
                        onClick={handleSubmit}
                    />
                </FlowLayout>
            </div>
        </div>
    );
};