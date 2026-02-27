"use client";

import { useEffect } from "react";
import { ServerError } from "@/views/error/ui/ServerError";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Global Error:", error);
    }, [error]);

    return <ServerError reset={reset} />;
}
