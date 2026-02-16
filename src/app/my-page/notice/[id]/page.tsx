import { NoticeDetailPage } from "@/views/notice/components/NoticeDetailPage";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
    const { id } = await params;
    return <NoticeDetailPage id={id} />;
}