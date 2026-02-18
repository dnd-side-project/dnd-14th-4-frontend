import { PackDetailPage } from "@/views/pack-detail/ui/PackDetailPage";

export default function Page({ params }: { params: { id: string } }) {
    return <PackDetailPage id={params.id} />;
}