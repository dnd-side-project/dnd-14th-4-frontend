"use client";

import { TextField } from "@/shared/ui/TextField";
import { Tag2Btn } from "@/shared/ui/Tag2Btn";
import { ImageUploadBox } from "../ImageUploadBox";
import { useImageUpload } from "../../model/useImageUpload";
import { useTagInput } from "../../model/useTagInput";
import Image from "next/image";
import { IcSvgCloseBig } from "@/shared/icons";
import { useEffect, useRef, useState } from "react";

interface ImageReviewSectionProps {
    images: (File | string)[];
    onImagesChange: (files: (File | string)[]) => void;
    tags: string[];
    onTagsChange: (tags: string[]) => void;
}

export function ImageReviewSection({ images, onImagesChange, tags, onTagsChange }: ImageReviewSectionProps) {
    const { fileInputRef, openPicker, handleFileChange, removeImage } = useImageUpload(
        images,
        onImagesChange
    );
    const { inputValue, onKeyDown, onBeforeInput, removeTag, isError, errorMessage, setInputValue } = useTagInput(tags, onTagsChange);

    const currentHelperText = isError ? errorMessage : "*태그 당 최대 10자";
    const objectUrlMapRef = useRef<Map<File, string>>(new Map());
    const [previewSrcs, setPreviewSrcs] = useState<string[]>([]);

    useEffect(() => {
        // 렌더 중 ref 접근 금지 규칙 대응: src 계산/캐싱은 effect에서만 처리
        const map = objectUrlMapRef.current;
        const currentFiles = new Set(images.filter((x): x is File => x instanceof File));

        // 삭제된 파일 objectURL 정리
        for (const [file, url] of map.entries()) {
            if (!currentFiles.has(file)) {
                URL.revokeObjectURL(url);
                map.delete(file);
            }
        }

        // 현재 images 순서대로 preview src 생성
        const nextSrcs = images.map((img) => {
            if (typeof img === "string") return encodeURI(img);

            const existing = map.get(img);
            if (existing) return existing;

            const url = URL.createObjectURL(img);
            map.set(img, url);
            return url;
        });

        setPreviewSrcs(nextSrcs);
    }, [images]);

    useEffect(() => {
        const map = objectUrlMapRef.current;
        return () => {
            // 언마운트 시 전체 정리
            for (const url of map.values()) {
                URL.revokeObjectURL(url);
            }
            map.clear();
        };
    }, []);

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
                {images.map((img, index) => {
                    const imgSrc = previewSrcs[index] ?? (typeof img === "string" ? encodeURI(img) : "");

                    return (
                        <div key={`image-${index}`} className="relative flex-shrink-0 w-[100px] h-[100px]">
                            <Image
                                src={imgSrc}
                                alt="preview"
                                fill
                                className="object-cover rounded-lg"
                                unoptimized
                            />
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute z-10 top-1 right-1 bg-black/50 text-white rounded-full w-5 h-5 flex items-center justify-center"
                            >
                                <IcSvgCloseBig className="w-8 h-8" />
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
                onBeforeInput={onBeforeInput}
                enterKeyHint="done"
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