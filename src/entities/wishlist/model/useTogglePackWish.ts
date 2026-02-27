import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/shared/api/apiClient";

interface ToggleWishParams {
    packId: number;
    isWished: boolean;
}

const togglePackWishlistAPI = async ({ packId, isWished }: ToggleWishParams) => {
    if (isWished) {
        const { data } = await apiClient.delete(`/api/v1/packs/${packId}/wishlist`);
        return data;
    } else {
        const { data } = await apiClient.post(`/api/v1/packs/${packId}/wishlist`);
        return data;
    }
};

export const useTogglePackWish = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: togglePackWishlistAPI,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["packs"] });
            queryClient.invalidateQueries({ queryKey: ["pack-wishlist"] });
        },
        onError: (error) => {
            console.error("팩 위시리스트 변경 에러:", error);
            alert("로그인이 필요하거나 처리에 실패했습니다.");
        }
    });
};