'use client';

import { WITHDRAWAL_REASONS } from '@/features/search/model/mock';
import { IcSvgCheckCircle } from '@/shared/icons';
import { TextArea } from '@/shared/ui/TextArea';



interface ReasonStepProps {
    selectedReasons: string[];
    onToggle: (reason: string) => void;
    feedback: string;
    onFeedbackChange: (text: string) => void;
}

export const ReasonStep = ({
    selectedReasons,
    onToggle,
    feedback,
    onFeedbackChange
}: ReasonStepProps) => {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5">
                {WITHDRAWAL_REASONS.map((reason) => {
                    const isSelected = selectedReasons.includes(reason);
                    return (
                        <button
                            key={reason}
                            type="button"
                            onClick={() => onToggle(reason)}
                            className="flex items-center gap-3 w-full text-left"
                        >
                            <IcSvgCheckCircle
                                className={`w-6 h-6 transition-colors ${isSelected ? 'text-neutral-10' : 'text-neutral-95'
                                    }`}
                            />
                            <span className={`text-[15px] font-medium transition-colors text-label-default`}>
                                {reason}
                            </span>
                        </button>
                    );
                })}
            </div>

            <div className="flex flex-col w-full">
                <TextArea variant="lg" placeholder="더 나은 왓츠인마이팩이 될 수 있도록 소중한 의견을 들려주세요. (선택)" showCount={true} maxLength={100} value={feedback} onChange={(e) => onFeedbackChange(e.target.value)} />
            </div>
        </div>
    );
};