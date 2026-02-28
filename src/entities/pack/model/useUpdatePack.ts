import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/apiClient";
import { appToast } from "@/shared/utils/toast";

export interface UpdatePackRequest {
    introduction?: string;
    addItems?: number[];
    removeItems?: number[];
}

const updatePack = async (packId: number, payload: UpdatePackRequest) => {
    const { data } = await apiClient.patch(`/api/v1/packs/${packId}`, payload);
    return data;
};

export function useUpdatePack(packId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: UpdatePackRequest) => updatePack(packId, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["pack", "detail", packId] });
            queryClient.invalidateQueries({ queryKey: ["my-packs"] });
            queryClient.refetchQueries({ queryKey: ["my-packs"] });
            appToast.success("팩이 성공적으로 수정되었습니다.");
        },
        onError: (error) => {
            console.error("팩 수정 실패:", error);
            appToast.error("팩 수정에 실패했습니다.");
        },
    });
}
