"use client";

import { AnimatePresence, motion, Variants } from "framer-motion";
import { useEffect, ReactNode } from "react";
import { IcSvgCloseBig } from "@/shared/icons";

interface BottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children?: ReactNode;
}

export const BottomSheet = ({ isOpen, onClose, title, children }: BottomSheetProps) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => { document.body.style.overflow = "auto"; };
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
                        initial="hidden" animate="visible" exit="hidden"
                        onClick={onClose}
                    />

                    <motion.div
                        className="bg-white w-full max-w-md rounded-t-[20px] pb-10 relative z-10 overflow-hidden"
                        variants={sheetVariants}
                        initial="hidden" animate="visible" exit="hidden"
                    >
                        <div className="w-full h-8 flex items-center justify-center pt-3 pb-5">
                            <div className="w-[36px] h-[4px] bg-gray-200 rounded-full" />
                        </div>

                        <div className="flex items-center justify-between px-6 mb-6">
                            <h2 className="text-gray-900 font-bold text-[18px]">
                                {title}
                            </h2>
                            {title && (
                                <button onClick={onClose} className="p-1">
                                    <IcSvgCloseBig width={24} height={24} className="text-gray-900" />
                                </button>
                            )}
                        </div>

                        <div className="px-6">
                            {children}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};