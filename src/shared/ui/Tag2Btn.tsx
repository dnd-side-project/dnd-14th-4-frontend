"use client";

import * as React from "react";
import { cn } from "../lib/cn";

export type Tag2BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    status?: boolean;
    hasX?: boolean;
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
        const base =
            "inline-flex items-center justify-center type-label1 px-4 py-1.5 rounded-full border border-[1.5px] transition-colors duration-200 cursor-pointer gap-1.5 " +
            "disabled:opacity-50 disabled:cursor-not-allowed";

        const statusStyles = status
            ? "bg-pink-50 border-primary-subtle text-primary-strong " // Active 
            : "bg-neutral-99 border-gray-300 text-label-default ";   // Inactive 

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
                    // 임시
                    <p>x</p>
                )}
            </button>
        );
    },
);

Tag2Btn.displayName = "Tag2Btn";