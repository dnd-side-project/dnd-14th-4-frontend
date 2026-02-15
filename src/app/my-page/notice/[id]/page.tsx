import { NoticeDetailPage } from "@/views/notice/components/NoticeDetailPage";

type Props = {
    params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
    const resolvedParams = await params;
    const noticeId = resolvedParams.id;

    return <NoticeDetailPage id={noticeId} />;
}