import { ItemForm } from "@/features/items-create/ui/ItemForm";

export default function ItemCreatePage() {
    return (
        <main className="max-w-md mx-auto px-5 py-8">
            <header className="mb-10">
                <h2 className="text-2xl font-bold leading-tight">
                    <span className="text-pink-500 font-extrabold">닉네임</span>님이 추천하는<br />
                    인생 아이템은
                </h2>
            </header>

            <ItemForm />

        </main>
    );
}