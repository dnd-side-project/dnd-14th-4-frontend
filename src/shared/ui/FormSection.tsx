import * as React from "react";
import { cn } from "@/shared/lib/cn";

interface Props {
    title: string;
    isOptional?: boolean;
    children: React.ReactNode;
    className?: string;
}

export const FormSection = ({ title, isOptional, children, className }: Props) => {
    return (
        <section className={cn("flex flex-col gap-3", className)}>
            <h3 className="type-label1 text-label-subtle">
                {title}
                {isOptional && (
                    <span className="text-gray-400 font-normal ml-1">(선택)</span>
                )}
            </h3>
            {children}
        </section>
    );
};