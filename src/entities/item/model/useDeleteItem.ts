import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/shared/api/apiClient";
import { appToast } from "@/shared/utils/toast";

const deleteItem = async (itemId: number | string) => {
    const { data } = await apiClient.delete(`/api/v1/items/${itemId}`);
    return data;
};

export function useDeleteItem() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (itemId: number | string) => deleteItem(itemId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["items"] });
            queryClient.refetchQueries({ queryKey: ["items"] });
            appToast.success("삭제되었습니다.");
        },
        onError: (error) => {
            console.error("아이템 삭제 실패:", error);
            appToast.error("삭제에 실패했습니다.");
        },
    });
}