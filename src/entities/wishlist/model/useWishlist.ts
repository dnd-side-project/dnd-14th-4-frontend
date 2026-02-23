import { useQuery } from '@tanstack/react-query';
import apiClient from '@/shared/api/apiClient';
import { Item } from '@/entities/item/model/types';

export const useWishlist = () => {
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['wishlist'],
        queryFn: async () => {
            const { data } = await apiClient.get<Item[]>('/api/v1/wishlist/items');
            return data;
        },
    });

    return {
        data,
        isLoading,
        isError,
        refetch,
    };
};