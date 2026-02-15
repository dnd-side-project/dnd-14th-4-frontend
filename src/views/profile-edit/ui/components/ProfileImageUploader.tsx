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
    const [previewUrl, setPreviewUrl] = useState<string | null>(
        typeof profileImage === 'string' ? profileImage : null
    );

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleEditClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewUrl(imageUrl);

            setProfileImage(file);
        }
    };

    useEffect(() => {
        return () => {
            if (previewUrl && previewUrl.startsWith('blob:')) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    return (
        <div className="flex justify-center mb-12">
            <div className="relative">
                <div className="w-[115px] h-[115px] bg-pink-40 rounded-full flex items-center justify-center text-white text-3xl font-bold overflow-hidden">
                    {previewUrl ? (
                        <Image
                            src={previewUrl}
                            width={115}
                            height={115}
                            alt="프로필 미리보기"
                            className="w-full h-full object-cover"
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