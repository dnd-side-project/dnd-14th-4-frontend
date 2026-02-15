'use client';

import { IcSvgDoneRound } from '@/shared/icons';
import { WITHDRAWAL_GUIDELINES } from '@/features/search/model/mock';

interface ConfirmStepProps {
    isAgreed: boolean;
    onAgreeToggle: () => void;
}

export const ConfirmStep = ({ isAgreed, onAgreeToggle }: ConfirmStepProps) => (
    <div className="flex flex-col gap-6">
        <div className="border border-neutral-95 rounded-[20px] p-6">
            <ul className="flex flex-col gap-5 list-disc pl-4 type-body2 text-label-default">
                {WITHDRAWAL_GUIDELINES.map((guide, index) => (
                    <li key={index} className="leading-[22px]">
                        {guide}
                    </li>
                ))}
            </ul>
        </div>

        <button
            type="button"
            onClick={onAgreeToggle}
            className="flex items-center gap-3 w-full text-left"
        >
            <IcSvgDoneRound
                className={`w-6 h-6 transition-colors ${isAgreed ? 'text-neutral-10' : 'text-neutral-95'
                    }`}
            />
            <span className={`type-body2 font-medium ${isAgreed ? 'text-neutral-10' : 'text-neutral-80'
                }`}>
                탈퇴 시 안내사항을 모두 확인했어요.
            </span>
        </button>
    </div>
);