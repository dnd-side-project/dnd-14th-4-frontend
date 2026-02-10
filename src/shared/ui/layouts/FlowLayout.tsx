"use client";

import * as React from "react";
import { cn } from "@/shared/lib/cn";
import { ProgressBar } from "@/views/onboarding/ui/components/ProgressBar"; // 공용으로 옮기면 import 경로 바꾸기

type HeaderProps = {
  onBack?: () => void;
  progress?: number; 
  title?: React.ReactNode;
  description?: React.ReactNode;
};

type FooterProps =
  | {
      ctaLabel: string;
      onCta: () => void;
      ctaDisabled?: boolean;
    }
  | undefined;

type Props = {
  header?: HeaderProps;
  footer?: FooterProps;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
};

export function FlowLayout({
  header,
  footer,
  children,
  className,
  contentClassName,
}: Props) {
  return (
    <main className={cn("min-h-dvh bg-white flex flex-col", className)}>
      {header && <FlowHeader {...header} />}

      <section
        className={cn(
          "flex-1 px-5 pt-8",
          footer ? "pb-28" : "pb-8",
          contentClassName,
        )}
      >
        {children}
      </section>

      {footer && (
        <FlowFooter
          label={footer.ctaLabel}
          disabled={footer.ctaDisabled}
          onClick={footer.onCta}
        />
      )}
    </main>
  );
}

function FlowHeader({ onBack, progress, title, description }: HeaderProps) {
  const showTopRow = !!onBack || typeof progress === "number";
  const showText = !!title || !!description;

  return (
    <header className="px-5 pt-5">
      {showTopRow && (
        <div className="flex items-center gap-3">
          <BackButton onBack={onBack} />
          {typeof progress === "number" && (
            <div className="flex-1">
              <ProgressBar value={progress} />
            </div>
          )}
        </div>
      )}

      {showText && (
        <div className={cn("space-y-2", showTopRow ? "mt-6" : "")}>
          {title && <h1 className="text-xl font-bold leading-snug">{title}</h1>}
          {description && (
            <p className="text-sm text-neutral-500">{description}</p>
          )}
        </div>
      )}
    </header>
  );
}

function BackButton({ onBack }: { onBack?: () => void }) {
  if (!onBack) return null;
  return (
    <button
      type="button"
      onClick={onBack}
      className="p-2 -ml-2"
      aria-label="뒤로가기"
    >
      ←
    </button>
  );
}

function FlowFooter({
  label,
  disabled,
  onClick,
}: {
  label: string;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white px-5 pt-3 pb-[calc(20px+env(safe-area-inset-bottom))]">
      <button
        type="button"
        disabled={disabled}
        onClick={onClick}
        className={cn(
          "h-12 w-full rounded-xl font-semibold",
          disabled ? "bg-neutral-200 text-neutral-500" : "bg-black text-white",
        )}
      >
        {label}
      </button>
    </footer>
  );
}
