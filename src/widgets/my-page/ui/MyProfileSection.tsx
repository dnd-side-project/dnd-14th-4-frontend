export function MyProfileSection() {
  return (
    <div className="mt-10 flex flex-col items-center text-center">
      {/* 회색 기본 프로필 */}
      <div className="h-28 w-28 rounded-full bg-neutral-200" />

      <div className="mt-4 text-lg font-semibold">혜련</div>
      <div className="mt-1 text-sm text-neutral-500">
        내 정보와 설정을 관리하세요
      </div>
    </div>
  );
}
