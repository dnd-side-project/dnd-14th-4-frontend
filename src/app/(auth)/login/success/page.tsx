import { Suspense } from "react";
import { LoginSuccessPage } from "@/views/login-success/ui/LoginSuccessPage";
import Loading from "@/shared/ui/Loading";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <LoginSuccessPage />
    </Suspense>
  );
}
