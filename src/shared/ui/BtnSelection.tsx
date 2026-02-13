"use client";

import * as React from "react";
import { cn } from "../lib/cn";

type SelectionSize = "sm" | "lg";

export type BtnSelectionProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    size?: SelectionSize;
    selected?: boolean;
    fullWidth?: boolean;
  };

export const BtnSelection = React.forwardRef<
  HTMLButtonElement,
  BtnSelectionProps
>(
  (
    {
      className,
      size = "sm",
      selected = false,
      fullWidth,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const base =
      "inline-flex items-center justify-center transition-all duration-200 disabled:pointer-events-none disabled:opacity-50";

    const sizeStyles: Record<SelectionSize, string> = {
      sm: "px-5 h-10 rounded-full text-sm font-medium",
      lg: "h-12 rounded-xl px-4 text-base font-semibold",
    };

    const stateStyles = selected
      ? "bg-neutral-10 text-common-0"
      : "bg-neutral-95 text-label-subtle hover:bg-neutral-90";

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          base,
          sizeStyles[size],
          stateStyles,
          size === "lg" && fullWidth && "w-full",
          className,
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
