import { BoardList } from '@/views/notice/components/BoardList';
import { NOTICES } from '@/features/search/model/mock';

export const NoticePage = () => {
    return <BoardList items={NOTICES} type="notice" />;
};