"use client";

import * as React from "react";
import { cn } from "../lib/cn";

type SelectionSize = "sm" | "lg";

export type BtnSelectionProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    size?: SelectionSize;
    status?: boolean;
    fullWidth?: boolean;
};

export const BtnSelection = React.forwardRef<HTMLButtonElement, BtnSelectionProps>(
    (
        {
            className,
            size = "sm",
            status = false,
            fullWidth,
            children,
            disabled,
            ...props
        },
        ref,
    ) => {
        // 1. 공통 베이스 스타일
        const base =
            "inline-flex items-center justify-center type-label1 transition-colors duration-200 cursor-pointer " +
            "disabled:pointer-events-none disabled:cursor-not-allowed";

        // 2. 사이즈별 스타일
        const sizeStyles: Record<SelectionSize, string> = {
            sm: "px-5 py-1.5 rounded-full",      // 캡슐 모양
            lg: "px-[55.5px] py-[13px] rounded-lg ",   // 둥근 사각형
        };

        // 3. 상태(Status)별 스타일 (색상 제어)
        const statusStyles = status
            ? "bg-neutral-10 text-common-0 hover:bg-neutral-800" // Active: 검정 배경 / 흰색 글씨
            : "bg-neutral-95 text-beige-30 hover:bg-neutral-80";   // Inactive: 회색 배경 / 회색 글씨

        return (
            <button
                ref={ref}
                type="button"
                className={cn(
                    base,
                    sizeStyles[size],
                    statusStyles,
                    fullWidth && "w-full",
                    className
                )}
                disabled={disabled}
                {...props}
            >
                {children}
            </button>
        );
    },
);

BtnSelection.displayName = "BtnSelection";