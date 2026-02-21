import React from "react";
import { PackCard, type PackCardData } from "@/shared/ui/item/PackCard";

export function PackCarousel({ packs }: { packs: PackCardData[] }) {
    const scrollerRef = React.useRef<HTMLDivElement>(null);
    const [active, setActive] = React.useState(0);
  
    const onScroll = React.useCallback(() => {
      const el = scrollerRef.current;
      if (!el) return;
      const slideWidth = el.clientWidth;
      const nextIndex = Math.round(el.scrollLeft / slideWidth);
      setActive(Math.max(0, Math.min(packs.length - 1, nextIndex)));
    }, [packs.length]);
  
    const scrollToIndex = (idx: number) => {
      const el = scrollerRef.current;
      if (!el) return;
      const slideWidth = el.clientWidth;
      el.scrollTo({ left: idx * slideWidth, behavior: "smooth" });
    };
  
    return (
      <div className="mt-4">
        <div
          ref={scrollerRef}
          onScroll={onScroll}
          className="-mx-5 px-5 overflow-x-auto snap-x snap-mandatory"
        >
          <div className="flex w-max gap-4 pb-3">
            {packs.map((p) => (
              <div
                key={p.id}
                className="w-[calc(100vw-40px)] max-w-[420px] snap-center"
              >
                <PackCard {...p} />
              </div>
            ))}
          </div>
        </div>
  
        <div className="mt-2 flex items-center justify-center gap-2">
          {packs.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`slide ${i + 1}`}
              onClick={() => scrollToIndex(i)}
              className={[
                "h-1.5 w-1.5 rounded-full transition-opacity",
                i === active ? "bg-neutral-900 opacity-100" : "bg-neutral-300 opacity-70",
              ].join(" ")}
            />
          ))}
        </div>
      </div>
    );
  }
  