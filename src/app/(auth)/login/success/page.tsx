import { Suspense } from "react";
import { LoginSuccessPage } from "@/views/login-success/ui/LoginSuccessPage";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] flex-col items-center justify-center px-6">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
          <p className="mt-4 text-gray-600">로그인 처리 중...</p>
        </div>
      }
    >
      <LoginSuccessPage />
    </Suspense>
  );
}
