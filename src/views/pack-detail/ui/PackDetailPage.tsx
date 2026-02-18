
interface PackDetailPageProps {
    id: string;
}

export const PackDetailPage = ({ id }: PackDetailPageProps) => {
    return (
        <div className="px-6 py-10">
            <header className="mb-8">
                <h1 className="text-2xl font-bold text-neutral-900">아이템 상세 정보</h1>
            </header>

            <main className="rounded-2xl bg-neutral-50 p-8 border border-neutral-100">
                <p className="text-neutral-500 text-sm">아이템 ID</p>
                <p className="text-2xl font-mono font-bold text-primary-600">{id}</p>
            </main>
        </div>
    );
};