import { useState } from "react";
import { apiClient } from "@/shared/api/apiClient";
import type { ItemAddRequestDTO, ItemAddResponse, ItemAddErrorResponse } from "../../../features/items/model/types";
import { AxiosError } from "axios";

export interface ItemSubmitParams {
    itemId?: number;
    request: ItemAddRequestDTO;
    reviewImages?: File[];
}

export const useItemSubmit = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submitItem = async ({ itemId, request, reviewImages }: ItemSubmitParams) => {
        setIsLoading(true);
        setError(null);

        if (reviewImages && reviewImages.length > 5) {
            const msg = "리뷰 이미지는 최대 5개까지만 업로드 가능합니다.";
            setError(msg);
            setIsLoading(false);
            throw new Error(msg);
        }

        try {
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
            const method = isEdit ? "patch" : "post";



            const { data } = await apiClient[method]<ItemAddResponse>(
                url,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            return data;
        } catch (err) {
            const axiosError = err as AxiosError<ItemAddErrorResponse>;
            const errorMessage = axiosError.response?.data?.message
                || `아이템 ${itemId ? '수정' : '추가'}에 실패했습니다.`;

            setError(errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return { submitItem, isLoading, error };
};