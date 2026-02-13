"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { BtnSelection } from "@/shared/ui/BtnSelection";
import { Button } from "@/shared/ui/Button";
import { FlowFooter } from "@/shared/ui/FlowFooter";
import { FormSection } from "@/shared/ui/FormSection";
import { Tag2Btn } from "@/shared/ui/Tag2Btn";
import { TextField } from "@/shared/ui/TextField";

import Pagination from "@/shared/ui/Pagination";
import TabItem from "@/shared/ui/TabItem";
import Tag1Btn from "@/shared/ui/Tag1Btn";
import TextBtn from "@/shared/ui/TextBtn";
import IconButton from "@/shared/ui/IconBtn";
import { BackHeader } from "@/shared/ui/BackHeader";
import { PackCard, MOCK_PACK_CARDS } from "@/shared/ui/item/PackCard";
import { ItemCard } from "@/shared/ui/item/ItemCard";

export default function DevUiPageClient() {
  const router = useRouter();
  const [selected, setSelected] = React.useState(false);
  const [tagSelected, setTagSelected] = React.useState(true);
  const [text, setText] = React.useState("");

  // ✅ Pagination / Tabs / Tag1 / TextBtn 데모용 상태
  const [page, setPage] = React.useState(0);
  const [tab, setTab] = React.useState<"A" | "B" | "C">("A");
  const [tag1Variant, setTag1Variant] = React.useState<
    "unpressed" | "pressed" | "primary" | "secondary" | "disabled"
  >("unpressed");

  return (
    <>
    {/* ---------------BackHeader-------------- */}
      <BackHeader onBack={() => router.back()} />
      <main className="min-h-dvh bg-white p-8 space-y-12 pb-40">
        <h1 className="text-2xl font-bold">🧩 Shared UI Playground</h1>

{/* PackCard - 목 데이터 연결 (추후 API로 교체) */}
        <div className="space-y-4 max-w-[352px]">
          {MOCK_PACK_CARDS.map((card) => (
            <PackCard key={card.id} {...card} />
          ))}
        </div>
        <div className="space-y-4 max-w-[352px]">
          {MOCK_PACK_CARDS.map((card) => (
                 <ItemCard key={card.id} {...card} />
          ))}
        </div>
  
      {/*-------------- BtnSelection--------------------- */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">BtnSelection</h2>
        <div className="flex gap-3">
          <BtnSelection
            selected={selected}
            onClick={() => setSelected((v) => !v)}
          >
            여행/캠핑
          </BtnSelection>
        </div>
        <BtnSelection size="lg" selected>
          공부/시험
        </BtnSelection>
      </section>

      {/* -----------------Button--------------- */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Button</h2>

        <div className="flex flex-wrap gap-3">
          <Button>Filled Button</Button>
          <Button variant="outlined">Outlined</Button>
          <Button variant="text">Text Button</Button>
          <Button isLoading>Loading Button</Button>
        </div>
      </section>

      {/* ----------------Tag2Btn-------------- */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Tag2Btn</h2>

        <div className="flex gap-3">
          <Tag2Btn
            status={tagSelected}
            onClick={() => setTagSelected((v) => !v)}
          >
            여행
          </Tag2Btn>

          <Tag2Btn hasX>캠핑</Tag2Btn>
        </div>
      </section>

      {/* ---------------TextField---------------- */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">TextField</h2>

        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="텍스트를 입력하세요"
          helperText="최대 20자 입력 가능"
        />

        <TextField
          variant="sm"
          placeholder="Small variant"
          isError
          helperText="에러 메시지"
        />
      </section>

      {/* ---------------FormSection------------------ */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">FormSection</h2>

        <FormSection title="제목" isOptional>
          <BtnSelection>옵션 1</BtnSelection>
        </FormSection>
      </section>

      {/*---------------- FlowFooter--------------- */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">FlowFooter</h2>
        지금 하단에 고정된 FlowFooter 컴포넌트가 있습니다.
        <FlowFooter
          label="다음"
          disabled={false}
          onClick={() => alert("다음 클릭")}
        />
      </section>

      {/* ==================  추가된 공통 컴포넌트 데모 ================== */}

      {/* ----------------IconButton-------------- */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">IconButton</h2>

        <div className="flex flex-wrap items-center gap-4">
          <IconButton variant="plus" onClick={() => alert("plus")} />
          <IconButton variant="close" onClick={() => alert("close")} />
          <IconButton variant="pack" onClick={() => alert("pack")} />
          <IconButton variant="item" onClick={() => alert("item")} />

          {/* iconSize override 예시 */}
          <IconButton variant="plus" iconSize="w-8 h-8" />
        </div>
      </section>

      {/* ----------------Pagination-------------- */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Pagination</h2>

        <div className="rounded-xl border border-line-normal p-4">
          <div className="type-label1 text-label-subtle">current: {page}</div>
          <Pagination total={6} current={page} onChange={setPage} />
        </div>
      </section>

      {/* ----------------TabItem-------------- */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">TabItem</h2>

        <div className="w-full max-w-md">
          <div role="tablist" className="flex">
            <TabItem isActive={tab === "A"} onClick={() => setTab("A")}>
              탭 A
            </TabItem>
            <TabItem isActive={tab === "B"} onClick={() => setTab("B")}>
              탭 B
            </TabItem>
            <TabItem isActive={tab === "C"} onClick={() => setTab("C")}>
              탭 C
            </TabItem>
          </div>

          <div className="mt-4 rounded-xl bg-neutral-99 p-4">
            <div className="type-label1 text-label-subtle">Active Tab</div>
            <div className="mt-2 type-headline2 text-label-default">{tab}</div>
          </div>
        </div>
      </section>

      {/* ----------------Tag1Btn-------------- */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Tag1Btn</h2>

        <div className="flex flex-wrap gap-2">
          <Tag1Btn
            variant="unpressed"
            onClick={() => setTag1Variant("unpressed")}
          >
            unpressed
          </Tag1Btn>
          <Tag1Btn variant="pressed" onClick={() => setTag1Variant("pressed")}>
            pressed
          </Tag1Btn>
          <Tag1Btn variant="primary" onClick={() => setTag1Variant("primary")}>
            primary
          </Tag1Btn>
          <Tag1Btn
            variant="secondary"
            onClick={() => setTag1Variant("secondary")}
          >
            secondary
          </Tag1Btn>
          <Tag1Btn variant="disabled">disabled</Tag1Btn>
        </div>

        <div className="rounded-xl border border-line-normal p-4 space-y-3">
          <div className="type-label1 text-label-subtle">Selected variant</div>

          <div className="flex flex-wrap items-center gap-2">
            <Tag1Btn variant={tag1Variant} mode="chip">
              chip / {tag1Variant}
            </Tag1Btn>
            <Tag1Btn variant={tag1Variant} mode="btn">
              btn / {tag1Variant}
            </Tag1Btn>
          </div>
        </div>
      </section>

      {/* ----------------TextBtn-------------- */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">TextBtn</h2>

        <div className="flex flex-col gap-3">
          <TextBtn status="black" onClick={() => alert("black")}>
            기본 텍스트
          </TextBtn>

          <TextBtn status="pink" arrow onClick={() => alert("pink arrow")}>
            자세히 보기
          </TextBtn>

          <TextBtn status="gray" close onClick={() => alert("gray close")}>
            닫기
          </TextBtn>

          <TextBtn status="pink" arrow close onClick={() => alert("both")}>
            복합(arrow+close)
          </TextBtn>
        </div>
      </section>
      </main>
    </>
  );
}
