"use client";

import { PackCard, type PackCardData } from "@/shared/ui/item/PackCard";

interface Props {
  packs: PackCardData[];
  isEmpty: boolean;
  nickname: string;
  recommended: PackCardData[];
}

export function SearchResultSection({
  packs,
  nickname,
  recommended,
}: Props) {
  const hasResults = packs.length > 0;

  if (hasResults) {
    return (
      <section className="px-4 pt-6">
        <ul className="flex flex-col gap-4">
          {packs.map((card) => (
            <li key={card.id}>
              <PackCard {...card} showLikeBtn={card.author !== nickname} />
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section className="px-4 pt-6">
      <div className="pt-24 text-center">
        <p className="type-headline1 text-label-default dark:text-label-default">
          검색 결과가 없습니다. <br />
          직접 첫 번째 팩의 주인공이 되어보세요!
        </p>
      </div>

      {recommended.length > 0 && (
        <div className="mt-24">
          <h2 className="type-heading1 text-label-default dark:text-label-default">
            <span className="text-primary-normal">{nickname}</span>님을 위한 맞춤 팩
            어때요?
          </h2>

          <ul className="mt-6 flex flex-col gap-4">
            {recommended.map((card) => (
              <li key={card.id}>
                <PackCard {...card} showLikeBtn={card.author !== nickname} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}