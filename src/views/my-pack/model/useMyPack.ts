import { useReducer } from "react";
import { useRouter } from "next/navigation";
import { Item } from "@/entities/item/model/types";
import { useDeleteItem } from "@/entities/item/model/useDeleteItem";
import { useDeletePack } from "@/entities/pack/model/useDeletePack";
import { usePackCreateItemsStore } from "@/views/pack-create/features/select-pack-items/model/store";
import { mapApiItemToPackCreateItem } from "@/views/pack-create/shared/model/itemMappers";

interface State {
    activeTab: "item" | "pack";
    isSelectMode: boolean;
    selectedIds: string[];
    isMoreMenuOpen: boolean;
    isDeleteModalOpen: boolean;
    isItemDetailOpen: boolean;
    selectedItem: Item | null;
    activeMoreId: string | null;
    isFilterOpen: boolean;
    selectedFilter: string[];
}

type Action =
    | { type: "SET_TAB"; payload: "item" | "pack" }
    | { type: "TOGGLE_SELECT_MODE" }
    | { type: "TOGGLE_ITEM_SELECTION"; payload: string }
    | { type: "OPEN_ITEM_DETAIL"; payload: Item }
    | { type: "OPEN_MORE_MENU"; payload: string }
    | { type: "OPEN_DELETE_MODAL" }
    | { type: "COMPLETE_DELETE" }
    | { type: "SET_MODAL_STATE"; modal: "isMoreMenuOpen" | "isDeleteModalOpen" | "isItemDetailOpen"; isOpen: boolean }
    | { type: "TOGGLE_FILTER" }
    | { type: "SET_FILTER"; payload: string | null };

const initialState: State = {
    activeTab: "item",
    isSelectMode: false,
    selectedIds: [],
    isMoreMenuOpen: false,
    isDeleteModalOpen: false,
    isItemDetailOpen: false,
    selectedItem: null,
    activeMoreId: null,
    isFilterOpen: false,
    selectedFilter: [],
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

        case "TOGGLE_FILTER":
            return { ...state, isFilterOpen: !state.isFilterOpen };
        case "SET_FILTER":
            if (action.payload === null) return { ...state, selectedFilter: [] };
            return {
                ...state,
                selectedFilter: state.selectedFilter.includes(action.payload)
                    ? state.selectedFilter.filter((f) => f !== action.payload)
                    : [...state.selectedFilter, action.payload]
            };
        default:
            return state;
    }
};

export const useMyPack = () => {
    const router = useRouter();
    const [state, dispatch] = useReducer(reducer, initialState);
    const { mutate: deleteItemMutation } = useDeleteItem();
    const { mutate: deletePackMutation } = useDeletePack();
    const resetPackCreateStore = usePackCreateItemsStore((s) => s.reset);
    const addPackCreateItem = usePackCreateItemsStore((s) => s.add);

    const handleTabChange = (tab: "item" | "pack") => dispatch({ type: "SET_TAB", payload: tab });
    const toggleSelectMode = () => dispatch({ type: "TOGGLE_SELECT_MODE" });
    const handleSelect = (id: string) => dispatch({ type: "TOGGLE_ITEM_SELECTION", payload: id });
    const handleDetailClick = (item: Item) => dispatch({ type: "OPEN_ITEM_DETAIL", payload: item });
    const handleMoreClick = (id: string) => dispatch({ type: "OPEN_MORE_MENU", payload: id });
    const onClickDeleteMenu = () => dispatch({ type: "OPEN_DELETE_MODAL" });

    const toggleFilter = () => dispatch({ type: "TOGGLE_FILTER" });
    const handleFilterSelect = (filter: string) => dispatch({ type: "SET_FILTER", payload: filter });

    const handleFinalDelete = () => {
        if (!state.activeMoreId) return;

        if (state.activeTab === "item") {
            deleteItemMutation(state.activeMoreId, {
                onSuccess: () => {
                    dispatch({ type: "COMPLETE_DELETE" });
                }
            });
        } else {
            deletePackMutation(state.activeMoreId, {
                onSuccess: () => {
                    dispatch({ type: "COMPLETE_DELETE" });
                }
            });
        }
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

    const handleCreatePack = (items?: Item[]) => {
        if (state.selectedIds.length === 0) return;
        // Step1SelectItemsPage는 스토어(selected)를 그대로 사용하므로, 이동 전에 미리 채워준다.
        resetPackCreateStore();
        if (Array.isArray(items) && items.length > 0) {
            state.selectedIds.forEach((id) => {
                const found = items.find((x) => String(x.id) === String(id));
                if (found) addPackCreateItem(mapApiItemToPackCreateItem(found));
            });
        }
        router.push(`/pack-create/step-1?ids=${state.selectedIds.join(",")}`);
    };

    const handleCreatePackBySelected = (item: Item) => {
        resetPackCreateStore();
        addPackCreateItem(mapApiItemToPackCreateItem(item));
        router.push("/pack-create/step-1");
    };

    const setIsMoreMenuOpen = (isOpen: boolean) => dispatch({ type: "SET_MODAL_STATE", modal: "isMoreMenuOpen", isOpen });
    const setIsDeleteModalOpen = (isOpen: boolean) => dispatch({ type: "SET_MODAL_STATE", modal: "isDeleteModalOpen", isOpen });
    const setIsItemDetailOpen = (isOpen: boolean) => dispatch({ type: "SET_MODAL_STATE", modal: "isItemDetailOpen", isOpen });

    return {
        state,
        actions: {
            handleTabChange, toggleSelectMode, handleSelect, handleDetailClick,
            handleMoreClick, onClickDeleteMenu, handleFinalDelete, handleEditRedirect, handleCreatePack,
            handleCreatePackBySelected,
            setIsMoreMenuOpen, setIsDeleteModalOpen, setIsItemDetailOpen,
            toggleFilter, handleFilterSelect
        }
    };
};