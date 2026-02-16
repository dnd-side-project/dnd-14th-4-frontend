'use client';

import { useState } from 'react';
import { ReasonStep } from '../components/ReasonStep';
import { ConfirmStep } from '../components/ConfirmStep'; // 다음 단계 컴포넌트가 있다면

export const WithdrawalPage = () => {
    const [step, setStep] = useState(1);

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

    const handleNext = () => {
        if (step === 1) setStep(2);
        else {
            // 탈퇴 처리
        }
    };

    return (
        <div className="max-w-md mx-auto min-h-screen bg-white p-5 flex flex-col">
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

            <footer className="mt-6 pb-4">
                <button
                    onClick={handleNext}
                    disabled={(step === 1 && selectedReasons.length === 0) || (step === 2 && !isAgreed)}
                    className="w-full py-4 rounded-xl bg-neutral-900 text-white font-medium disabled:bg-neutral-200 disabled:text-neutral-400 transition-colors"
                >
                    {step === 1 ? "다음" : "탈퇴하기"}
                </button>
            </footer>
        </div>
    );
};