"use client";

import { isProfileDefaultColor } from "@/entities/user/model";
import { PROFILE_COLOR_CLASS } from "@/views/my-page/ui/MyPage";

interface ReviewInputSectionProps {
  userName: string;
  profileImageUrl?: string;
  reviewText: string;
  onChange: (value: string) => void;
}

export default function ReviewInputSection({
  userName,
  profileImageUrl,
  reviewText,
  onChange,
}: ReviewInputSectionProps) {
  const profileInitial = (userName || "?").trim().charAt(0).toUpperCase();

  return (
    <>
      <div className="flex items-center gap-3">
        {profileImageUrl && !isProfileDefaultColor(profileImageUrl) ? (
          <div
            className="h-9 w-9 rounded-full bg-neutral-300 bg-cover bg-center"
            style={{ backgroundImage: `url(${profileImageUrl})` }}
            aria-label={`${userName} 프로필 이미지`}
            role="img"
          />
        ) : (
          <div
            className={`h-9 w-9 rounded-full flex items-center justify-center text-white font-bold ${profileImageUrl && isProfileDefaultColor(profileImageUrl)
              ? PROFILE_COLOR_CLASS[profileImageUrl] ?? "bg-neutral-300"
              : "bg-neutral-900"
              }`}
            aria-label={`${userName} 프로필`}
          >
            {profileInitial}
          </div>
        )}
        <div>
          <p className="type-label1 text-label-default">{userName}</p>
          <p className="type-caption1 text-label-subtle">리뷰를 작성해주세요.</p>
        </div>
      </div>

      <div>
        <textarea
          value={reviewText}
          onChange={(e) => onChange(e.target.value.slice(0, 100))}
          placeholder="리뷰를 작성해주세요."
          className="h-28 w-full resize-none rounded-xl border border-neutral-200 px-4 py-3 text-neutral-900 placeholder:text-neutral-300 focus:outline-none"
        />
        <p className="mt-2 text-right type-caption1 text-label-subtle">
          {reviewText.length}/100자
        </p>
      </div>
    </>
  );
}
