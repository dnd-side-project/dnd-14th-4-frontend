"use client";

import { IcSvgHistory, IcSvgCloseBig } from "@/shared/icons";
import { BtnSelection } from "@/shared/ui/BtnSelection";

interface RecentItem {
  id: string;
  keyword: string;
}

interface PopularItem {
  id: string;
  value: string;
  label: string;
}

interface Props {
  recents: RecentItem[];
  onClear: () => void;
  onRemove: (id: string) => void;
  popular: PopularItem[];
  onSelectPopular: (value: string, id: string) => void;
  selectedId: string | null;
}

export function SearchLandingSection({
  recents,
  onClear,
  onRemove,
  popular,
  onSelectPopular,
  selectedId,
}: Props) {
  return (
    <section className="px-4 pt-6">
      {/* 최근 검색어 */}
      <div className="flex justify-between">
        <h2 className="text-label-subtle type-label1">최근 검색어</h2>
        <button onClick={onClear} className="text-label-subtle type-label1">
          전체 삭제
        </button>
      </div>

      <ul className="mt-3 ">
        {recents.map((item) => (
          <li key={item.id} className="flex items-center gap-3 py-4 border-b border-neutral-95">
            <IcSvgHistory className="h-5 w-5 text-neutral-400" />
            <span className="flex-1 type-body2 text-label-default">{item.keyword}</span>
            <button onClick={() => onRemove(item.id)}>
              <IcSvgCloseBig className="h-5 w-5 text-neutral-400" />
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <h3 className="text-label-subtle type-label1">인기 키워드</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {popular.map((kw) => (
            <BtnSelection
              key={kw.id}
              selected={selectedId === kw.id}
              onClick={() => onSelectPopular(kw.value, kw.id)}
            >
              {kw.label}
            </BtnSelection>
          ))}
        </div>
      </div>
    </section>
  );
}