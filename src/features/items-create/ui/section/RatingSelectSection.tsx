import { BtnSelection } from "@/shared/ui/BtnSelection";

interface RatingProps {
    selected: string | null;
    onSelect: (value: string) => void;
}

export function RatingSelectSection({ selected, onSelect }: RatingProps) {
    const options = [
        { id: "1", label: "👍좋아요" },
        { id: "2", label: "♥️매우좋아요" },
        { id: "3", label: "🏆인생템" },
    ];

    return (
        <div className="flex gap-2">
            {options.map((opt) => (
                <BtnSelection
                    key={opt.id}
                    status={selected === opt.id}
                    onClick={() => onSelect(opt.id)}
                >
                    {opt.label}
                </BtnSelection>
            ))}
        </div>
    );
}