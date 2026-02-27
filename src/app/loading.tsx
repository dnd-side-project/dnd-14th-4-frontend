import Loading from "@/shared/ui/Loading";

export default function RootLoading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <Loading />
        </div>
    );
}
