import InputField from "../InputField";

interface ItemDetailProps {
    values: { brand: string; product: string };
    onChange: (field: "brand" | "product", value: string) => void;
}

export function ItemDetailSection({ values, onChange }: ItemDetailProps) {
    return (
        <div className="flex flex-col gap-5">
            <InputField
                placeholder="브랜드명"
                value={values?.brand || ""}
                onChange={(e) => onChange("brand", e.target.value)}
            />
            <InputField
                placeholder="상품명"
                value={values?.product || ""}
                onChange={(e) => onChange("product", e.target.value)}
            />
        </div>
    );
}