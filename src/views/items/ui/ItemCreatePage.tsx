"use client";

import { ItemForm } from "@/features/items/ui/ItemForm";
import { BackHeader } from "@/shared/ui/BackHeader";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/entities/user/model";

export default function ItemCreatePage() {
    const { user } = useUserStore();
    const router = useRouter();


    return (
        <>
            <BackHeader onBack={() => router.back()} ></BackHeader>
            <main className="max-w-md mx-auto px-5 py-8">
                <header className="mb-10">
                    <h2 className="text-2xl font-bold leading-tight">
                        <span className="text-pink-500 font-extrabold">{user?.name}</span>님이 추천하는<br />
                        인생 아이템은
                    </h2>
                </header>

                <ItemForm />

            </main>
        </>
    );
}