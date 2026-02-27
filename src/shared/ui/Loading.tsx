"use client";

import Lottie from "lottie-react";
import loadingData from "../../../public/loading.json";

export default function Loading() {
    return (
        <div className="flex items-center justify-center w-full h-full min-h-[400px]">
            <div className="w-48 h-48">
                <Lottie
                    animationData={loadingData}
                    loop={true}
                />
            </div>
        </div>
    );
}
