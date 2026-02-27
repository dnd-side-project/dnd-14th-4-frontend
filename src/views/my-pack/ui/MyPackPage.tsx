"use client";

import { useState } from "react";
import { MyPack } from "@/views/my-pack/ui/components/MyPack";
import { ItemAdd } from "@/views/my-pack/ui/components/ItemAdd";

export const MyPackPage = () => {
    const [currentView, setCurrentView] = useState<"mypack" | "itemAdd">("mypack");
    const [selectedId, setSelectedId] = useState<string | undefined>();

    const handleGoToItemAdd = (id?: string) => {
        setSelectedId(id);
        setCurrentView("itemAdd");
    };

    const handleBackToMyPack = () => {
        setSelectedId(undefined);
        setCurrentView("mypack");
    };

    return (
        <>
            {currentView === "mypack" ? (
                <MyPack onGoToItemAdd={handleGoToItemAdd} />
            ) : (
                <ItemAdd
                    onBack={handleBackToMyPack}
                    initialSelectedItemIds={selectedId ? [selectedId] : []}
                />
            )}
        </>
    );
};