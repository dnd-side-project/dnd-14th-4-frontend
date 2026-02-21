import { IcSvgAddSmall } from "../icons";

export function ItemAddButton({ onClick }: { onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="px-4 py-[39px] w-full rounded-[16px] border-none outline-none shadow-emphasize flex items-center justify-center text-label-subtler type-label1"
        >
            <IcSvgAddSmall width={24} height={24} className="text-label-subtler" />
            추가하기
        </button>
    )
}