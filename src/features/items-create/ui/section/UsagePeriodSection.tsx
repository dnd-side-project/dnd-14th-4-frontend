import { BtnSelection } from "@/shared/ui/BtnSelection";

interface UsagePeriodProps {
    selected: string | null;
    onSelect: (value: string) => void;
}

export function UsagePeriodSection({ selected, onSelect }: UsagePeriodProps) {
    const options = [
        { id: "1", label: "1년 이하" },
        { id: "2", label: "1년 이상" },
        { id: "3", label: "3년 이상" },
        { id: "4", label: "5년 이상" },
    ];

    return (
        <div className="flex gap-3 flex-wrap">
            {options.map((opt) => (
                <BtnSelection
                    key={opt.id}
                    // 내가 선택된 놈이면 status를 true로 보내서 검정색으로 만듦
                    status={selected === opt.id}
                    onClick={() => onSelect(opt.id)}
                >
                    {opt.label}
                </BtnSelection>
            ))}
        </div>
    );
}