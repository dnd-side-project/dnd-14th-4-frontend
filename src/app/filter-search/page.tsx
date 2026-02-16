"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  labelToSlug,
  parseCategoriesParam,
  slugToLabel,
} from "@/features/search/model/categories";
import { BtnSelection } from "@/shared/ui/BtnSelection";
import { BackHeader } from "@/shared/ui/BackHeader";
import { FlowFooter } from "@/shared/ui/FlowFooter";
import { MOMENT_OPTIONS } from "@/views/onboarding/model/constants";

function FilterSearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialSelected = React.useMemo(() => {
    const slugs = parseCategoriesParam(searchParams.get("categories"));
    return slugs
      .map((slug) => slugToLabel(slug))
      .filter((label): label is string => Boolean(label));
  }, [searchParams]);

  const [selected, setSelected] = React.useState<string[]>(initialSelected);

  React.useEffect(() => {
    setSelected(initialSelected);
  }, [initialSelected]);

  const toggle = (v: string) => {
    setSelected((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]
    );
  };

  const handleApply = () => {
    const slugs = selected
      .map((label) => labelToSlug(label))
      .filter((s): s is string => Boolean(s));
    const query = slugs.length > 0 ? `?categories=${slugs.join(",")}` : "";
    router.push(`/search${query}`);
  };

  return (
    <main className="min-h-dvh bg-white pb-28">
    
        < BackHeader onBack={() => router.back()} />

        <h1 className="mt-6  px-4 whitespace-pre-line text-xl font-semibold text-neutral-900 leading-snug">
          나와 비슷한 취향을 가진{"\n"}
          사람들의 팩을 검색해보세요.
        </h1>

      <section className="px-6 pt-8">
        <div className="grid grid-cols-2 gap-3">
          {MOMENT_OPTIONS.map((v) => (
            <BtnSelection
              key={v}
              size="lg"
              fullWidth
              selected={selected.includes(v)}
              onClick={() => toggle(v)}
              className="h-12 rounded-xl"
            >
              {v}
            </BtnSelection>
          ))}
        </div>
      </section>

      <FlowFooter
        label="적용하기"
        disabled={selected.length === 0}
        onClick={handleApply}
        onReset={() => setSelected([])}
        resetDisabled={selected.length === 0}
      />
    </main>
  );
}

export default function FilterSearchPage() {
  return (
    <React.Suspense fallback={<div className="min-h-dvh bg-white" />}>
      <FilterSearchContent />
    </React.Suspense>
  );
}
