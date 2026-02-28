'use client';

import { useEffect, useRef } from 'react';
import { IcSvgCloseBig } from '@/shared/icons';
import { Tag2Btn } from '@/shared/ui/Tag2Btn';
import { motion, AnimatePresence } from 'framer-motion';
import { isProfileDefaultColor } from '@/entities/user/model';
import { PROFILE_COLOR_CLASS } from '@/views/my-page/ui/MyPage';

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    authorName: string;
    tag?: string;
    profileImageUrl?: string;
}

export function ProfileModal({ isOpen, onClose, authorName, tag, profileImageUrl }: ProfileModalProps) {

    const closeButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (isOpen) closeButtonRef.current?.focus();
    }, [isOpen]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
    };

    const profileInitial = authorName.charAt(0).toUpperCase();

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
                        role='dialog'
                        aria-modal='true'
                        onKeyDown={handleKeyDown}
                        aria-labelledby='profile-modal-title'
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    >
                        <div className='flex justify-end w-full'>
                            <button
                                ref={closeButtonRef}
                                type="button"
                                aria-label="닫기"
                                onClick={onClose}
                            >
                                <IcSvgCloseBig width={24} height={24} />
                            </button>
                        </div>

                        <div
                            className={`w-[115px] h-[115px] rounded-full flex items-center justify-center text-white text-xl font-bold overflow-hidden ${profileImageUrl && isProfileDefaultColor(profileImageUrl) ? PROFILE_COLOR_CLASS[profileImageUrl] ?? 'bg-neutral-300' : 'bg-neutral-300'}`}
                            style={profileImageUrl && !isProfileDefaultColor(profileImageUrl) ? { backgroundImage: `url(${profileImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
                        >
                            {(!profileImageUrl || isProfileDefaultColor(profileImageUrl)) && profileInitial}
                        </div>

                        <div className="text-center">
                            <h2 id='profile-modal-title' className="type-heading2 text-label-default">{authorName}</h2>
                        </div>


                        <div className='flex gap-2'>
                            {tag && <Tag2Btn status>{tag}</Tag2Btn>}
                        </div>
                    </motion.div>
                </div >
            )
            }
        </AnimatePresence >
    );
}