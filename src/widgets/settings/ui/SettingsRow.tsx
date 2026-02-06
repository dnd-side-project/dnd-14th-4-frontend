export function SettingsRow({
  label,
  rightText,
}: {
  label: string;
  rightText?: string;
}) {
  return (
    <div className="flex items-center justify-between text-lg font-semibold">
      <span>{label}</span>
      {rightText && (
        <span className="text-base text-neutral-500">{rightText}</span>
      )}
    </div>
  );
}
