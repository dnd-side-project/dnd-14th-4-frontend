interface Props {
    count: number;
    maxCount: number;
    onClick: () => void;
}

export const ImageUploadBox = ({ count, maxCount, onClick }: Props) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="w-25 h-25 bg-black/52 rounded-lg flex flex-col items-center justify-center text-white"
        >
            <div className="relative mb-2 text-2xl">📸</div>
            <div className="type-label2">
                <span className="text-white">{count}</span>
                <span className="text-gray-400">/{maxCount}</span>
            </div>
        </button>
    );
};