"use client";
import { useState, useRef } from 'react';

// maxCount를 인자로 받도록 수정 
export const useImageUpload = (maxCount: number = 5) => {
    const [images, setImages] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const openPicker = () => {
        if (images.length >= maxCount) {
            alert(`이미지는 최대 ${maxCount}장까지 업로드 가능합니다.`);
            return;
        }
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const remainingSlots = maxCount - images.length;

        if (remainingSlots <= 0) {
            e.target.value = '';
            return;
        }

        const newFiles = Array.from(files);
        const filesToAdd = newFiles.slice(0, remainingSlots);

        if (newFiles.length > remainingSlots) {
            alert(`최대 ${maxCount}장까지만 등록됩니다.`);
        }

        setImages((prev) => [...prev, ...filesToAdd]);

        e.target.value = '';
    };
    const handleRemoveImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    return {
        images,
        imageCount: images.length,
        maxCount, // UI 표시용
        openPicker,
        fileInputRef,
        handleFileChange,
        handleRemoveImage,
    };
};