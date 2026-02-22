'use client';

import { IcSvgCloseBig } from '@/shared/icons';
import { Tag2Btn } from '@/shared/ui/Tag2Btn';
import { motion, AnimatePresence } from 'framer-motion';

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    authorName: string;
}

export function ProfileModal({ isOpen, onClose, authorName }: ProfileModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 ">
                    <motion.div
                        className="absolute inset-0 bg-black/50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    <motion.div
                        className="relative w-full max-w-sm bg-white rounded-2xl px-4 pb-12 flex flex-col items-center justify-center gap-4 h-[323px]"
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    >
                        <div className='flex justify-end w-full'>
                            <IcSvgCloseBig onClick={onClose} width={24} height={24} />
                        </div>

                        <div className="w-[115px] h-[115px] bg-common-100 rounded-full" />

                        <div className="text-center">
                            <h2 className="type-heading2 text-label-default">{authorName}</h2>
                        </div>


                        <div className='flex gap-2'>
                            <Tag2Btn status>공부/시험</Tag2Btn>
                            <Tag2Btn status>면접/취준</Tag2Btn>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}