'use client';

import { useState } from 'react';

export const useProfileEdit = () => {
    const [profileImage, setProfileImage] = useState<File | string | null>(null);
    const [selectedAge, setSelectedAge] = useState('30대');
    const [selectedGender, setSelectedGender] = useState('여성');
    const [nickname, setNickname] = useState('');

    const handleSubmit = async () => {
        //  API 연동 로직
        const payload = {
            profileImage,
            nickname,
            age: selectedAge,
            gender: selectedGender,
        };
        console.log('제출 데이터:', payload);
    };

    return {
        selectedAge,
        setSelectedAge,
        selectedGender,
        setSelectedGender,
        nickname,
        setNickname,
        profileImage,
        setProfileImage,
        handleSubmit,
    };
};