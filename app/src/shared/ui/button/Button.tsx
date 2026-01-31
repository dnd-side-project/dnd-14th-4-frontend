"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

type Variant = "filled" | "outlined" | "text";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  fullWidth?: boolean;
  variant?: Variant;
  isLoading?: boolean;
  wClass?: string;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      fullWidth = true,
      wClass,
      variant = "filled",
      isLoading,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const base =
      "inline-flex items-center justify-center h-14 px-4 rounded-2xl type-label1 " +
      "disabled:pointer-events-none disabled:cursor-not-allowed";

    const variants: Record<Variant, string> = {
      filled: cn(
        "bg-neutral-10 text-secondary-lightbeige",
        "hover:bg-neutral-20",
        "disabled:bg-neutral-95 disabled:text-neutral-80",
      ),

      /** border만 있는 버튼 */
      outlined: cn(
        "bg-transparent border border-label-subtle",
        "hover:bg-neutral-95",
        "disabled:border-neutral-80 disabled:text-neutral-80",
      ),

      /** 배경/보더 없는 버튼 */
      text: cn(
        "bg-transparent ",
        "hover:bg-neutral-95",
        "disabled:text-neutral-80",
      ),
    };

    return (
      <button
        ref={ref}
        className={cn(
          base,
          variants[variant],
          wClass ? wClass : fullWidth ? "w-full" : "w-auto",
          className,
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/40 border-t-black" />
            {children}
          </span>
        ) : (
          children
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
