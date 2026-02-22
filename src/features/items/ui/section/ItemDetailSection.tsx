import InputField from "../InputField";

interface ItemDetailProps {
    values: { brandName: string; productName: string };
    onChange: (field: "brandName" | "productName", value: string) => void;
}

export function ItemDetailSection({ values, onChange }: ItemDetailProps) {
    return (
        <div className="flex flex-col gap-5">
            <InputField
                placeholder="브랜드명"
                value={values?.brandName || ""}
                onChange={(e) => onChange("brandName", e.target.value)}
            />
            <InputField
                placeholder="상품명"
                value={values?.productName || ""}
                onChange={(e) => onChange("productName", e.target.value)}
            />
        </div>
    );
}