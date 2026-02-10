"use client";

import * as React from "react";
import { cn } from "../lib/cn"; // 경로 확인

export type Tag2BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    status?: boolean; // true: 핑크(Active), false: 회색(Default)
    hasX?: boolean;   // true: 닫기 버튼(X) 포함
};

export const Tag2Btn = React.forwardRef<HTMLButtonElement, Tag2BtnProps>(
    (
        {
            className,
            status = false,
            hasX = false,
            children,
            disabled,
            ...props
        },
        ref,
    ) => {
        // 1. 공통 베이스 스타일
        // 둥근 캡슐 모양(rounded-full), 테두리(border), 텍스트(text-label1)
        const base =
            "inline-flex items-center justify-center type-label1 px-4 py-1.5 rounded-full border border-[2px] transition-colors duration-200 cursor-pointer gap-1.5 " +
            "disabled:opacity-50 disabled:cursor-not-allowed";

        // 2. 상태(Status)별 색상 스타일
        const statusStyles = status
            ? "bg-pink-50 border-primary-subtle text-primary-strong " // Active (핑크)
            : "bg-neutral-99 border-gray-300 text-label-default ";   // Inactive (회색)

        return (
            <button
                ref={ref}
                type="button"
                className={cn(base, statusStyles, className)}
                disabled={disabled}
                {...props}
            >
                <span>#{children}</span>

                {hasX && (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-3.5 h-3.5 opacity-60 hover:opacity-100"
                    >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                )}
            </button>
        );
    },
);

Tag2Btn.displayName = "Tag2Btn";