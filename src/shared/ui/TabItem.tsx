
'use client';

import React from 'react';

interface TabItemProps {
    isActive: boolean;
    onClick?: () => void;
    children: React.ReactNode;
}
export default function TabItem({
    children,
    isActive,
    onClick,
  }: TabItemProps) {
    return (
      <button
        type="button"
        role="tab"
        aria-selected={isActive}
        onClick={onClick}
        className={[
          "w-full flex items-center justify-center type-headline2 pb-3 border-b-2 transition-colors",
          isActive ? "text-label-default border-black font-bold" : "text-label-subtle border-gray-200",
        ].join(" ")}
      >
        {children}
      </button>
    );
  }