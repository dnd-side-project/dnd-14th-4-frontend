"use client";
import { useState, useRef } from 'react';

export const useImageUpload = () => {
    const [images, setImages] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const openPicker = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setImages((prev) => [...prev, ...Array.from(files)]);
        }
    };

    return {
        imageCount: images.length,
        openPicker,
        fileInputRef,
        handleFileChange,
    };
};