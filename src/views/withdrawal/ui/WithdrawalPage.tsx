'use client';

import { useState } from 'react';
import { ReasonStep } from '../components/ReasonStep';
import { ConfirmStep } from '../components/ConfirmStep'; // 다음 단계 컴포넌트가 있다면
import { BackHeader } from '@/shared/ui/BackHeader';
import { useRouter } from 'next/navigation';
import { FixedBottomButton } from '@/shared/ui/FixedBottomButton';
import { useWithdrawal } from '@/entities/user/model/useWithdrawal';

export const WithdrawalPage = () => {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const { withdraw } = useWithdrawal();
    const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
    const [feedback, setFeedback] = useState("");
    const [isAgreed, setIsAgreed] = useState(false);
    const toggleReason = (reason: string) => {
        if (selectedReasons.includes(reason)) {
            setSelectedReasons(selectedReasons.filter((r) => r !== reason));
        } else {
            setSelectedReasons([...selectedReasons, reason]);
        }
    };

    const handleNext = async () => {
        if (step === 1) setStep(2);
        else {
            await withdraw();
        }
    };

    return (
        <div className='min-h-screen'>
            <BackHeader onBack={() => router.back()}></BackHeader>
            <div className="max-w-md mx-auto bg-white p-5 flex flex-col">
                <main className="flex-1">
                    {step === 1 ? (
                        <ReasonStep
                            selectedReasons={selectedReasons}
                            onToggle={toggleReason}
                            feedback={feedback}
                            onFeedbackChange={setFeedback}
                        />
                    ) : (
                        <ConfirmStep
                            isAgreed={isAgreed}
                            onAgreeToggle={() => setIsAgreed(!isAgreed)}
                        />
                    )}
                </main>

                <FixedBottomButton
                    onClick={handleNext}
                    disabled={(step === 1 && selectedReasons.length === 0) || (step === 2 && !isAgreed)}
                >
                    {step === 1 ? "다음" : "탈퇴하기"}
                </FixedBottomButton>
            </div>
        </div>
    );
};