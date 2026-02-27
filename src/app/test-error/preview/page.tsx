"use client";

import { ServerError } from "@/views/error/ui/ServerError";

export default function ErrorPreviewPage() {
    return <ServerError reset={() => window.location.reload()} />;
}
