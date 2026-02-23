'use client';

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import IconButton from '@/shared/ui/IconBtn';
import { FAB_HIDE_RULES } from '@/shared/constants/fav.constants';

const menuVariants = {
    open: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1, // 0.1초 간격으로 차례대로 촤르륵 나옴
            delayChildren: 0.05,
            staggerDirection: -1 // 아래서부터 위로 순차적 실행
        }
    },
    closed: {
        opacity: 0,
        transition: {
            staggerChildren: 0.05,
            staggerDirection: 1
        }
    }
};

const itemVariants: Variants = {
    open: {
        opacity: 1,
        y: 0,
        x: 0,
        rotate: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 25
        }
    },
    closed: {
        opacity: 0,
        y: 80,
        rotate: -20,
        scale: 0.4
    }
};

export default function FabMenu() {
    const pathname = usePathname();
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    const [prevPathname, setPrevPathname] = useState(pathname);

    if (pathname !== prevPathname) {
        setPrevPathname(pathname);
        setIsOpen(false);
    }

    const shouldHideFab = (currentPath: string) => {
        return FAB_HIDE_RULES.some((rule) => {
            if (rule.endsWith('*')) {
                return currentPath.startsWith(rule.replace('*', ''));
            }
            return currentPath === rule;
        });
    };

    const toggleMenu = () => setIsOpen((prev) => !prev);

    if (shouldHideFab(pathname)) return null;

    return (
        <div className="flex flex-col items-center gap-4 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="fab-menu"
                        className="flex flex-col items-center gap-4"
                        variants={menuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                    >
                        <motion.div variants={itemVariants}>
                            <IconButton
                                variant="pack"
                                onClick={() => router.push('/pack-create/step-1')}
                            />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <IconButton
                                variant="item"
                                onClick={() => router.push('/items-create')}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
            >
                <IconButton
                    variant={isOpen ? 'close' : 'plus'}
                    onClick={toggleMenu}
                />
            </motion.div>
        </div>
    );
}