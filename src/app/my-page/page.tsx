import { MyPageHeader } from "@/widgets/my-page/ui/MyPageHeader";
import { MyProfileSection } from "@/widgets/my-page/ui/MyProfileSection";

export default function MyPage() {
  return (
    <div className="min-h-dvh bg-white px-6 pt-6">
      <MyPageHeader />
      <MyProfileSection />
    </div>
  );
}
