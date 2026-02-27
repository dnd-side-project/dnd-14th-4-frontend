"use client";

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
    onGoToItemAdd: () => void;
}

export const MyPack = ({ onGoToItemAdd }: MyPackProps) => {
    const { state, actions } = useMyPack();
    const { user } = useUserStore();

    const { data: itemData } = useGetItems();
    const { data: packData, isLoading: isPackLoading, isError: isPackError } = useGetMyPacks();

    const nickname = user?.name ?? "사용자";
    const profileImageUrl = user?.profileImageUrl;
    const profileInitial = nickname.charAt(0).toUpperCase();

    return (
        <div className="px-6 pb-24">
            <header className={`flex items-center justify-between mt-16 ${state.isFilterOpen ? 'mb-5' : 'mb-10'}`}>
                <div className="flex-1 flex justify-start">
                    {profileImageUrl && !isProfileDefaultColor(profileImageUrl) ? (
                        <div
                            className="w-12 h-12 rounded-full bg-neutral-300 bg-cover bg-center"
                            style={{ backgroundImage: `url(${profileImageUrl})` }}
                            aria-label={`${nickname} 프로필 이미지`}
                            role="img"
                        />
                    ) : (
                        <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${profileImageUrl && isProfileDefaultColor(profileImageUrl)
                                ? PROFILE_COLOR_CLASS[profileImageUrl] ?? "bg-neutral-300"
                                : "bg-common-100"
                                }`}
                        >
                            {profileInitial || "?"}
                        </div>
                    )}
                </div>

                <div role="tablist" className="flex gap-7 w-37 items-center justify-center">
                    <TabItem isActive={state.activeTab === "item"} onClick={() => actions.handleTabChange("item")}>
                        아이템
                    </TabItem>
                    <TabItem isActive={state.activeTab === "pack"} onClick={() => actions.handleTabChange("pack")}>
                        팩
                    </TabItem>
                </div>

                <div className="flex-1 flex items-center justify-end gap-3">
                    <button onClick={actions.toggleFilter}>
                        <IcSvgFilter
                            width={24} height={24}
                            className={state.isFilterOpen ? "text-primary-normal" : "text-label-subtle"}
                        />
                    </button>
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

            {state.isFilterOpen && (
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
                {state.activeTab === "item" &&
                    itemData?.map((card) => (
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

                {state.activeTab === "pack" && (
                    <>
                        {isPackLoading && <p className="text-center py-10 text-neutral-400">팩을 불러오는 중...</p>}
                        {isPackError && <p className="text-center py-10 text-red-400">팩 목록을 가져오지 못했습니다.</p>}
                        {!isPackLoading && packData?.length === 0 && (
                            <p className="text-center py-10 text-neutral-400">아직 등록한 팩이 없습니다.</p>
                        )}
                        {packData?.map((pack) => (
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
                <FixedBottomButton onClick={actions.handleCreatePack}>
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
                <div className="flex gap-3">
                    <button
                        onClick={onGoToItemAdd}
                        className="flex-1 h-[52px] rounded-[12px] bg-beige-100 text-gray-900 font-medium active:bg-beige-200"
                    >
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