'use client';

import { IcSvgCheckCircle } from '@/shared/icons';

interface ConfirmStepProps {
    isAgreed: boolean;
    onAgreeToggle: () => void;
}

export const ConfirmStep = ({ isAgreed, onAgreeToggle }: ConfirmStepProps) => (
    <div className="flex flex-col gap-6">
        <div className=" border border-neutral-95 rounded-[20px] p-6 text-[14px] leading-[22px] text-neutral-40">
            <ul className="flex flex-col gap-5 list-disc pl-4 type-body2 text-label-default">
                <li>계정 정보와 위시리스트 기록은 모두 삭제되며 다시 복구할 수 없어요.</li>
                <li>탈퇴 즉시 이메일 등 개인을 식별할 수 있는 정보가 파기되어 본인 확인이 불가능해져요.</li>
                <li>작성하신 팩과 리뷰는 서비스 운영을 위해 남겨지며, 닉네임은 &apos;알 수 없음&apos; 으로 익명 처리돼요.</li>
                <li>게시물 삭제를 원하시면 탈퇴 진행 전 미리 직접 삭제해 주세요.</li>
            </ul>
        </div>

        <button type="button" onClick={onAgreeToggle} className="flex items-center gap-3 w-full text-left">
            <IcSvgCheckCircle className={`w-6 h-6 transition-colors ${isAgreed ? 'text-neutral-10' : 'text-neutral-95'}`} />
            <span className={`type-body2 ${isAgreed ? 'text-neutral-10' : 'text-neutral-80'}`}>
                탈퇴 시 안내사항을 모두 확인했어요.
            </span>
        </button>
    </div>
);