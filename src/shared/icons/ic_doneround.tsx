import type { SVGProps } from "react";
const IcSvgDoneRound = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentColor"
      d="M0 12C0 5.373 5.373 0 12 0s12 5.373 12 12-5.373 12-12 12S0 18.627 0 12"
    />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeWidth={2}
      d="m5 14 3.233 2.425a1 1 0 0 0 1.374-.167L18 6"
    />
  </svg>
);
export default IcSvgDoneRound;
