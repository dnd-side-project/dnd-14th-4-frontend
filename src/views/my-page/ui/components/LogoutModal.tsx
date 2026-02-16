'use client';


interface LogoutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const LogoutModal = ({ isOpen, onClose }: LogoutModalProps) => {

    if (!isOpen) return null;

    const handleLogout = async () => {
        try {
            console.log("서버에 로그아웃 요청, 토큰 삭제 진행!");
            onClose();
        } catch (error) {
            console.error("로그아웃 실패:", error);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5"
            onClick={onClose}
        >
            <div
                className="w-full max-w-[320px] bg-white rounded-[24px] p-6 flex flex-col items-center shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="text-[18px] font-semibold text-neutral-900 mt-2 mb-6">
                    로그아웃 하시겠어요?
                </h3>

                <div className="flex w-full gap-2">
                    {/* 추후에 mainbutton으로  수정 */}
                    <button
                        onClick={onClose}
                        className="flex-1 py-3.5 rounded-xl border border-neutral-200 text-neutral-900 font-medium hover:bg-neutral-50 transition-colors"
                    >
                        취소
                    </button>

                    <button
                        onClick={handleLogout}
                        className="flex-1 py-3.5 rounded-xl bg-neutral-900 text-white font-medium hover:bg-neutral-800 transition-colors"
                    >
                        로그아웃
                    </button>
                </div>
            </div>
        </div>
    );
};