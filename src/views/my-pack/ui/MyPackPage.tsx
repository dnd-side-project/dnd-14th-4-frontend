"use client";

import { useState } from "react";
import { MyPack } from "@/views/my-pack/ui/components/MyPack";
import { ItemAdd } from "@/views/my-pack/ui/components/ItemAdd";

export const MyPackPage = () => {
    const [currentView, setCurrentView] = useState<"mypack" | "itemAdd">("mypack");

    const handleGoToItemAdd = () => setCurrentView("itemAdd");

    const handleBackToMyPack = () => setCurrentView("mypack");

    return (
        <>
            {currentView === "mypack" ? (
                <MyPack onGoToItemAdd={handleGoToItemAdd} />
            ) : (
                <ItemAdd onBack={handleBackToMyPack} />
            )}
        </>
    );
};