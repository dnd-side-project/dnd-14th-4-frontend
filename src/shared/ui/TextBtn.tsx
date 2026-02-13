import { IcSvgArrowRightSmall, IcSvgCloseSmall } from "../icons";

interface TextBtnProps {
    status?: 'black' | 'pink' | 'gray';
    arrow?: boolean;
    close?: boolean;
    onClick?: () => void;
    className?: string;
    children: React.ReactNode;
}

export default function TextBtn({
    status = 'black',
    arrow = false,
    close = false,
    onClick,
    className = '',
    children
}: TextBtnProps) {


    const base = "flex items-center type-label1";

    const statusStyles = {
        black: 'text-label-default',
        pink: 'text-primary-normal',
        gray: 'text-label-subtle',
    };

    return (
        <button
            type="button"
            onClick={onClick}
            className={`${base} ${statusStyles[status]} ${className}`}
        >
            {children}

            {arrow && <IcSvgArrowRightSmall className={`w-6 h-6 shrink-0 ${statusStyles[status]}`} />}
            {close && <IcSvgCloseSmall className={`w-6 h-6 shrink-0 ${statusStyles[status]}`} />}
        </button>
    );
}