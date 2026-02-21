import type { SVGProps } from "react";
const IcSvgFilter = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 26 23"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={1.4}
      d="M3.367 11.367V.7m0 10.667a2.667 2.667 0 1 0 0 5.333m0-5.333a2.667 2.667 0 1 1 0 5.333m18.666 5.334v-4m0 0a2.667 2.667 0 0 0 0-5.334m0 5.334a2.667 2.667 0 1 1 0-5.334M3.367 22.034V16.7m18.666-4V.7m-9.333 4v-4m0 4a2.667 2.667 0 1 0 0 5.334m0-5.334a2.667 2.667 0 0 1 0 5.334m0 12v-12"
    />
  </svg>
);
export default IcSvgFilter;
