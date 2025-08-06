import { create } from "zustand";
import { persist } from 'zustand/middleware'
import type { BaseUserType, CapacityKeyType } from "../types";
import type { CapcityType } from "../types/CapacityType";
import type { userBalanceActionType } from "../types";
import { applySoilExpansion } from "@/features/Effects/upgrades/applySoilExpansion";
import { useUpgradesStore } from "@/features/Greenhouse/stores/useUpgradesStore";
import { EffectNames } from "@/features/Effects/constants";

export type UserProfileStore = {
    userProfile: BaseUserType | null
    setUserProfile: (val: BaseUserType) => void
    setPlantCapacity: (capacityKey: CapacityKeyType, type?: CapcityType, val?: number) => void
    setPlantCapacityValue: (val: number, capacityKey: CapacityKeyType) => void
    resetUser: () => void
    setOnBoardingStatus: (val: boolean) => void
    setBalance: (val: number, action: userBalanceActionType) => void
    setLastAtShop: (val: number) => void
    addPlantCapacitySpace: () => void
    getMaxPlantCapacityValue: () => void
}

export const useUserProfileStore = create<UserProfileStore>()(
    persist(
        (set, get) => ({
            userProfile: null,
            setUserProfile: (val) => set({ userProfile: val }),
            setPlantCapacity: (capacityKey, type?, val?) => {
                const { userProfile, setPlantCapacityValue } = get()

                if (!userProfile) return

                const current = userProfile.game.usedPlantCapacity

                let newCount = current

                if (type === 'increment') {
                    newCount = current + 1
                } else if (type === 'decrement') {
                    newCount = Math.max(0, current - 1)
                } else if (val !== undefined) {
                    newCount = val
                }

                setPlantCapacityValue(newCount, capacityKey)
            },
            setPlantCapacityValue: (val, capacityKey) => {
                set((state) => ({
                    userProfile: {
                        ...state.userProfile!,
                        game: {
                            ...state.userProfile!.game,
                            [capacityKey]: val
                        },
                    }
                }))
            },
            resetUser: () => set({ userProfile: null }),
            setOnBoardingStatus: (val) => {
                const userProfile = get().userProfile as BaseUserType
                const updated = {
                    ...userProfile,
                    onboardingComplete: val,
                }
                set({ userProfile: updated })
            },
            setBalance: async (val, action) => {
                set((state) => {
                    if (!state.userProfile) return state

                    const balanceChange = action === 'increase' ? val : -val

                    return {
                        userProfile: {
                            ...state.userProfile,
                            balance: state.userProfile.balance + balanceChange,
                        },
                    }
                })
            },
            lastAtShop: null,
            setLastAtShop: (val) => {
                const { userProfile } = get()
                if (!userProfile) return

                const updated = {
                    ...userProfile,
                    lastAtShop: val,
                }
                set({ userProfile: updated })
            },
            addPlantCapacitySpace: async () => {
                const { userProfile } = get()
                const upgrades = useUpgradesStore.getState().upgrades

                if (!userProfile || !upgrades) return

                await applySoilExpansion({ userProfile })
            },
            getMaxPlantCapacityValue: () => {
                const { userProfile } = get()
                const upgrades = useUpgradesStore.getState().upgrades

                if (!userProfile) return

                const base = userProfile.game.plantCapacity ?? 3
                const bonus = upgrades
                    .filter(u => u.effect.toLowerCase() === EffectNames.IncreasePots.toLowerCase())
                    .reduce((sum, u) => sum + u.multiplier, 0)

                const maxPlantSpace = base + bonus

                const updated = {
                    ...userProfile,
                    game: {
                        ...userProfile.game,
                        calculatedPlantCapacity: maxPlantSpace,
                    },
                }

                set({ userProfile: updated })
            },
        }),
        {
            name: 'user-profile-storage',
            partialize: (state) => ({ userProfile: state.userProfile })
        }
    )
)