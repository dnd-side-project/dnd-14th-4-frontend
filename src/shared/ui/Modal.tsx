"use client";


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description?: string;
    cancelText?: string;
    confirmText?: string;
    onConfirm: () => void;
}

export const Modal = ({
    isOpen,
    onClose,
    title,
    description,
    cancelText = "취소",
    confirmText = "확인",
    onConfirm,
}: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5"
            onClick={onClose}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                className="w-full max-w-[335px] bg-white rounded-[16px] px-4 py-6 flex flex-col items-center shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 id="modal-title" className="type-headline2 text-label-default text-neutral-900  text-center">
                    {title}
                </h3>

                {description && (
                    <p className="type-caption2 text-status-destructive mb-6 mt-2 text-center">
                        {description}
                    </p>
                )}

                {/* Mainbuttons 추후 구현 시 */}
                <div className={`flex w-full gap-2 ${!description ? 'mt-4' : ''}`}>
                    <button
                        onClick={onClose}
                        className="flex-1 py-[13px] rounded-xl border border-neutral-200 text-neutral-900"
                    >
                        {cancelText}
                    </button>

                    <button
                        onClick={onConfirm}
                        className="flex-1 py-[13px] rounded-xl bg-neutral-900 text-white "
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};