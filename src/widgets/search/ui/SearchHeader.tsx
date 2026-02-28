"use client";

import {
  IcSvgArrowLeftBig,
  IcSvgFilter,
  IcSvgSearch,
} from "@/shared/icons";

interface Props {
  query: string;
  onChange: (v: string) => void;
  onCommit?: (v: string) => void;
  onBack: () => void;
  onFilter: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

export function SearchHeader({
  query,
  onChange,
  onCommit,
  onBack,
  onFilter,
  inputRef,
}: Props) {
  return (
    <header className="px-4 pt-5">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onBack}
          className="grid h-11 w-11 place-items-center rounded-xl"
        >
          <IcSvgArrowLeftBig className="h-5 w-5 text-neutral-800" />
        </button>

        <div className="flex-1">
          <div className="flex h-11 items-center gap-2 rounded-xl type-body2 bg-neutral-100 px-3">
            <IcSvgSearch className="h-5 w-5 text-neutral-400" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => onChange(e.target.value)}
              onBlur={() => onCommit?.(query)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onCommit?.(query);
                }
              }}
              placeholder="다양한 팩을 검색해보세요."
              className="w-full bg-transparent outline-none text-base placeholder:text-sm"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={onFilter}
          className="grid place-items-center rounded-xl"
        >
          <IcSvgFilter className="h-6 w-6 text-neutral-800" />
        </button>
      </div>
    </header>
  );
}