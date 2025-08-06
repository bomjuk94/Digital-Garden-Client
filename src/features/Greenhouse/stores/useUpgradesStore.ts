import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { StoreUpgrade } from "@/features/Store/types"
import { v4 as uuidv4 } from "uuid"

export type UpgradesStore = {
    upgrades: StoreUpgrade[]
    upgradesHydrated: boolean
    addUpgrade: (supply: StoreUpgrade) => void
    removeUpgrade: (id: string) => void
    resetUpgrades: () => void
    setUpgrades: (upgrades: StoreUpgrade[]) => void
}

let setFn: ((state: Partial<UpgradesStore>) => void) | null = null

export const useUpgradesStore = create<UpgradesStore>()(
    persist(
        (set, get) => {
            setFn = set

            return {
                upgrades: [],
                upgradesHydrated: false,
                addUpgrade: (upgrade: StoreUpgrade) => {
                    const { upgrades } = get()
                    const newUpgrade = { ...upgrade, id: uuidv4() }
                    const updated = [...upgrades, newUpgrade]
                    set({ upgrades: updated })
                },
                removeUpgrade: (id: string) => {
                    const { upgrades } = get()
                    const updated = upgrades.filter((upgrade) => upgrade.id !== id)
                    set({ upgrades: updated })
                },
                resetUpgrades: () => set({ upgrades: [] }),
                setUpgrades: (upgrades) => set({ upgrades })
            }
        },
        {
            name: "upgrades-storage",
            partialize: (state) => ({
                upgrades: state.upgrades,
            }),
            onRehydrateStorage: () => {
                return () => {
                    if (setFn) {
                        setFn({ upgradesHydrated: true })
                    }
                }
            },
        }
    )
)