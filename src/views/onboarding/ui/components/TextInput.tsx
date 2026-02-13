"use client";

import { cn } from "@/shared/lib/cn";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  isError?: boolean;
  footerLeft?: React.ReactNode;
  footerRight?: React.ReactNode;
};

export function TextInput({
  className,
  isError,
  footerLeft,
  footerRight,
  ...props
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <input
        {...props}
        className={cn(
          "px-2 h-12 w-full bg-transparent outline-none text-base",
          "border-b border-black",
          className,
        )}
      />
      {(footerLeft || footerRight) && (
        <div className="flex items-center justify-between px-1 text-xs">
          <div className={cn(isError ? "text-red-500" : "text-neutral-400")}>
            {footerLeft}
          </div>
          <div className="text-neutral-400">{footerRight}</div>
        </div>
      )}
    </div>
  );
}
