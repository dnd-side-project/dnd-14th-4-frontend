import React from 'react';

type TagVariant = 'primary' | 'secondary' | 'pressed' | 'disabled' | 'unpressed';
type TagMode = 'btn' | 'chip';

interface Tag1BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: TagVariant;
    mode?: TagMode;
    className?: string;
}

export default function Tag1Btn({
    children,
    variant = 'unpressed',
    mode = 'chip',
    className = '',
    disabled,
    ...props
}: Tag1BtnProps) {

    const baseStyle = "inline-flex items-center justify-center type-label1 rounded-full transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

    const paddingStyle = mode === 'btn' ? 'px-5 py-[7px]' : 'px-4 py-0.5';

    const variantStyles = {
        primary: "bg-neutral-10 text-white border border-transparent",
        pressed: "bg-primary-normal text-white border border-transparent",
        disabled: "bg-neutral-95 text-neutral-80 border border-transparent cursor-not-allowed",
        unpressed: "bg-white border border-label-subtler text-label-subtle",
        secondary: mode === 'btn'
            ? "border border-beige-30 bg-secondary-lightbeige text-beige-10"
            : "bg-beige-60 text-white border border-transparent",
    };

    return (
        <button
            type="button"
            disabled={disabled || variant === 'disabled'}
            className={`${baseStyle} ${paddingStyle} ${variantStyles[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}