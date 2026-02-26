import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/shared/api/apiClient";

const toggleWishlistAPI = async ({ itemId, isWished }: { itemId: number; isWished: boolean }) => {
    if (isWished) {
        const { data } = await apiClient.delete(`/api/v1/items/${itemId}/wishlist`);
        return data;
    } else {
        const { data } = await apiClient.post(`/api/v1/items/${itemId}/wishlist`);
        return data;
    }
};

export const useToggleWish = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: toggleWishlistAPI,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["items"] });
            queryClient.invalidateQueries({ queryKey: ["wishlist"] });
        },
        onError: (error) => {
            console.error("위시리스트 변경 에러:", error);
            alert("위시리스트 처리에 실패했습니다.");
        }
    });
};