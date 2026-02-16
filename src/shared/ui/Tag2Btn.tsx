"use client";

import * as React from "react";
import { cn } from "../lib/cn";
import { IcSvgCloseSmall } from "../icons";

export type Tag2BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    status?: boolean;
    hasX?: boolean;
    mode?: "btn" | "chip";
};

export const Tag2Btn = React.forwardRef<HTMLButtonElement, Tag2BtnProps>(
    (
        {
            className,
            status = false,
            hasX = false,
            mode = "chip",
            children,
            disabled,
            ...props
        },
        ref,
    ) => {
        const base =
            "inline-flex items-center justify-center type-label1 px-4 rounded-full transition-colors duration-200 cursor-pointer " +
            "disabled:opacity-50 disabled:cursor-not-allowed";

        let statusStyles = "";

        if (mode === "chip") {
            statusStyles = status
                ? "bg-pink-95 text-primary-normal"
                : "bg-neutral-99 border border-[1.5px] border-gray-300 text-label-default";
        } else if (mode === "btn") {
            statusStyles = status
                ? "bg-pink-95 text-primary-normal"
                : "bg-neutral-95 text-label-default";
        }

        const modeStyles = mode === "btn" ? "py-[7px]" : "";

        return (
            <button
                ref={ref}
                type="button"
                className={cn(base, statusStyles, modeStyles, className)}
                disabled={disabled}
                {...props}
            >
                <span>
                    {mode === "btn" && "#"}
                    {children}
                </span>

                {hasX && (
                    <IcSvgCloseSmall className="w-6 h-6 shrink-0" />
                )}
            </button>
        );
    },
);

Tag2Btn.displayName = "Tag2Btn";