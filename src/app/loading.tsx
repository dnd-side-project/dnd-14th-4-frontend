"use client";

import { useEffect, useState } from "react";
import Loading from "@/shared/ui/Loading";

const SKIP_KEY = "__skip_root_loading_once__";

export default function RootLoading() {
    const [skip] = useState(() => {
        if (typeof window === "undefined") return false;
        try {
            return sessionStorage.getItem(SKIP_KEY) === "1";
        } catch {
            return false;
        }
    });

    useEffect(() => {
        if (!skip) return;
        try {
            sessionStorage.removeItem(SKIP_KEY);
        } catch {
            // ignore storage errors
        }
    }, [skip]);

    if (skip) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <Loading />
        </div>
    );
}
