"use client";
import { useState } from "react";

export const useTagInput = (
    tags: string[],
    onTagsChange: (tags: string[]) => void
) => {
    const [inputValue, setInputValue] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.nativeEvent.isComposing) {
            e.preventDefault();
            const value = inputValue.trim().replace(/^#/, ""); // # 제거 로직 포함

            if (value === "") return;
            if (tags.includes(value)) {
                setIsError(true);
                setErrorMessage("이미 등록된 태그입니다.");
                return;
            }
            if (tags.length >= 5) {
                setIsError(true);
                setErrorMessage("태그는 최대 5개까지 등록 가능합니다.");
                return;
            }

            onTagsChange([...tags, value]);
            setInputValue("");
            setIsError(false);
            setErrorMessage("");
        }
    };

    const removeTag = (index: number) => {
        onTagsChange(tags.filter((_, i) => i !== index));
    };

    return { inputValue, errorMessage, isError, setInputValue, onKeyDown, removeTag };
};