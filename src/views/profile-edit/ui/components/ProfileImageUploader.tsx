'use client';

import { useRef, useState, useEffect } from 'react';
import { IcSvgEdit } from '@/shared/icons';
import Image from 'next/image';

export const ProfileImageUploader = ({
    profileImage,
    setProfileImage,
}: {
    profileImage: File | string | null;
    setProfileImage: (file: File | null) => void;
}) => {
    const [localPreview, setLocalPreview] = useState<string | null>(null);
    const currentPreviewUrl = localPreview ?? (typeof profileImage === 'string' ? profileImage : null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleEditClick = () => {
        fileInputRef.current?.click();
    };

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
                <div className="w-[115px] h-[115px] bg-pink-40 rounded-full flex items-center justify-center text-white text-3xl font-bold overflow-hidden">
                    {currentPreviewUrl ? (
                        <Image
                            src={currentPreviewUrl}
                            width={115}
                            height={115}
                            alt="프로필 미리보기"
                            className="w-full h-full object-cover"
                            unoptimized={currentPreviewUrl.startsWith('blob:')} // blob URL일 경우 최적화 제외
                        />
                    ) : (
                        "닉"
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
                    onClick={handleEditClick}
                    className="absolute bottom-0 -right-3 w-[48px] h-[48px] bg-neutral-95 rounded-full flex items-center justify-center border-2 border-white shadow-sm hover:bg-neutral-90"
                >
                    <IcSvgEdit width={24} height={24} />
                </button>
            </div>
        </div>
    );
};