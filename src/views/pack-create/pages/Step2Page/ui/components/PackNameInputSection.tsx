"use client";

interface PackNameInputSectionProps {
  packName: string;
  onChange: (value: string) => void;
}

export default function PackNameInputSection({
  packName,
  onChange,
}: PackNameInputSectionProps) {
  return (
    <div>
      <input
        type="text"
        value={packName}
        onChange={(e) => onChange(e.target.value.slice(0, 20))}
        placeholder="예시) 출근길 필수 생존 팩"
        className="w-full border-b border-neutral-200 bg-transparent pb-3 text-neutral-900 placeholder:text-neutral-300 focus:outline-none"
      />
      <p className="mt-2 text-right type-caption1 text-label-subtle">
        {packName.length}/20자
      </p>
    </div>
  );
}
