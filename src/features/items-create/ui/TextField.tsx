"use client";

import * as React from "react";
import { cn } from "@/shared/lib/cn";

type TextFieldSize = "sm" | "lg";

// Input과 Textarea 속성을 모두 수용하기 위한 타입 정의
export interface TextFieldProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
    variant?: TextFieldSize;
    helperText?: string;
    children?: React.ReactNode;
    value?: string | number | readonly string[];
    onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

export const TextField = React.forwardRef<
    HTMLInputElement | HTMLTextAreaElement,
    TextFieldProps
>(
    (
        {
            className,
            variant = "lg",
            helperText,
            placeholder,
            children,
            value,
            onChange,
            ...props
        },
        ref
    ) => {
        // 1. 상태 판단
        const hasContent =
            (value && String(value).length > 0) ||
            (children && React.Children.count(children) > 0);

        // 2. 스타일 정의
        const containerStyle = cn(
            "w-full rounded-lg px-3 py-3 transition-colors duration-200 text-type-label1 flex border cursor-text",

            // 색상 로직
            hasContent
                ? "bg-common-0 border-primary-normal"
                : "bg-secondary-lightbeige border-transparent focus-within:bg-common-0 focus-within:border-primary-normal",

            // 사이즈 로직
            variant === "lg"
                ? "min-h-[100px] h-auto flex-wrap gap-2 content-start items-start" // lg: 넉넉한 높이, 위쪽 정렬
                : "h-12 items-center", // sm: 한 줄 높이

            className
        );

        // [B] 입력창 공통 스타일
        const baseInputStyle =
            "bg-transparent outline-none text-type-label1 placeholder:text-label-subtle";

        return (
            <div className="flex flex-col gap-2 w-full">
                {/* Label 태그: 클릭 시 내부 입력창 포커스 */}
                <label className={containerStyle}>
                    {variant === "lg" ? (
                        // [LG 모드]: Textarea (스크롤 발생)
                        <>
                            {children}
                            <textarea
                                // 타입 단언: Textarea Ref
                                ref={ref as React.Ref<HTMLTextAreaElement>}
                                className={cn(
                                    baseInputStyle,
                                    "flex-1 min-w-[120px] resize-none leading-relaxed",
                                    "h-full min-h-[80px] overflow-y-auto custom-scrollbar" // 높이 고정, 넘치면 스크롤
                                )}
                                placeholder={children ? "" : placeholder}
                                value={value}
                                onChange={onChange as React.ChangeEventHandler<HTMLTextAreaElement>}
                                // 타입 단언: Textarea Props
                                {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
                            />
                        </>
                    ) : (
                        // [SM 모드]: Input (한 줄)
                        <input

                            ref={ref as React.Ref<HTMLInputElement>}
                            className={cn(baseInputStyle, "w-full border-none")}
                            placeholder={placeholder}
                            value={value}
                            onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
                            {...props}
                        />
                    )}
                </label>

                {helperText && (
                    <p className="text-label-subtler type-label2 px-1">
                        {helperText}
                    </p>
                )}
            </div>
        );
    }
);

TextField.displayName = "TextField";