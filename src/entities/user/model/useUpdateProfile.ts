import apiClient from "@/shared/api/apiClient";
import { GENDER_MAP, AGE_MAP } from '@/shared/utils/profile.utils';

export const useUpdateProfile = () => {
    const updateProfile = async (data: {
        name: string;
        selectedAge: string;
        selectedGender: string;
        profileImage: File | string | null;
    }) => {
        const formData = new FormData();

        const requestData = {
            nickname: data.name,
            ageGroup: AGE_MAP[data.selectedAge as keyof typeof AGE_MAP] || data.selectedAge,
            gender: GENDER_MAP[data.selectedGender as keyof typeof GENDER_MAP] || data.selectedGender,
        };

        const jsonBlob = new Blob([JSON.stringify(requestData)], {
            type: 'application/json',
        });
        formData.append('request', jsonBlob, 'request.json');

        if (data.profileImage instanceof File) {
            formData.append('profileImage', data.profileImage);
        }

        const response = await apiClient.patch('/api/v1/users/profile/basic', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    };

    return { updateProfile };
};