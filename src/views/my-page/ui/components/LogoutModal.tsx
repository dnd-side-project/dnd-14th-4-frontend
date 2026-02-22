"use client";

import { useRouter } from "next/navigation";
import { Modal } from "@/shared/ui/Modal";
import { useUserStore } from "@/entities/user/model";

interface LogoutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const LogoutModal = ({ isOpen, onClose }: LogoutModalProps) => {
    const router = useRouter();
    const logout = useUserStore((s) => s.logout);

    const handleLogout = () => {
        logout();
        onClose();
        router.replace("/login");
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="로그아웃 하시겠어요?"
            confirmText="로그아웃"
            onConfirm={handleLogout}
        />
    );
};