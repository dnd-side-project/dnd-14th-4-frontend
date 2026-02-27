"use client";

import { useState } from "react";
import { AxiosError } from "axios";
import { apiClient } from "@/shared/api/apiClient";

export interface CreatePackRequestDTO {
  title: string;
  contextCategory: string;
  review?: string;
  items: number[];
}

export interface CreatePackResponseDTO {
  id: number;
  name: string;
}

type CreatePackErrorResponse = {
  message?: string;
};

export const useCreatePack = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPack = async (request: CreatePackRequestDTO) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await apiClient.post<CreatePackResponseDTO>(
        "/api/v1/pack-create",
        request
      );
      return data;
    } catch (err) {
      const axiosError = err as AxiosError<CreatePackErrorResponse>;
      const message =
        axiosError.response?.data?.message ?? "팩 생성에 실패했습니다.";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { createPack, isLoading, error };
};
