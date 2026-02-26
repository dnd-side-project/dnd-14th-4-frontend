import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/apiClient";
import type { ItemAddRequestDTO, ItemAddResponse, ItemAddErrorResponse } from "../../../features/items/model/types";
import { AxiosError } from "axios";
import { appToast } from "@/shared/utils/toast";

export interface ItemSubmitParams {
    itemId?: number;
    request: ItemAddRequestDTO;
    reviewImages?: File[];
}

const submitItemApi = async ({ itemId, request, reviewImages }: ItemSubmitParams) => {
    if (reviewImages && reviewImages.length > 5) {
        throw new Error("리뷰 이미지는 최대 5개까지만 업로드 가능합니다.");
    }

    const formData = new FormData();

    formData.append(
        "request",
        new Blob([JSON.stringify(request)], { type: "application/json" }),
        "request.json"
    );

    if (reviewImages && reviewImages.length > 0) {
        reviewImages.forEach((file) => formData.append("reviewImages", file));
    }

    const isEdit = !!itemId;
    const url = isEdit ? `/api/v1/items/${itemId}` : "/api/v1/items/new";

    const response = await apiClient({
        method: isEdit ? "patch" : "post",
        url,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data as ItemAddResponse;
};

export const useItemSubmit = () => {
    const queryClient = useQueryClient();

    return useMutation<ItemAddResponse, AxiosError<ItemAddErrorResponse>, ItemSubmitParams>({
        mutationFn: submitItemApi,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["items"] });

            const message = variables.itemId ? "수정되었습니다." : "등록되었습니다.";
            appToast.success(message);
        },
        onError: (err, variables) => {
            const errorMessage = err.response?.data?.message
                || `아이템 ${variables.itemId ? '수정' : '등록'}에 실패했습니다.`;

            appToast.error(errorMessage);
            console.error("Submit Error:", err);
        },
    });
};