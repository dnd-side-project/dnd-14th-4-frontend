
'use client';

import React from 'react';

interface TabItemProps {
    isActive: boolean;
    onClick?: () => void;
    children: React.ReactNode;
}

export default function TabItem({ isActive, onClick, children }: TabItemProps) {
    return (
        <button
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={onClick}
            className={`
        flex-1 flex items-center justify-center 
        py-1 cursor-pointer transition-all duration-200
        ${isActive
                    ? 'text-common-100 font-bold'
                    : 'text-label-subtle font-medium'
                }
        ${isActive
                    ? 'border-b-[1.5px] border-common-100'
                    : 'border-b border-line-normal'
                }
      `}
        >
            <span className="type-headline2">
                {children}
            </span>
        </button>
    );
}