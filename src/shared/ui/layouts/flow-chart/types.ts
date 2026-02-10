// src/shared/ui/layouts/flow-layout/types.ts
import type * as React from "react";

export type FlowHeaderProps = {
  onBack?: () => void;
  /** ProgressBar 같은 걸 주입하기 위한 슬롯 (없으면 안 그림) */
  progressSlot?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
};

export type FlowContentProps = {
  children: React.ReactNode;
  className?: string;
  /** footer가 있을 때 content 하단 padding 확보 */
  hasFooter?: boolean;
};

export type FlowFooterProps = {
  label: string;
  disabled?: boolean;
  onClick: () => void;
  className?: string;
  aboveSlot?: React.ReactNode;
};
