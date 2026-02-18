import { useState } from "react";
import { useRouter } from "next/navigation";
import { appToast } from "@/shared/utils/toast";
import { ItemData } from "@/shared/ui/item/ItemBox";

export const useMyPack = () => {
    const router = useRouter();

    // 1. 탭 & 선택 모드 상태
    const [activeTab, setActiveTab] = useState<"item" | "pack">("item");
    const [isSelectMode, setIsSelectMode] = useState(false);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    // 2. 모달 & 바텀시트 상태 (이름을 명확하게 변경!)
    const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false); // 수정/삭제 띄우는 바텀시트
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isItemDetailOpen, setIsItemDetailOpen] = useState(false); // 아이템 상세 띄우는 바텀시트
    const [selectedItem, setSelectedItem] = useState<ItemData | null>(null);

    const [activeMoreId, setActiveMoreId] = useState<string | null>(null);

    // --- Handlers ---
    const handleTabChange = (tab: "item" | "pack") => {
        setActiveTab(tab);
        setIsSelectMode(false);
        setSelectedIds([]);
    };

    const toggleSelectMode = () => {
        setIsSelectMode((prev) => !prev);
        setSelectedIds([]);
    };

    const handleSelect = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const handleDetailClick = (item: ItemData) => {
        setSelectedItem(item);
        setIsItemDetailOpen(true);
    };

    const handleMoreClick = (id: string) => {
        setActiveMoreId(id);
        setIsMoreMenuOpen(true);
    };
    const onClickDeleteMenu = () => {
        setIsMoreMenuOpen(false);
        setIsDeleteModalOpen(true);
    };

    const handleFinalDelete = () => {
        setIsDeleteModalOpen(false);
        appToast.success("삭제되었습니다.");
    };

    const handleEditRedirect = () => {
        setIsMoreMenuOpen(false);
        if (activeMoreId) {
            router.push(`/items-edit/${activeMoreId}`);
        }
    };

    const handleCreatePack = () => {
        if (selectedIds.length === 0) return;
        router.push(`/pack-create?ids=${selectedIds.join(",")}`);
    };

    return {
        state: { activeTab, isSelectMode, selectedIds, isMoreMenuOpen, isDeleteModalOpen, isItemDetailOpen, selectedItem, activeMoreId },
        actions: {
            handleTabChange, toggleSelectMode, handleSelect, handleDetailClick,
            handleMoreClick, onClickDeleteMenu, handleFinalDelete, handleEditRedirect, handleCreatePack,
            setIsMoreMenuOpen, setIsDeleteModalOpen, setIsItemDetailOpen
        }
    };
};