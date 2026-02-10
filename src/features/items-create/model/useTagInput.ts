import { useState } from 'react';

export const useTagInput = (maxTags = 5, maxChars = 10) => {
    const [tags, setTags] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");


    const isCharLimitExceeded = inputValue.length > maxChars;
    const isTagLimitExceeded = tags.length >= maxTags;

    let errorMessage = "";
    if (isCharLimitExceeded) {
        errorMessage = `태그는 최대 ${maxChars}자까지 입력 가능해요.`;
    } else if (isTagLimitExceeded && inputValue.trim() !== "") {
        errorMessage = `태그는 최대 ${maxTags}개까지만 등록할 수 있어요.`;
    }

    const removeTag = (indexToRemove: number) => {
        setTags((prev) => prev.filter((_, index) => index !== indexToRemove));
    };

    const addTag = () => {
        const trimmedValue = inputValue.trim().replace(/^#/, "");

        if (!trimmedValue || isCharLimitExceeded || isTagLimitExceeded) return;

        if (tags.includes(trimmedValue)) {

            return;
        }

        setTags((prev) => [...prev, trimmedValue]);
        setInputValue("");
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTag();
        } else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
            removeTag(tags.length - 1);
        }
    };

    return {
        tags,
        inputValue,
        errorMessage,
        isError: isCharLimitExceeded,
        setInputValue,
        onKeyDown,
        removeTag
    };
};