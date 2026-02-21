"use client";

import { Button } from "@/shared/ui/Button";

const apiBase = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").replace(/\/$/, "");
const KAKAO_OAUTH_URL = `${apiBase}/oauth2/authorization/kakao`;

export const LoginPage = () => {
  const handleKakaoLogin = () => {
    window.location.href = KAKAO_OAUTH_URL;
  };

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6">
      

      <Button
        type="button"
        onClick={handleKakaoLogin}
        className="flex items-center justify-center gap-2 bg-[#FEE500] text-[#191919] hover:bg-[#fdd835] font-medium"
        wClass="w-full max-w-[320px]"
      >
        카카오로 로그인
      </Button>
    </div>
  );
};

