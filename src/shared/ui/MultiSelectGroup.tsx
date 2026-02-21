'use client';

import { BtnSelection } from '@/shared/ui/BtnSelection';

interface MultiSelectGroupProps {
    options: readonly string[];
    selected: string[];
    onChange: (newSelected: string[]) => void;
    maxCount?: number;
}

export const MultiSelectGroup = ({
    options,
    selected,
    onChange,
    maxCount = 3
}: MultiSelectGroupProps) => {

    const toggleItem = (item: string) => {
        if (selected.includes(item)) {
            onChange(selected.filter((i) => i !== item));
        } else if (selected.length < maxCount) {
            onChange([...selected, item]);
        }
    };

    return (
        <div className="grid grid-cols-2 gap-3">
            {options.map((option) => {
                const isSelected = selected.includes(option);
                const isDisabled = !isSelected && selected.length >= maxCount;

                return (
                    <BtnSelection
                        key={option}
                        size="lg"
                        fullWidth
                        selected={isSelected}
                        disabled={isDisabled}
                        onClick={() => toggleItem(option)}
                    >
                        {option}
                    </BtnSelection>
                );
            })}
        </div>
    );
};