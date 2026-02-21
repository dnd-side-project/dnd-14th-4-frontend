"use client";

import { Modal } from "@/shared/ui/Modal";

interface LogoutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const LogoutModal = ({ isOpen, onClose }: LogoutModalProps) => {
    const handleLogout = async () => {
        try {
            console.log("서버에 로그아웃 요청 진행!");
            onClose();
        } catch (error) {
            console.error("로그아웃 실패:", error);
        }
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