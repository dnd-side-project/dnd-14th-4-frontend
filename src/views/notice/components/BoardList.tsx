
import { NoticeItem } from '@/views/notice/components/NoticeItem';

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
    return (
        <div className="max-w-md mx-auto min-h-screen bg-white">
            <div className="px-5">
                <h1>{type === 'notice' ? '공지사항' : '이용약관 및 정책'}</h1>
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
    );
};