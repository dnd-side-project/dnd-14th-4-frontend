'use client';

import { useState } from 'react';
import { User } from '@/entities/user/model';
import { REVERSE_GENDER_MAP, REVERSE_AGE_MAP } from '@/shared/utils/profile.utils';
import { useUpdateProfile } from '@/entities/user/model/useUpdateProfile';
import { useRouter } from 'next/navigation';

export const useProfileEdit = (user: User) => {
    const router = useRouter();
    const { updateProfile } = useUpdateProfile();

    const [profileImage, setProfileImage] = useState<File | string | null>(user.profileImageUrl || null);
    const [name, setName] = useState(user.name || '');
    const [selectedAge, setSelectedAge] = useState(
        (user.age && REVERSE_AGE_MAP[user.age]) || ''
    );
    const [selectedGender, setSelectedGender] = useState(
        (user.gender && REVERSE_GENDER_MAP[user.gender]) || ''
    );

    const handleSubmit = async () => {
        try {
            await updateProfile({ name, selectedAge, selectedGender, profileImage });
            alert('수정되었습니다.');
            router.back();
        } catch (e) {
            alert('수정에 실패했습니다.' + e);
        }
    };

    return {
        profileImage, setProfileImage,
        name, setName,
        selectedAge, setSelectedAge,
        selectedGender, setSelectedGender,
        handleSubmit,
    };
};