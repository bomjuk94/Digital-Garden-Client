import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Seed } from "../types/types"
import { seeds as defaultSeeds } from "../constants"
import type { setSeedsCountProps } from "../types/types"
import { applyGenerateSeedsEffect } from "@/features/Effects/upgrades/applyGenerateSeedsEffect"

export type SeedsStore = {
    seeds: Seed[]
    seedsHydrated: boolean
    setSeeds: (val: Seed[]) => void
    setSeedCount: ({ name, val, type }: setSeedsCountProps) => void
    findIndex: (name: string) => number | undefined
    showSeedsModal: boolean
    toggleSeedsModal: () => void
    resetSeeds: () => void
    seedDetails: Seed | null
    setSeedDetails: (val: Seed | null) => void
    showSeedDetails: boolean
    setShowSeedDetails: (val: boolean) => void
    unlockSeed: (name: string) => Promise<boolean>
    addRandomSeedToList: (count?: number) => void
}

let setFn: ((state: Partial<SeedsStore>) => void) | null = null

export const useSeedsStore = create<SeedsStore>()(
    persist(
        (set, get) => {
            setFn = set
            return {
                seeds: defaultSeeds,
                seedsHydrated: false,
                setSeeds: (val) => set({ seeds: val }),
                setSeedCount: ({ name, val, type }) => {
                    const { seeds, findIndex } = get()
                    const index = findIndex(name)
                    if (index === undefined) return
                    const updated = [...seeds]

                    if (type === 'increment' || type === 'decrement') {

                        const currentCount = updated[index].count
                        const newCount = type === 'increment' ? currentCount + 1 : currentCount - 1
                        updated[index] = { ...updated[index], count: newCount }
                    } else if (val !== undefined) {
                        updated[index] = { ...updated[index], count: val }
                    }
                    set({ seeds: updated })
                },
                findIndex: (name) => {
                    const { seeds } = get()
                    const index = seeds.findIndex((seed) => seed.name === name)
                    return index !== -1 ? index : undefined
                },
                showSeedsModal: false,
                toggleSeedsModal: () => set((state) => ({ showSeedsModal: !state.showSeedsModal })),
                resetSeeds: () => {
                    set(() => ({
                        seeds: defaultSeeds
                    }))
                },
                seedDetails: null,
                setSeedDetails: (val) => set({ seedDetails: val }),
                showSeedDetails: false,
                setShowSeedDetails: (val) => set({ showSeedDetails: val }),
                unlockSeed: async (name): Promise<boolean> => {
                    const { seeds, findIndex } = get()
                    const index = findIndex(name)
                    if (index === undefined) return false
                    const updated = [...seeds]
                    updated[index] = {
                        ...updated[index],
                        locked: false,
                    }
                    set({ seeds: updated })
                    return true
                },
                addRandomSeedToList: (count?) => {
                    const { seeds } = get()

                    applyGenerateSeedsEffect({
                        seeds,
                        count,
                    })
                },
            }
        },
        {
            name: "seeds-storage",
            partialize: (state) => ({
                seeds: state.seeds,
            }),
            onRehydrateStorage: () => {
                return () => {
                    if (setFn) {
                        setFn({ seedsHydrated: true })
                    }
                }
            },
        }
    )
)