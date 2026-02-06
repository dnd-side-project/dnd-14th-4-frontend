import { SettingsRow } from "./SettingsRow";
import type { SettingsSection as SectionType } from "@/shared/constants/settings";

export function SettingsSection({ section }: { section: SectionType }) {
  return (
    <div className="rounded-3xl bg-neutral-100 px-6 py-6">
      <div className="text-sm font-semibold text-neutral-500">
        {section.title}
      </div>

      <div className="mt-4 space-y-6">
        {section.rows.map((row) => (
          <SettingsRow
            key={row.label}
            label={row.label}
            rightText={row.rightText}
          />
        ))}
      </div>
    </div>
  );
}
