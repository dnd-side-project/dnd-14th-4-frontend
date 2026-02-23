'use client';

import { useState } from 'react';
import { FlowLayout } from '@/shared/ui/layouts/flow-chart';
import { MOMENT_OPTIONS } from '@/views/onboarding/model/constants';
import { MultiSelectGroup } from '@/shared/ui/MultiSelectGroup';
import { BackHeader } from '@/shared/ui/BackHeader';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/entities/user/model';
import { useUpdateInterest } from '@/entities/user/model/useUpdateInterest';

export const InterestPage = () => {
    const router = useRouter();
    const { user } = useUserStore();

    const { updateInterest } = useUpdateInterest();

    const [selectedMoments, setSelectedMoments] = useState<string[]>(() => {
        return user?.contextCategoryNames || [];
    });


    const handleSubmit = async () => {
        try {


            await updateInterest(selectedMoments);

            alert('관심 상황이 수정되었습니다.');
            router.back();
        } catch (error) {
            console.error('수정 실패:', error);
            alert('저장에 실패했습니다.');
        }
    };

    if (!user) return null;

    return (
        <div className='min-h-screen'>
            <BackHeader onBack={() => router.back()} />
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
                        disabled={selectedMoments.length === 0}
                        onClick={handleSubmit}
                    />
                </FlowLayout>
            </div>
        </div>
    );
};