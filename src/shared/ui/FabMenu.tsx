'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import IconButton from '@/shared/ui/IconBtn';
import { FAB_HIDE_RULES } from '@/shared/constants/nav.constants';

const menuVariants = {
    open: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        }
    },
    closed: {
        opacity: 0,
        transition: {
            staggerChildren: 0.1,
            staggerDirection: -1
        }
    }
};

const itemVariants = {
    open: { opacity: 1, y: 0, scale: 1 },
    closed: { opacity: 0, y: 20, scale: 0.8 }
};

export default function FabMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

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
                                onClick={() => console.log('Pack 클릭됨')}
                            />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <IconButton
                                variant="item"
                                onClick={() => console.log('Item 클릭됨')}
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