"use client";

export default function AddItemCard({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="grid h-28 w-full place-items-center rounded-2xl border border-neutral-100 bg-white text-neutral-300 shadow-sm"
    >
      <span className="text-lg">＋ 추가하기</span>
    </button>
  );
}
