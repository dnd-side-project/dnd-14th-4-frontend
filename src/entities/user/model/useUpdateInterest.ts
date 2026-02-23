import apiClient from "@/shared/api/apiClient";
import { MOMENT_MAP } from "@/shared/utils/interest.utils";

export const useUpdateInterest = () => {
    const updateInterest = async (selectedNames: string[]) => {
        const contextCategoryIds = selectedNames.map(name => MOMENT_MAP[name]);

        const response = await apiClient.patch('/api/v1/users/profile/preference', {
            contextCategoryIds
        });

        return response.data;
    };

    return { updateInterest };
};