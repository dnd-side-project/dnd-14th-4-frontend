"use client";

import Image from "next/image";
import { FixedBottomButton } from "@/shared/ui/FixedBottomButton"; // 경로 확인 필요

interface ServerErrorProps {
    reset?: () => void;
}

export const ServerError = ({ reset }: ServerErrorProps) => {
    const handleRetry = () => {
        if (reset) {
            reset();
        } else {
            window.location.reload();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center px-5 text-center bg-background-normal">
            <div className="flex flex-col items-center gap-10 mb-20">
                <Image
                    src="/Symbol_Error.svg"
                    alt="error"
                    width={122}
                    height={122}
                />
                <div className="space-y-2">
                    <h2 className="type-headline1 text-primary-normal">일시적인 오류가 발생했습니다.</h2>
                    <p className="type-body1 text-neutral-20">잠시 후 다시 시도해 주세요.</p>
                </div>
            </div>

            <FixedBottomButton onClick={handleRetry}>
                다시 시도하기
            </FixedBottomButton>
        </div>
    );
};