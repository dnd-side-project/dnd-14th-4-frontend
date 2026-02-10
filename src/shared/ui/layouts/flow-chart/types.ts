import type * as React from "react";

export type FlowHeaderProps = {
  onBack?: () => void;
  progressSlot?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
};

export type FlowContentProps = {
  children: React.ReactNode;
  className?: string;
  hasFooter?: boolean;
};

export type FlowFooterProps = {
  label: string;
  disabled?: boolean;
  onClick: () => void;
  className?: string;
  aboveSlot?: React.ReactNode;
};
