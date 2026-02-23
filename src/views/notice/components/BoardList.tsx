"use client"

import { BackHeader } from '@/shared/ui/BackHeader';
import { NoticeItem } from '@/views/notice/components/NoticeItem';
import { useRouter } from 'next/navigation';

interface BoardItemType {
    id: number | string;
    title: string;
    date: string;
}

interface BoardListProps {
    items: BoardItemType[];
    type: 'notice' | 'policies';
}

export const BoardList = ({ items, type }: BoardListProps) => {
    const router = useRouter();
    return (
        <div className='min-h-screen'>
            <BackHeader onBack={() => router.back()}></BackHeader>
            <div className="max-w-md mx-auto bg-white">
                <div className="px-5">
                    <h1 className='sr-only'>{type === 'notice' ? '공지사항' : '이용약관 및 정책'}</h1>
                    {items.map((item) => (
                        <NoticeItem
                            key={item.id}
                            title={item.title}
                            date={item.date}
                            href={`/my-page/notice/${item.id}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};