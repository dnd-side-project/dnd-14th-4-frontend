"use client";

import { IcSvgFilter } from "@/shared/icons";
import TabItem from "@/shared/ui/TabItem";
import { PackCard } from "@/shared/ui/item/PackCard";
import { ItemCard, MOCK_ITEM_CARDS } from "@/shared/ui/item/ItemCard";
import { BottomSheet } from "@/shared/ui/BottomSheet";
import { Modal } from "@/shared/ui/Modal";
import { FixedBottomButton } from "@/shared/ui/FixedBottomButton";
import { ItemBox } from "@/shared/ui/item/ItemBox";
import { MOCK_ITEMS, MOCK_PACK_CARDS } from "@/features/search/model/mock";
import { useMyPack } from "@/views/my-pack/model/useMyPack";
import { useMyPackItems } from "@/views/my-pack/model/useMyPackItems";

export const MyPackPage = () => {
    const { state, actions } = useMyPack();
    const { items: apiItems, isLoading, isError, hasToken } = useMyPackItems();

    const itemCards = apiItems.length > 0 ? apiItems : MOCK_ITEM_CARDS;

    return (
        <div className="px-6 pb-24">
            <header className="flex items-center justify-between mt-16 mb-10">
                <div className="w-12 h-12 bg-common-100 rounded-full" />
                <div role="tablist" className="flex gap-7 w-37">
                    <TabItem isActive={state.activeTab === "item"} onClick={() => actions.handleTabChange("item")}>
                        아이템
                    </TabItem>
                    <TabItem isActive={state.activeTab === "pack"} onClick={() => actions.handleTabChange("pack")}>
                        팩
                    </TabItem>
                </div>
                <div className="flex items-center gap-3">
                    <IcSvgFilter width={24} height={24} className="text-label-subtle" />
                    <button
                        onClick={actions.toggleSelectMode}
                        className={`type-label1 transition-colors ${state.isSelectMode ? "text-primary-normal font-bold" : "text-label-subtle"}`}
                    >
                        {state.isSelectMode ? "취소" : "선택"}
                    </button>
                </div>
            </header>

            {state.activeTab === "item" && !hasToken && (
                <p className="text-label-subtle type-caption mb-2">
                    테스트: 개발자도구 → Application → Local Storage에서 accessToken = &quot;user_1&quot; 저장 후 새로고침하면 API 데이터 5개가 표시됩니다.
                </p>
            )}

            <div className="flex flex-col gap-3">
                {state.activeTab === "item" && isLoading && (
                    <p className="text-label-subtle type-body2">로딩 중...</p>
                )}
                {state.activeTab === "item" && !isLoading && isError && (
                    <p className="text-label-subtle type-body2">아이템을 불러오지 못했어요. (테스트 시 시드 API 호출 후 accessToken을 user_1로 설정해 주세요.)</p>
                )}
                {state.activeTab === "item" && !isLoading &&
                    itemCards.map((card) => (
                        <ItemCard
                            key={card.id}
                            {...card}
                            isSelectMode={state.isSelectMode}
                            isChecked={state.selectedIds.includes(card.id)}
                            onSelect={actions.handleSelect}
                            onDetailClick={() => actions.handleDetailClick(MOCK_ITEMS[0])}
                            onMoreClick={() => actions.handleMoreClick(card.id)}
                        />
                    ))}
                {state.activeTab === "pack" &&
                    MOCK_PACK_CARDS.map((card) => (
                        <PackCard key={card.id} {...card} onMoreClick={() => actions.handleMoreClick(card.id)} />
                    ))}
            </div>

            {state.activeTab === "item" && state.isSelectMode && state.selectedIds.length > 0 && (
                <FixedBottomButton onClick={actions.handleCreatePack}>
                    팩 만들기
                </FixedBottomButton>
            )}

            {/* mainbutton 수정 예정 */}
            <BottomSheet isOpen={state.isMoreMenuOpen} onClose={() => actions.setIsMoreMenuOpen(false)}>
                <div className="flex flex-col gap-3">
                    <button onClick={actions.handleEditRedirect} className="w-full h-[52px] rounded-[12px] border border-gray-200 text-gray-900 font-medium">
                        수정하기
                    </button>
                    <button onClick={actions.onClickDeleteMenu} className="w-full h-[52px] rounded-[12px] bg-gray-900 text-white font-medium">
                        삭제하기
                    </button>
                </div>
            </BottomSheet>

            <Modal
                isOpen={state.isDeleteModalOpen}
                onClose={() => actions.setIsDeleteModalOpen(false)}
                title="아이템을 삭제할까요?"
                confirmText="삭제하기"
                onConfirm={actions.handleFinalDelete}
            />

            <BottomSheet isOpen={state.isItemDetailOpen} onClose={() => actions.setIsItemDetailOpen(false)}>
                <div className="mb-6">
                    {state.selectedItem && <ItemBox item={MOCK_ITEMS[0]} />}
                </div>
                {/* mainbutton 수정 예정 */}
                <div className="flex gap-3">
                    <button className="flex-1 h-[52px] rounded-[12px] bg-beige-100 text-gray-900 font-medium active:bg-beige-200">
                        팩 추가하기
                    </button>
                    <button className="flex-1 h-[52px] rounded-[12px] bg-primary-normal text-white font-medium active:opacity-90">
                        팩 만들기
                    </button>
                </div>
            </BottomSheet>
        </div>
    );
};