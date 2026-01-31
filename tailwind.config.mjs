/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        common: {
          0: "var(--color-common-0)",
          100: "var(--color-common-100)",
        },
        neutral: {
          10: "var(--color-neutral-10)",
          20: "var(--color-neutral-20)",
          30: "var(--color-neutral-30)",
          40: "var(--color-neutral-40)",
          50: "var(--color-neutral-50)",
          60: "var(--color-neutral-60)",
          70: "var(--color-neutral-70)",
          80: "var(--color-neutral-80)",
          90: "var(--color-neutral-90)",
          95: "var(--color-neutral-95)",
          99: "var(--color-neutral-99)",
        },
        primary: {
          subtler: "var(--color-primary-subtler)",
          subtle: "var(--color-primary-subtle)",
          normal: "var(--color-primary-normal)",
          strong: "var(--color-primary-strong)",
          heavy: "var(--color-primary-heavy)",
        },
        label: {
          default: "var(--color-label-default)",
          subtle: "var(--color-label-subtle)",
          subtler: "var(--color-label-subtler)",
        },
        line: {
          normal: "var(--color-line-normal)",
          alternative: "var(--color-line-alternative)",
        },
        background: {
          normal: "var(--color-background-normal)",
          alternative: "var(--color-background-alternative)",
        },
      },
    },
  },
};
