'use client';

import Link from 'next/link';
import { IcSvgArrowRightBig } from '@/shared/icons';

interface NoticeItemProps {
    title: string;
    date: string;
    href?: string;
    onClick?: () => void;
    mode?: 'list' | 'detail';
}

export const NoticeItem = ({
    title,
    date,
    href,
    onClick,
    mode = 'list'
}: NoticeItemProps) => {

    const isList = mode === 'list';

    const content = (
        <div className={`flex items-center justify-between w-full py-4 border-b border-neutral-90 bg-white transition-colors ${isList ? 'cursor-pointer' : 'cursor-default'
            }`}>
            <div className="flex flex-col gap-2">
                <h4 className="type-label1 text-label-default">
                    {title}
                </h4>
                <span className="type-caption1 text-label-subtle">
                    {date}
                </span>
            </div>

            {isList && (
                <IcSvgArrowRightBig width={16} height={16} className='text-label-subtle' />
            )}
        </div>
    );

    if (mode === 'detail') {
        return <div className="w-full">{content}</div>;
    }

    if (href) {
        return (
            <Link href={href} className="block w-full">
                {content}
            </Link>
        );
    }

    return (
        <div className="w-full" onClick={onClick}>
            {content}
        </div>
    );
};