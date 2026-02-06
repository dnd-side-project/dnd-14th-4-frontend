import { SettingsHeader } from "@/widgets/settings/ui/SettingsHeader";
import { SettingsSection } from "@/widgets/settings/ui/SettingsSection";
import { SETTINGS_SECTIONS } from "@/shared/constants/settings";

export default function SettingsPage() {
  return (
    <div className="min-h-dvh bg-white px-6 pt-6">
      <SettingsHeader />

      <div className="mt-8 space-y-6">
        {SETTINGS_SECTIONS.map((section) => (
          <SettingsSection key={section.title} section={section} />
        ))}

        <div className="rounded-3xl bg-neutral-100 px-6 py-6 text-lg font-semibold">
          로그아웃
        </div>
      </div>
    </div>
  );
}
