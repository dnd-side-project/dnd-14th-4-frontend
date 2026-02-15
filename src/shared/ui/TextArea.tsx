"use client";

import * as React from "react";
import { cn } from "@/shared/lib/cn";
import { mergeRefs } from "../lib/mergeRefs";

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    variant?: "sm" | "lg";
    helperText?: string;
    isError?: boolean;
    showCount?: boolean;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
    (
        {
            className,
            variant = "lg",
            helperText,
            isError,
            placeholder,
            value,
            onChange,
            readOnly,
            maxLength,
            showCount = false,
            ...props
        },
        externalRef
    ) => {
        const localRef = React.useRef<HTMLTextAreaElement>(null);

        const hasContent = value !== undefined && String(value).length > 0;

        const containerStyle = cn(
            "w-full rounded-[8px] px-4 py-4 transition-colors duration-200 flex flex-col border cursor-text",
            isError
                ? "bg-common-0 border-red-500"
                : hasContent
                    ? "bg-common-0 border-primary-normal"
                    : "bg-secondary-lightbeige border-transparent focus-within:bg-common-0 focus-within:border-primary-normal",
            variant === "lg" ? "min-h-[120px]" : "min-h-[80px]",
            readOnly && "opacity-80 cursor-not-allowed",
            className
        );

        const baseInputStyle = "bg-transparent outline-none text-[15px] leading-relaxed placeholder:text-neutral-400 flex-1 min-w-full resize-none";

        const handleContainerClick = () => {
            localRef.current?.focus();
        };

        return (
            <div className="flex flex-col w-full">
                <div className={containerStyle} onClick={handleContainerClick}>
                    <textarea
                        {...props}
                        ref={mergeRefs(localRef, externalRef)}
                        readOnly={readOnly}
                        value={value}
                        onChange={onChange}
                        maxLength={maxLength}
                        className={baseInputStyle}
                        placeholder={placeholder}
                    />

                </div>

                {helperText && (
                    <p className={cn(
                        "text-[13px] px-1 mt-2 font-medium",
                        isError ? "text-red-500" : "text-neutral-400"
                    )}>
                        {helperText}
                    </p>
                )}
                {showCount && maxLength && (
                    <div className="type-label2 text-label-subtle mt-2  self-end">
                        <span className="text-label-subtler">{String(value || "").length}</span>/{maxLength}자
                    </div>
                )}
            </div>
        );
    }
);

TextArea.displayName = "TextArea";