"use client";

import { TextField } from "@/shared/ui/TextField";
import { Tag2Btn } from "@/shared/ui/Tag2Btn";
import { ImageUploadBox } from "../ImageUploadBox"; // 경로 확인 필요
import { useImageUpload } from "../../model/useImageUpload";
import { useTagInput } from "../../model/useTagInput";

export function ImageReviewSection() {
    const {
        imageCount,
        openPicker,
        fileInputRef,
        handleFileChange
    } = useImageUpload(5);

    const {
        tags,
        inputValue,
        errorMessage,
        isError,
        setInputValue,
        onKeyDown,
        removeTag,
    } = useTagInput();

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

            <ImageUploadBox
                count={imageCount}
                maxCount={5}
                onClick={openPicker}
            />

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