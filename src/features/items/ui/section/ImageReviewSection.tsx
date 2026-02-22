"use client";

import { TextField } from "@/shared/ui/TextField";
import { Tag2Btn } from "@/shared/ui/Tag2Btn";
import { ImageUploadBox } from "../ImageUploadBox";
import { useImageUpload } from "../../model/useImageUpload";
import { useTagInput } from "../../model/useTagInput";
import Image from "next/image";

interface ImageReviewSectionProps {
    images: (File | string)[];
    onImagesChange: (files: File[]) => void;
    tags: string[];
    onTagsChange: (tags: string[]) => void;
}

export function ImageReviewSection({ images, onImagesChange, tags, onTagsChange }: ImageReviewSectionProps) {
    const { fileInputRef, openPicker, handleFileChange, removeImage } = useImageUpload(images as File[], onImagesChange);
    const { inputValue, onKeyDown, removeTag, isError, errorMessage, setInputValue } = useTagInput(tags, onTagsChange);

    const currentHelperText = isError ? errorMessage : "*태그 당 최대 10자";

    return (
        <div className="flex flex-col gap-6">
            <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                multiple
            />

            <div className="flex gap-4 overflow-x-auto">
                <div className="flex-shrink-0">
                    <ImageUploadBox
                        count={images.length}
                        maxCount={5}
                        onClick={openPicker}
                    />
                </div>
                {images.map((img: File | string, index: number) => {
                    const imgSrc = typeof img === "string" ? img : URL.createObjectURL(img);

                    return (
                        <div key={index} className="relative flex-shrink-0 w-[100px] h-[100px]">
                            <Image
                                src={imgSrc}
                                alt="preview"
                                fill
                                className="object-cover rounded-lg"
                                onLoad={() => {
                                    // File 객체로 만든 URL만 메모리 해제
                                    if (typeof img !== "string") URL.revokeObjectURL(imgSrc);
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute z-10 -top-2 -right-2 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                            >
                                ✕
                            </button>
                        </div>
                    );
                })}
            </div>

            <TextField
                variant="lg"
                isError={isError}
                placeholder={tags.length === 0 ? "#태그 입력 (최대 5개)" : ""}
                helperText={currentHelperText}
                value={inputValue}
                onChange={(e) => setInputValue(e.currentTarget.value)}
                onKeyDown={onKeyDown}
            >
                {tags.map((tag, index) => (
                    <Tag2Btn
                        key={tag}
                        status
                        hasX
                        onClick={(e) => {
                            e.stopPropagation();
                            removeTag(index);
                        }}
                    >
                        {tag}
                    </Tag2Btn>
                ))}
            </TextField>
        </div>
    );
}