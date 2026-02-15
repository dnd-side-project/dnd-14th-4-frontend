import { BoardList } from '@/views/notice/components/BoardList';
import { NOTICES } from '@/features/search/model/mock';

export const PoliciesPage = () => {
    return <BoardList items={NOTICES} type="policies" />;
};