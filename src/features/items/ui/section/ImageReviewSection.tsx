"use client";

import { useEffect } from "react";
import Image from "next/image";
import { TextField } from "@/shared/ui/TextField";
import { Tag2Btn } from "@/shared/ui/Tag2Btn";
import { IcSvgCloseBig } from "@/shared/icons";
import { ImageUploadBox } from "../ImageUploadBox";
import { useImageUpload } from "../../model/useImageUpload";
import { useTagInput } from "../../model/useTagInput";

interface ImageReviewSectionProps {
    images: (string | File)[],
    onImagesChange: (newImages: (File | string)[]) => void; // 타입 일치
    tags: string[];
    onTagsChange: (tags: string[]) => void;
}

function PreviewItem({
    img,
    index,
    onRemove,
}: {
    img: File | string;
    index: number;
    onRemove: (idx: number) => void;
}) {
    const imgSrc = typeof img === "string"
        ? encodeURI(img)
        : URL.createObjectURL(img);

    useEffect(() => {
        return () => {
            if (typeof img !== "string") {
                URL.revokeObjectURL(imgSrc);
            }
        };
    }, [imgSrc, img]);

    if (!imgSrc) return null;

    return (
        <div className="relative flex-shrink-0 w-[100px] h-[100px]">
            <Image
                src={imgSrc}
                alt={`preview-${index}`}
                fill
                className="object-cover rounded-lg"
                unoptimized
                priority={index < 2}
            />
            <button
                type="button"
                onClick={() => onRemove(index)}
                className="absolute z-10 top-1 right-1 bg-black/50 text-white rounded-full w-5 h-5 flex items-center justify-center"
            >
                <IcSvgCloseBig className="w-3 h-3 text-white" />
            </button>
        </div>
    );
}

export function ImageReviewSection({
    images,
    onImagesChange,
    tags,
    onTagsChange,
}: ImageReviewSectionProps) {
    const { fileInputRef, openPicker, handleFileChange, removeImage } = useImageUpload(
        images,
        onImagesChange
    );

    const { inputValue, onKeyDown, removeTag, isError, errorMessage, setInputValue } =
        useTagInput(tags, onTagsChange);

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

            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                <div className="flex-shrink-0">
                    <ImageUploadBox
                        count={images.length}
                        maxCount={5}
                        onClick={openPicker}
                    />
                </div>

                {images.map((img, index) => (
                    <PreviewItem
                        // key를 고유하게 설정하여 렌더링 최적화
                        key={typeof img === "string" ? `url-${img}-${index}` : `file-${img.name}-${index}`}
                        img={img}
                        index={index}
                        onRemove={removeImage}
                    />
                ))}
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
                        key={`${tag}-${index}`}
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