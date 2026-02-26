"use client";

import IcLogo from "@/shared/icons/ic_logo";
import { Button } from "@/shared/ui/Button";
import apiClient from "@/shared/api/apiClient";
import { IcSvgKakaoTalk } from "@/shared/icons";

const baseURL = (apiClient.defaults.baseURL ?? "").replace(/\/$/, "");
const KAKAO_OAUTH_URL = `${baseURL}/oauth2/authorization/kakao`;

export const LoginPage = () => {
  const handleKakaoLogin = () => {
    window.location.href = KAKAO_OAUTH_URL;
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-neutral-100">
      <div className="flex-1 flex flex-col items-center justify-center">
        <IcLogo className="w-[120px] h-auto" />

        <h1 className="mt-6 text-[28px] font-extrabold tracking-tight text-black">
          What’s in my Pack
        </h1>
      </div>

      <div className="px-6 pb-[max(env(safe-area-inset-bottom),32px)]">
        <Button
          type="button"
          onClick={handleKakaoLogin}
          wClass="w-full"
          className="flex items-center justify-center gap-2 rounded-full h-[60px] font-semibold
                     !bg-[#FEE500] !text-[#191919] hover:!bg-[#fdd835]"
        >
         <IcSvgKakaoTalk className="w-8 h-8" />
          카카오로 시작하기
        </Button>
      </div>
    </div>
  );
};