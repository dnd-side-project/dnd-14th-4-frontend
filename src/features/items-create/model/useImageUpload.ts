"use client";
import { useRef } from "react";

export const useImageUpload = (
    images: File[],
    onImagesChange: (images: File[]) => void
) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const openPicker = () => {
        if (images.length >= 5) {
            alert("이미지는 최대 5장까지 가능합니다.");
            return;
        }
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const newFiles = Array.from(files);
        const availableSlots = 5 - images.length;
        const filesToAdd = newFiles.slice(0, availableSlots);

        onImagesChange([...images, ...filesToAdd]);
        e.target.value = "";
    };

    const removeImage = (index: number) => {
        onImagesChange(images.filter((_, i) => i !== index));
    };

    return { fileInputRef, openPicker, handleFileChange, removeImage };
};