import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "왓츠인마이팩",
        short_name: "왓츠인마이팩",
        description: "왓츠인마이팩",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        id: "/",
        icons: [
            {
                src: "/icons/icon-192.svg",
                sizes: "192x192",
                type: "image/svg+xml",
            },
            {
                src: "/icons/icon-512.svg",
                sizes: "512x512",
                type: "image/svg+xml",
            },
            {
                src: "/favicon.svg",
                sizes: "any",
                type: "image/svg+xml",
            },
        ],
    };
}