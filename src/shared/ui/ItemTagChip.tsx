export default function ItemTagChip({ children }: { children: React.ReactNode }) {
    return (
        <div className="type-caption2 rounded-full bg-neutral-95 text-label-subtle px-3 py-0.5">
            #{children}
        </div>
    )
}