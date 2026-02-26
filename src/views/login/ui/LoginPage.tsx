"use client";

import { Button } from "@/shared/ui/Button";
import apiClient from "@/shared/api/apiClient";
import { IcSvgKakao } from "@/shared/icons";

const baseURL = (apiClient.defaults.baseURL ?? "").replace(/\/$/, "");
const KAKAO_OAUTH_URL = `${baseURL}/oauth2/authorization/kakao`;

export const LoginPage = () => {
  const handleKakaoLogin = () => {
    window.location.href = KAKAO_OAUTH_URL;
  };

  return (
    <div className="w-full flex justify-center">
      <div
        className="
          relative w-full max-w-mobile min-h-dvh
          flex flex-col justify-end
          bg-cover bg-center bg-no-repeat
          bg-[url('/background/bg-intro.png')]
        "
      >
        <section className="px-6 pb-[140px]">
          <p className="text-center type-headline2 text-neutral-800/90">
            따로 찾지 말고, 한 번에 팩으로
          </p>

          <h1 className="mt-2 text-center text-[26px] leading-[34px] font-extrabold text-neutral-900">
            실패 없는 소비를 위한
            <br />
            애착템 공유 플랫폼
          </h1>
        </section>

        <div className="px-5 pb-[max(env(safe-area-inset-bottom),24px)]">
          <Button
            type="button"
            onClick={handleKakaoLogin}
            wClass="w-full"
            className="flex items-center justify-center gap-2 rounded-[8px] h-[60px] font-semibold
                       !bg-[#FEE500] !text-[#191919] hover:!bg-[#fdd835]"
          >
            <IcSvgKakao className="w-5 h-5" />
            카카오로 시작하기
          </Button>
        </div>
      </div>
    </div>
  );
};