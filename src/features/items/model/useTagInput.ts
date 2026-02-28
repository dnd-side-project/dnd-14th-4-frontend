"use client";
import { useState } from "react";

export const useTagInput = (
    tags: string[],
    onTagsChange: (tags: string[]) => void
) => {
    const [inputValue, setInputValue] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const commitTag = () => {
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
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const isComposing = !!e.nativeEvent.isComposing;
        const keyCode = "keyCode" in e ? (e as unknown as { keyCode?: number }).keyCode : undefined;
        const isEnter =
            e.key === "Enter" ||
            e.code === "Enter" ||
            keyCode === 13 ||
            (e.key === "Unidentified" && keyCode === 13);

        if (isEnter && !isComposing) {
            e.preventDefault();
            e.stopPropagation();
            commitTag();
            // 일부 안드로이드 키보드는 Enter(Next)로 포커스를 넘기려 해서 다시 잡아준다.
            requestAnimationFrame(() => e.currentTarget.focus());
        }
    };

    const onBeforeInput = (e: React.FormEvent<HTMLInputElement>) => {
        const nativeEvent = e.nativeEvent as unknown as InputEvent | undefined;
        if (nativeEvent?.inputType === "insertLineBreak") {
            // key 이벤트가 안 뜨는 키보드 대응
            (e as unknown as { preventDefault?: () => void }).preventDefault?.();
            commitTag();
            requestAnimationFrame(() => (e.currentTarget as HTMLInputElement).focus());
        }
    };

    const removeTag = (index: number) => {
        onTagsChange(tags.filter((_, i) => i !== index));
    };

    return { inputValue, errorMessage, isError, setInputValue, onKeyDown, onBeforeInput, removeTag };
};