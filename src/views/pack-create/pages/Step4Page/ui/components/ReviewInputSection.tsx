"use client";

interface ReviewInputSectionProps {
  userName: string;
  reviewText: string;
  onChange: (value: string) => void;
}

export default function ReviewInputSection({
  userName,
  reviewText,
  onChange,
}: ReviewInputSectionProps) {
  return (
    <>
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-black" />
        <div>
          <p className="type-label1 text-label-default">{userName}</p>
          <p className="type-caption1 text-label-subtle">리뷰를 작성해주세요.</p>
        </div>
      </div>

      <div>
        <textarea
          value={reviewText}
          onChange={(e) => onChange(e.target.value.slice(0, 100))}
          placeholder="리뷰를 작성해주세요."
          className="h-28 w-full resize-none rounded-xl border border-neutral-200 px-4 py-3 text-neutral-900 placeholder:text-neutral-300 focus:outline-none"
        />
        <p className="mt-2 text-right type-caption1 text-label-subtle">
          {reviewText.length}/100자
        </p>
      </div>
    </>
  );
}
