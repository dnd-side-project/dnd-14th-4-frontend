import { NoticeItem } from "./NoticeItem";


export const NoticeDetailPage = ({ id }: { id: string }) => {
    return (
        <div className="max-w-md mx-auto min-h-screen bg-white p-5">


            <NoticeItem
                title={id}
                date="2023.10.27"
                mode="detail"
            />

            <div className="flex flex-col gap-2 mt-5 type-caption1 text-label-default">
                <p>공지사항 내용입니다.</p>
            </div>
        </div>
    );
}