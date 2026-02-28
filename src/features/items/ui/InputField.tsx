"use client";

import * as React from "react";
import { cn } from "@/shared/lib/cn";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder?: string;
}

export default function InputField({ placeholder = "입력하세요", className, value, onChange, ...props }: InputFieldProps) {
    return (
        <div className={cn("flex w-full type-body1 bg-secondary-lightbeige rounded-lg overflow-hidden", className)}>
            <input
                {...props}
                type="text"
                value={value}
                onChange={onChange}
                className="w-full text-center bg-transparent py-3 text-label-default dark:text-label-default focus:outline-none placeholder:text-neutral-500 dark:placeholder:text-neutral-500"
                placeholder={placeholder}
            />
        </div>
    );
}