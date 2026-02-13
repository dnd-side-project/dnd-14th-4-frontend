'use client';

import React from 'react';
import {
    IcSvgAddBig,
    IcSvgCloseBig,
    IcSvgFolder,
    IcSvgItem
} from '@/shared/icons';

type IconButtonVariant = 'plus' | 'close' | 'pack' | 'item';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant: IconButtonVariant;
    iconSize?: string;
    className?: string;
}

export default function IconButton({
    variant,
    iconSize,
    className = '',
    onClick,
    ...props
}: IconButtonProps) {

    const config = {
        plus: {
            icon: IcSvgAddBig,
            style: "bg-pink-50 text-white  w-[84px] h-[84px]",
            defaultIconSize: "w-[60px] h-[60px]",
            ariaLabel: "추가하기"
        },
        close: {
            icon: IcSvgCloseBig,
            style: "bg-pink-50 text-white  w-[84px] h-[84px]",
            defaultIconSize: "w-[60px] h-[60px]",
            ariaLabel: "닫기"
        },
        pack: {
            icon: IcSvgFolder,
            style: "bg-neutral-10 text-white  w-[70px] h-[70px]",
            defaultIconSize: "w-10 h-10",
            ariaLabel: "폴더 보기"
        },
        item: {
            icon: IcSvgItem,
            style: "bg-neutral-10 text-white  w-[70px] h-[70px]",
            defaultIconSize: "w-10 h-10",
            ariaLabel: "아이템 보기"
        }
    };



    const { icon: Icon, style, defaultIconSize, ariaLabel } = config[variant];

    return (
        <button
            type="button"
            aria-label={ariaLabel}
            onClick={onClick}
            className={`
                flex items-center justify-center 
                rounded-full 
                shadow-strong
                ${style} 
                ${className}
            `}
            {...props}
        >
            <Icon
                className={`shrink-0 fill-current ${iconSize || defaultIconSize}`}
            />
        </button>
    );
}