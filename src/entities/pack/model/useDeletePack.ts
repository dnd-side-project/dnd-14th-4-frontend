import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/apiClient";
import { appToast } from "@/shared/utils/toast";

const deletePack = async (packId: number | string) => {
    const { data } = await apiClient.delete(`/api/v1/packs/${packId}`);
    return data;
};

export function useDeletePack() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (packId: number | string) => deletePack(packId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["my-packs"] });
            queryClient.refetchQueries({ queryKey: ["my-packs"] });
            appToast.success("팩이 삭제되었습니다.");
        },
        onError: (error) => {
            console.error("팩 삭제 실패:", error);
            appToast.error("팩 삭제에 실패했습니다.");
        },
    });
}
