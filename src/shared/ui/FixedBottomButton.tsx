"use client";

import { Button } from "@/shared/ui/Button"; // 기존에 만드신 Button 컴포넌트
import { ReactNode } from "react";

interface FixedBottomButtonProps {
    children: ReactNode;
    onClick: () => void;
    disabled?: boolean;
}

export const FixedBottomButton = ({
    children,
    onClick,
    disabled = false,
}: FixedBottomButtonProps) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 flex justify-center z-40">
            <div className="w-full max-w-mobile bg-white border-t border-neutral-100 p-5">
                <Button
                    onClick={onClick}
                    disabled={disabled}
                    className="w-full"
                >
                    {children}
                </Button>
            </div>
        </div>
    );
};