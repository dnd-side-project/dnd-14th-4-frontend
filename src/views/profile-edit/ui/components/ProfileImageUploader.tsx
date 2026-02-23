'use client';

import { useRef, useState, useEffect } from 'react';
import { IcSvgEdit } from '@/shared/icons';
import Image from 'next/image';
import { useUserStore } from '@/entities/user/model';
import { PROFILE_COLOR_CLASS } from '@/views/my-page/ui/MyPage';

type ProfileImageType = File | string | null;

export const ProfileImageUploader = ({
    profileImage,
    setProfileImage,
}: {
    profileImage: ProfileImageType;
    setProfileImage: (val: ProfileImageType) => void;
}) => {
    const { user } = useUserStore();

    const profileColor = user?.profileImageUrl;
    const bgColorClass = (profileColor && PROFILE_COLOR_CLASS[profileColor]) || 'bg-pink-40';
    const initialChar = user?.name?.charAt(0) || user?.name?.charAt(0) || '?';
    const [localPreview, setLocalPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const isValidUrl = (url: ProfileImageType): url is string => {
        if (typeof url !== 'string') return false;
        return (
            url.startsWith('http') ||
            url.startsWith('/') ||
            url.startsWith('blob:') ||
            url.startsWith('data:')
        );
    };

    const currentPreviewUrl = localPreview || (isValidUrl(profileImage) ? profileImage : null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (localPreview) URL.revokeObjectURL(localPreview);

            const imageUrl = URL.createObjectURL(file);
            setLocalPreview(imageUrl);
            setProfileImage(file);
        }
    };

    useEffect(() => {
        return () => {
            if (localPreview) URL.revokeObjectURL(localPreview);
        };
    }, [localPreview]);


    return (
        <div className="flex justify-center mb-12">
            <div className="relative">
                <div className={`w-[115px] h-[115px] ${bgColorClass} rounded-full flex items-center justify-center text-white text-3xl font-bold overflow-hidden`}>
                    {currentPreviewUrl ? (
                        <Image
                            src={currentPreviewUrl}
                            width={115}
                            height={115}
                            alt="미리보기"
                            className="w-full h-full object-cover"
                            unoptimized={currentPreviewUrl.startsWith('blob:')}
                        />
                    ) : (
                        initialChar
                    )}
                </div>

                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                />

                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 -right-3 w-[48px] h-[48px] bg-neutral-95 rounded-full flex items-center justify-center border-2 border-white shadow-sm"
                >
                    <IcSvgEdit width={24} height={24} />
                </button>
            </div>
        </div>
    );
};