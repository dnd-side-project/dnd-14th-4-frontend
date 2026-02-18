"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { IcSvgCloseBig } from "@/shared/icons";
import { Variants } from "framer-motion";

interface BottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    onEdit?: () => void;
    onDelete?: () => void;
}

export const BottomSheet = ({ isOpen, onClose, title, onEdit, onDelete }: BottomSheetProps) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    const backdropVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const sheetVariants: Variants = {
        hidden: { y: "100%", transition: { type: "tween", duration: 0.3 } },
        visible: { y: 0, transition: { type: "spring", damping: 25, stiffness: 300 } },
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-end justify-center">
                    <motion.div
                        className="fixed inset-0 bg-black/50"
                        variants={backdropVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        onClick={onClose}
                    />

                    <motion.div
                        className="bg-white w-full max-w-md rounded-t-[20px] pb-10 relative z-10 overflow-hidden"
                        variants={sheetVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        <div className="w-full h-8 flex items-center justify-center pt-3 pb-5">
                            <div className="w-[36px] h-[4px] bg-gray-200 rounded-full"></div>
                        </div>

                        {title && (
                            <div className="flex flex-col mb-6">
                                <div className="flex items-center justify-between px-6">
                                    <h2 className="text-gray-900 font-bold text-[18px]">{title}</h2>
                                    <button onClick={onClose} className="p-1">
                                        <IcSvgCloseBig width={24} height={24} className="text-gray-900" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* MainButtons 추후에 추가 */}
                        <div className="px-6 flex flex-col gap-3">
                            <button
                                onClick={onEdit}
                                className="w-full h-[52px] rounded-[12px] bg-white border border-gray-200 text-gray-900 active:bg-gray-50 type-label1 flex items-center justify-center transition-colors"
                            >
                                수정하기
                            </button>
                            <button
                                onClick={onDelete}
                                className="w-full h-[52px] rounded-[12px] bg-gray-900 text-white active:bg-gray-800 type-label1 flex items-center justify-center transition-colors"
                            >
                                삭제하기
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};