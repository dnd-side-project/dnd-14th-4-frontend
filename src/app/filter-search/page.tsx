"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { BtnSelection } from "@/shared/ui/BtnSelection";
import { MOMENT_OPTIONS } from "@/views/onboarding/model/constants";
import { FlowFooter } from "@/shared/ui/FlowFooter";
import { BackHeader } from "@/shared/ui/BackHeader";

export default function FilterSearchPage() {
  const router = useRouter();
  const [selected, setSelected] = React.useState<string[]>([]);

  const toggle = (v: string) => {
    setSelected((prev) => {
      if (prev.includes(v)) return prev.filter((x) => x !== v);
      if (prev.length >= 3) return prev; // 최대 3개
      return [...prev, v];
    });
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
          {MOMENT_OPTIONS.map((v) => {
            const isSelected = selected.includes(v);
            const disabled = !isSelected && selected.length >= 3;

            return (
              <BtnSelection
                key={v}
                size="lg"
                fullWidth
                selected={isSelected}
                disabled={disabled}
                onClick={() => toggle(v)}
                className="h-12 rounded-xl"
              >
                {v}
              </BtnSelection>
            );
          })}
        </div>
      </section>

      <FlowFooter
        label="적용하기"
        disabled={selected.length === 0}
        onClick={() => console.log("apply")}
        onReset={() => setSelected([])}
        resetDisabled={selected.length === 0}
      />
    </main>
  );
}
