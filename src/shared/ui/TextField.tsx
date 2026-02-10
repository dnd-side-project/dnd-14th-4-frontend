"use client";

import * as React from "react";
import { cn } from "@/shared/lib/cn";

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    variant?: "sm" | "lg";
    helperText?: string;
    isError?: boolean;
    children?: React.ReactNode;
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
    (
        {
            className,
            variant = "lg",
            helperText,
            isError,
            placeholder,
            children,
            value,
            onChange,
            readOnly,
            ...props
        },
        ref
    ) => {
        // 1. 내부 ref와 외부 ref 통합
        const inputRef = React.useRef<HTMLInputElement>(null);
        React.useImperativeHandle(ref, () => inputRef.current!);

        // 2. 내용 유무 판단
        const hasContent =
            (value !== undefined && String(value).length > 0) ||
            (children !== undefined && React.Children.count(children) > 0);

        // 3. 스타일 정의
        const containerStyle = cn(
            "w-full rounded-lg px-3 py-2 transition-colors duration-200 flex border cursor-text",
            isError
                ? "bg-common-0 border-red-500"
                : hasContent
                    ? "bg-common-0 border-primary-normal"
                    : "bg-secondary-lightbeige border-transparent focus-within:bg-common-0 focus-within:border-primary-normal",
            variant === "lg"
                ? "min-h-[100px] h-auto flex-wrap gap-2 content-start items-center"
                : "h-12 items-center",
            readOnly && "opacity-80 cursor-not-allowed",
            className
        );

        const baseInputStyle = "bg-transparent outline-none text-type-label1 placeholder:text-label-subtle flex-1 min-w-[120px]";

        const handleContainerClick = () => {
            inputRef.current?.focus();
        };

        return (
            <div className="flex flex-col gap-[9px] w-full">
                <div className={containerStyle} onClick={handleContainerClick}>
                    {children}

                    <input
                        {...props}
                        ref={inputRef}
                        readOnly={readOnly}
                        value={value}
                        onChange={onChange}
                        className={cn(
                            baseInputStyle,
                            variant === "sm" && "w-full border-none"
                        )}
                        placeholder={React.Children.count(children) > 0 ? "" : placeholder}
                    />
                </div>

                {helperText && (
                    <p
                        className={cn(
                            "type-label2 px-1 font-medium",
                            isError ? "text-red-500" : "text-label-subtler"
                        )}
                    >
                        {helperText}
                    </p>
                )}
            </div>
        );
    }
);

TextField.displayName = "TextField";