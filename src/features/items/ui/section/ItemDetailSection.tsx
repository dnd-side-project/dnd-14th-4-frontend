import InputField from "../InputField";

interface ItemDetailProps {
  values: { brandName: string; productName: string };
  onChange: (field: "brandName" | "productName", value: string) => void;
}

function FieldLabelRow({
  label,
}: {
  label: string;
  required?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="type-label1 text-label-subtle">{label}</span>
    </div>
  );
}

export function ItemDetailSection({ values, onChange }: ItemDetailProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <FieldLabelRow label="브랜드명" required />
        <InputField
          placeholder="브랜드명을 입력해주세요"
          value={values?.brandName || ""}
          onChange={(e) => onChange("brandName", e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <FieldLabelRow label="상품명" required />
        <InputField
          placeholder="상품명을 입력해주세요"
          value={values?.productName || ""}
          onChange={(e) => onChange("productName", e.target.value)}
        />
      </div>
    </div>
  );
}