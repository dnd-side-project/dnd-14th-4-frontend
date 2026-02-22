import { useReducer } from "react";
import { useRouter } from "next/navigation";
import { appToast } from "@/shared/utils/toast";
import { ItemData } from "@/shared/ui/item/ItemBox";

interface State {
    activeTab: "item" | "pack";
    isSelectMode: boolean;
    selectedIds: string[];
    isMoreMenuOpen: boolean;
    isDeleteModalOpen: boolean;
    isItemDetailOpen: boolean;
    selectedItem: ItemData | null;
    activeMoreId: string | null;
}

type Action =
    | { type: "SET_TAB"; payload: "item" | "pack" }
    | { type: "TOGGLE_SELECT_MODE" }
    | { type: "TOGGLE_ITEM_SELECTION"; payload: string }
    | { type: "OPEN_ITEM_DETAIL"; payload: ItemData }
    | { type: "OPEN_MORE_MENU"; payload: string }
    | { type: "OPEN_DELETE_MODAL" }
    | { type: "COMPLETE_DELETE" }
    | { type: "SET_MODAL_STATE"; modal: "isMoreMenuOpen" | "isDeleteModalOpen" | "isItemDetailOpen"; isOpen: boolean };

const initialState: State = {
    activeTab: "item",
    isSelectMode: false,
    selectedIds: [],
    isMoreMenuOpen: false,
    isDeleteModalOpen: false,
    isItemDetailOpen: false,
    selectedItem: null,
    activeMoreId: null,
};

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_TAB":
            return { ...state, activeTab: action.payload, isSelectMode: false, selectedIds: [] };
        case "TOGGLE_SELECT_MODE":
            return { ...state, isSelectMode: !state.isSelectMode, selectedIds: [] };
        case "TOGGLE_ITEM_SELECTION":
            return {
                ...state,
                selectedIds: state.selectedIds.includes(action.payload)
                    ? state.selectedIds.filter((i) => i !== action.payload)
                    : [...state.selectedIds, action.payload],
            };
        case "OPEN_ITEM_DETAIL":
            return { ...state, selectedItem: action.payload, isItemDetailOpen: true };
        case "OPEN_MORE_MENU":
            return { ...state, activeMoreId: action.payload, isMoreMenuOpen: true };
        case "OPEN_DELETE_MODAL":
            return { ...state, isMoreMenuOpen: false, isDeleteModalOpen: true };
        case "COMPLETE_DELETE":
            return { ...state, isDeleteModalOpen: false, activeMoreId: null };
        case "SET_MODAL_STATE":
            return { ...state, [action.modal]: action.isOpen };
        default:
            return state;
    }
};

export const useMyPack = () => {
    const router = useRouter();
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleTabChange = (tab: "item" | "pack") => dispatch({ type: "SET_TAB", payload: tab });
    const toggleSelectMode = () => dispatch({ type: "TOGGLE_SELECT_MODE" });
    const handleSelect = (id: string) => dispatch({ type: "TOGGLE_ITEM_SELECTION", payload: id });
    const handleDetailClick = (item: ItemData) => dispatch({ type: "OPEN_ITEM_DETAIL", payload: item });
    const handleMoreClick = (id: string) => dispatch({ type: "OPEN_MORE_MENU", payload: id });
    const onClickDeleteMenu = () => dispatch({ type: "OPEN_DELETE_MODAL" });

    const handleFinalDelete = () => {
        dispatch({ type: "COMPLETE_DELETE" });
        appToast.success("삭제되었습니다.");
    };

    const handleEditRedirect = () => {
        dispatch({ type: "SET_MODAL_STATE", modal: "isMoreMenuOpen", isOpen: false });

        if (state.activeMoreId) {
            if (state.activeTab === "item") {
                router.push(`/items-edit/${state.activeMoreId}`);
            } else if (state.activeTab === "pack") {
                router.push(`/pack/${state.activeMoreId}?mode=edit`);
            }
        }
    };

    const handleCreatePack = () => {
        if (state.selectedIds.length === 0) return;
        router.push(`/pack-create?ids=${state.selectedIds.join(",")}`);
    };

    const setIsMoreMenuOpen = (isOpen: boolean) => dispatch({ type: "SET_MODAL_STATE", modal: "isMoreMenuOpen", isOpen });
    const setIsDeleteModalOpen = (isOpen: boolean) => dispatch({ type: "SET_MODAL_STATE", modal: "isDeleteModalOpen", isOpen });
    const setIsItemDetailOpen = (isOpen: boolean) => dispatch({ type: "SET_MODAL_STATE", modal: "isItemDetailOpen", isOpen });

    return {
        state,
        actions: {
            handleTabChange, toggleSelectMode, handleSelect, handleDetailClick,
            handleMoreClick, onClickDeleteMenu, handleFinalDelete, handleEditRedirect, handleCreatePack,
            setIsMoreMenuOpen, setIsDeleteModalOpen, setIsItemDetailOpen
        }
    };
};