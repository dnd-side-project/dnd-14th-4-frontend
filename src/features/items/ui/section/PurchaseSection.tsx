import { TextField } from "@/shared/ui/TextField";

interface PurchaseSectionProps {
    value: string;
    onChange: (val: string) => void;
}

export function PurchaseSection({ value, onChange }: PurchaseSectionProps) {
    return (
        <div>
            <TextField
                variant="sm"
                placeholder="구매처를 입력해주세요"
                helperText="*네이버 스마트 스토어, 쿠팡, 해외직구, 오프라인샵 등..."
                value={value}
                onChange={(e) => onChange(e.currentTarget.value)}
            />
        </div>
    );
}