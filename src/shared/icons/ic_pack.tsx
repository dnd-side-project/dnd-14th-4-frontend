import type { SVGProps } from "react";
const IcSvgPack = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 352 138"
    {...props}
  >
    <g filter="url(#Pack_svg__a)">
      <path
        fill="#EDEAE4"
        d="M8.5 26c0-11.046 8.954-20 20-20h295c11.046 0 20 8.954 20 20v82c0 11.046-8.954 20-20 20h-295c-11.046 0-20-8.954-20-20z"
        shapeRendering="crispEdges"
      />
      <path
        fill="#fff"
        d="M8 26C8 14.955 16.954 6 28 6h196.464c4.654 0 9.162 1.623 12.747 4.589l28.741 23.772a20 20 0 0 0 12.747 4.589H323.5c11.046 0 20 8.954 20 20V108c0 11.046-8.954 20-20 20H28c-11.046 0-20-8.954-20-20z"
      />
    </g>
    <defs>
      <filter
        id="Pack_svg__a"
        width={351.5}
        height={138}
        x={0}
        y={0}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset />
        <feGaussianBlur stdDeviation={0.5} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_2670_1497"
        />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={1} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" />
        <feBlend
          in2="effect1_dropShadow_2670_1497"
          result="effect2_dropShadow_2670_1497"
        />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={2} />
        <feGaussianBlur stdDeviation={4} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
        <feBlend
          in2="effect2_dropShadow_2670_1497"
          result="effect3_dropShadow_2670_1497"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect3_dropShadow_2670_1497"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default IcSvgPack;
