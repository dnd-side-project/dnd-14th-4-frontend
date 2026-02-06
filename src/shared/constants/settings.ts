export type SettingsRow = {
  label: string;
  rightText?: string;
};

export type SettingsSection = {
  title: string;
  rows: SettingsRow[];
};

export const SETTINGS_SECTIONS: SettingsSection[] = [
  {
    title: "내 정보 수정",
    rows: [{ label: "프로필 설정" }, { label: "개인화 정보 설정" }],
  },
  {
    title: "서비스 정보",
    rows: [
      { label: "공지사항" },
      { label: "약관 및 정책" },
      { label: "버전 정보", rightText: "2.31.12" },
    ],
  },
] as const;
