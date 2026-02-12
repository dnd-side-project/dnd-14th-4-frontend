import { IcSvgArrowRightSmall, IcSvgCloseSmall } from "../icons";

interface MoreButtonProps {
    status: 'black' | 'pink' | 'gray';
    arrow?: boolean;
    close?: boolean;
    onClick?: () => void;
    className?: string;
}

export default function MoreButton({
    status = 'black',
    arrow = false,
    close = false,
    onClick,
    className = ''
}: MoreButtonProps) {


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
            <span className="whitespace-nowrap">더보기</span>

            {arrow && <IcSvgArrowRightSmall className={`w-6 h-6 shrink-0 ${statusStyles[status]}`} />}
            {close && <IcSvgCloseSmall className={`w-6 h-6 shrink-0 ${statusStyles[status]}`} />}
        </button>
    );
}