import React from "react";

type TagVariant = "primary" | "secondary" | "pressed" | "disabled" | "unpressed";
type TagMode = "btn" | "chip";

interface Tag1BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: TagVariant;
  mode?: TagMode;
  className?: string;
  /** 칩 안에 X 버튼 등 추가 요소를 넣을 때 사용. 지정하면 button 대신 span으로 렌더링해 중첩 버튼을 피함 */
  trailing?: React.ReactNode;
}

export default function Tag1Btn({
  children,
  variant = "unpressed",
  mode = "chip",
  className = "",
  disabled,
  trailing,
  ...props
}: Tag1BtnProps) {
  const baseStyle =
    "inline-flex items-center justify-center type-label1 rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const paddingStyle = mode === "btn" ? "px-5 py-[7px]" : "px-4";

  const variantStyles: Record<TagVariant, string> = {
    primary: "bg-neutral-10 text-white border border-transparent",
    pressed: "bg-pink-95 text-primary-normal border border-transparent",
    disabled: "bg-neutral-95 text-neutral-80 border border-transparent cursor-not-allowed",
    unpressed: "bg-white border border-label-subtler text-label-subtle",
    secondary:
      mode === "btn"
        ? "border border-beige-30 bg-secondary-lightbeige text-beige-10"
        : "bg-beige-60 text-white border border-transparent",
  };

  // ✅ design/#36 로직 유지: btn일 때만 variant=disabled를 강제 disabled로 취급
  const isDisabled = mode === "btn" ? (disabled || variant === "disabled") : disabled;

  const combinedClassName = `${baseStyle} ${paddingStyle} ${variantStyles[variant]} ${className}`.trim();

  // ✅ develop 기능 유지: trailing 있으면 span으로 렌더링(중첩 버튼 방지)
  if (trailing != null) {
    return (
      <span
        className={`${combinedClassName} cursor-default gap-1 ${isDisabled ? "opacity-50" : ""
          }`}
        aria-disabled={isDisabled ? true : undefined}
      >
        {children}
        {trailing}
      </span>
    );
  }

  return (
    <button type="button" disabled={isDisabled} className={combinedClassName} {...props}>
      {children}
    </button>
  );
}
