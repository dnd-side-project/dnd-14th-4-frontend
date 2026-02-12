"use client";

import * as React from "react";
import { BtnSelection } from "@/shared/ui/BtnSelection";
import { Button } from "@/shared/ui/Button";
import { FlowFooter } from "@/shared/ui/FlowFooter";
import { FormSection } from "@/shared/ui/FormSection";
import { Tag2Btn } from "@/shared/ui/Tag2Btn";
import { TextField } from "@/shared/ui/TextField";

export default function DevUiPageClient() {
  const [selected, setSelected] = React.useState(false);
  const [tagSelected, setTagSelected] = React.useState(true);
  const [text, setText] = React.useState("");

  return (
    <main className="min-h-dvh bg-white p-8 space-y-12 pb-40">
      <h1 className="text-2xl font-bold">🧩 Shared UI Playground</h1>

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

        <Button>Filled Button</Button>

        <Button variant="outlined">Outlined</Button>

        <Button variant="text">Text Button</Button>

        <Button isLoading>Loading Button</Button>
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
    </main>
  );
}
