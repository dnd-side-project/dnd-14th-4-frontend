'use client';

import { motion } from 'framer-motion';

interface PaginationProps {
    total: number;
    current: number;
    onChange?: (page: number) => void;
}

export default function Pagination({ total, current, onChange }: PaginationProps) {
    return (
        <div className="flex items-center justify-center gap-2 py-4">
            {Array.from({ length: total }).map((_, index) => {
                const isActive = index === current;

                return (
                    <motion.div
                        key={index}
                        onClick={() => onChange?.(index)}
                        animate={{
                            width: isActive ? 21 : 8,
                            backgroundColor: isActive ? 'var(--color-label-default)' : 'var(--color-label-subtler)',
                        }}
                        transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 30
                        }}
                        className="h-2 rounded-full cursor-pointer"
                    />
                );
            })}
        </div>
    );
}