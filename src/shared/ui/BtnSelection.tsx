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
        const base = "inline-flex items-center justify-center type-label1 transition-all duration-200 cursor-pointer disabled:pointer-events-none disabled:opacity-50";

        const sizeStyles: Record<SelectionSize, string> = {
            sm: "px-5 py-1.5 rounded-full",
            lg: "w-full py-[13px] rounded-lg",
        };

        const statusStyles = status
            ? "bg-neutral-10 text-common-0 font-bold" // Active
            : "bg-neutral-95 text-label-subtle hover:bg-neutral-90"; // Inactive

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