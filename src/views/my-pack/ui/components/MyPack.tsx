"use client";

import { useMemo } from "react";
import { IcSvgFilter } from "@/shared/icons";
import TabItem from "@/shared/ui/TabItem";
import { PackCard } from "@/shared/ui/item/PackCard";
import { ItemCard } from "@/shared/ui/item/ItemCard";
import { BottomSheet } from "@/shared/ui/BottomSheet";
import { Modal } from "@/shared/ui/Modal";
import { FixedBottomButton } from "@/shared/ui/FixedBottomButton";
import { ItemBox } from "@/shared/ui/item/ItemBox";
import { useMyPack } from "@/views/my-pack/model/useMyPack";
import Tag1Btn from "@/shared/ui/Tag1Btn";
import { MOMENT_OPTIONS } from "@/views/onboarding/model/constants";
import { useGetItems } from "@/entities/item/model/useGetItems";
import { useUserStore, isProfileDefaultColor } from "@/entities/user/model";
import { PROFILE_COLOR_CLASS } from "@/views/my-page/ui/MyPage";
import { useGetMyPacks } from "@/entities/pack/model/useGetMyPacks";

interface MyPackProps {
    onGoToItemAdd: (id?: string) => void;
}

export const MyPack = ({ onGoToItemAdd }: MyPackProps) => {
    const { state, actions } = useMyPack();
    const { user } = useUserStore();

    const { data: itemData, isLoading: isItemLoading, isError: isItemError } = useGetItems();
    const { data: packData, isLoading: isPackLoading, isError: isPackError } = useGetMyPacks();

    const sortedPackData = useMemo(() => {
        if (!packData) return [];
        let filteredPacks = [...packData].reverse();

        if (state.selectedFilter && state.selectedFilter.length > 0) {
            filteredPacks = filteredPacks.filter(pack =>
                state.selectedFilter.includes(pack.contextCategory)
            );
        }

        return filteredPacks;
    }, [packData, state.selectedFilter]);

    const nickname = user?.name ?? "사용자";
    const profileImageUrl = user?.profileImageUrl;
    const profileInitial = nickname.charAt(0).toUpperCase();

    const isItemTab = state.activeTab === "item";
    const isPackTab = state.activeTab === "pack";

    const isItemEmpty =
        !isItemLoading && !isItemError && Array.isArray(itemData) && itemData.length === 0;
    const isPackEmpty =
        !isPackLoading && !isPackError && Array.isArray(sortedPackData) && sortedPackData.length === 0;

    return (
        <div className="px-4 pb-24">
            <div className="flex items-start justify-between mt-5 mb-5 px-1 background-color: #F8F8F8;">
                <div>
                    <h1 className="type-heading1 text-label-default">
                        <span className="text-primary-normal">{nickname}</span>님의
                        <br />
                        아이템과 팩
                    </h1>
                </div>
                <div className="shrink-0">
                    {profileImageUrl && !isProfileDefaultColor(profileImageUrl) ? (
                        <div
                            className="w-14 h-14 rounded-full bg-neutral-300 bg-cover bg-center"
                            style={{ backgroundImage: `url(${profileImageUrl})` }}
                            aria-label={`${nickname} 프로필 이미지`}
                            role="img"
                        />
                    ) : (
                        <div
                        className={`h-14 w-14 rounded-full flex items-center justify-center text-white font-bold ${profileImageUrl && isProfileDefaultColor(profileImageUrl)
                          ? PROFILE_COLOR_CLASS[profileImageUrl] ?? "bg-neutral-300"
                          : "bg-neutral-900"
                          }`}
                      >
                            {profileInitial || "?"}
                        </div>
                    )}
                </div>
            </div>

            <header className={`px-1 flex items-center justify-between ${state.isFilterOpen ? 'mb-5' : 'mb-6'}`}>
                <div className="flex-1" />
                <div role="tablist" className="flex gap-7 w-37 items-center justify-center">
                    <TabItem isActive={state.activeTab === "item"} onClick={() => actions.handleTabChange("item")}>
                        아이템
                    </TabItem>
                    <TabItem isActive={state.activeTab === "pack"} onClick={() => actions.handleTabChange("pack")}>
                        팩
                    </TabItem>
                </div>

                <div className="flex-1 flex items-center justify-end gap-3">
                    {state.activeTab === "pack" && (
                        <button onClick={actions.toggleFilter}>
                            <IcSvgFilter
                                width={24} height={24}
                                className={state.isFilterOpen ? "text-primary-normal" : "text-label-subtle"}
                            />
                        </button>
                    )}
                    {state.activeTab === "item" && (
                        <button
                            onClick={actions.toggleSelectMode}
                            className={`type-label1 transition-colors ${state.isSelectMode ? "text-primary-normal font-bold" : "text-label-subtle"}`}
                        >
                            {state.isSelectMode ? "취소" : "선택"}
                        </button>
                    )}
                </div>
            </header>

            {state.activeTab === "pack" && state.isFilterOpen && (
                <div className="flex gap-1 overflow-x-auto mb-5 ">
                    {MOMENT_OPTIONS.map((moment) => (
                        <Tag1Btn
                            key={moment}
                            mode="btn"
                            variant={state.selectedFilter.includes(moment) ? "primary" : "unpressed"}
                            onClick={() => actions.handleFilterSelect(moment)}
                        >
                            {moment}
                        </Tag1Btn>
                    ))}
                </div>
            )}

            <div className="flex flex-col gap-3">
                {isItemTab && (
                    <>
                        {isItemLoading && (
                            <p className="text-center py-10 text-neutral-400">아이템을 불러오는 중...</p>
                        )}
                        {isItemError && (
                            <p className="text-center py-10 text-red-400">아이템 목록을 가져오지 못했습니다.</p>
                        )}
                        {isItemEmpty && (
                            <p className="text-center py-10 text-neutral-400">아직 등록한 아이템이 없습니다.</p>
                        )}
                        {!isItemLoading &&
                            Array.isArray(itemData) &&
                            itemData.map((card) => (
                                <ItemCard
                                    key={card.id}
                                    {...card}
                                    isSelectMode={state.isSelectMode}
                                    isChecked={state.selectedIds.includes(String(card.id))}
                                    onSelect={(id) => actions.handleSelect(String(id))}
                                    onDetailClick={() => actions.handleDetailClick(card)}
                                    onMoreClick={() => actions.handleMoreClick(String(card.id))}
                                />
                            ))}
                    </>
                )}

                {isPackTab && (
                    <>
                        {isPackLoading && (
                            <p className="text-center py-10 text-neutral-400">팩을 불러오는 중...</p>
                        )}
                        {isPackError && (
                            <p className="text-center py-10 text-red-400">팩 목록을 가져오지 못했습니다.</p>
                        )}
                        {isPackEmpty && (
                            <p className="text-center py-10 text-neutral-400">아직 등록한 팩이 없습니다.</p>
                        )}
                        {sortedPackData.map((pack) => (
                            <PackCard
                                key={pack.id}
                                id={pack.id}
                                title={pack.title}
                                tag={pack.contextCategory}
                                itemCount={pack.items}
                                author={pack.nickname}
                                onMoreClick={() => actions.handleMoreClick(String(pack.id))}
                                showLikeBtn={false}
                            />
                        ))}
                    </>
                )}
            </div>

            {state.activeTab === "item" && state.isSelectMode && state.selectedIds.length > 0 && (
                <FixedBottomButton onClick={() => actions.handleCreatePack(itemData)}>
                    팩 만들기
                </FixedBottomButton>
            )}

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
                title={state.activeTab === "item" ? "아이템을 삭제할까요?" : "팩을 삭제할까요?"}
                confirmText="삭제하기"
                onConfirm={actions.handleFinalDelete}
            />

            <BottomSheet isOpen={state.isItemDetailOpen} onClose={() => actions.setIsItemDetailOpen(false)}>
                <div className="mb-6">
                    {state.selectedItem && <ItemBox item={state.selectedItem} />}
                </div>
                <div className="mx-[-20px] px-5 flex gap-4 border-t border-neutral-100 pt-4">
                    <button
                        onClick={() => onGoToItemAdd(String(state.selectedItem?.id))}
                        className="flex-1 h-[48px] rounded-[8px] bg-beige-100 text-gray-900 type-label1"
                    >
                        팩에 추가하기
                    </button>
                    <button
                        onClick={() => state.selectedItem && actions.handleCreatePackBySelected(state.selectedItem)}
                        className="flex-1/3 h-[48px] rounded-[8px] bg-black text-white type-label1"
                    >
                        팩 만들기
                    </button>
                </div>
            </BottomSheet>
        </div>
    );
};