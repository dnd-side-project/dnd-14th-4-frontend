"use client";

import { Toaster } from "react-hot-toast";

export function ToastProvider() {
    return (
        <Toaster
            position="bottom-center"
            toastOptions={{
                style: {
                    width: "335px",
                    height: "48px",
                    background: "#0000006E",
                    borderRadius: "8px",
                    color: "#fff",
                    padding: "0 20px",
                    boxShadow: "none",
                    fontSize: "15px",
                    fontWeight: 500,
                    marginBottom: "70px",
                },
                duration: 3000,
            }}
            containerStyle={{
                position: "absolute",
            }}
        />
    );
}