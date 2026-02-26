import withPWAInit from "@ducanh2912/next-pwa";
import type { NextConfig } from "next";

const withPWA = withPWAInit({
  dest: "public",       // 서비스 워커 파일이 저장될 위치
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === "development", // 개발 모드에서는 PWA 비활성화 (선택 사항)
  workboxOptions: {
    disableDevLogs: true,
  },

});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'whatsinmypack.s3.ap-northeast-2.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
};

export default withPWA(nextConfig);