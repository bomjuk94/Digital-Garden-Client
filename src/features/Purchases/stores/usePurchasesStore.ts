import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { PurchaseType } from "../types"

type PurchasesStore = {
    purchases: PurchaseType[]
    addPurchase: (val: PurchaseType) => void
    purchasesHydrated: boolean
    resetPurchases: () => void
    setPurchases: (purchases: PurchaseType[]) => void
}

let setFn: ((state: Partial<PurchasesStore>) => void) | null = null

export const usePurchasesStore = create<PurchasesStore>()(
    persist(
        (set, get) => {
            setFn = set
            return {
                purchases: [],
                addPurchase: (val) => {
                    const { purchases } = get()
                    const updated = [...purchases, val]
                    set({ purchases: updated })
                },
                purchasesHydrated: false,
                resetPurchases: () => set({ purchases: [] }),
                setPurchases: (purchases) => set({ purchases })
            }
        },
        {
            name: "purchases-store",
            partialize: (state) => ({
                purchases: state.purchases,
            }),
            onRehydrateStorage: () => {
                return () => {
                    if (setFn) {
                        setFn({ purchasesHydrated: true })
                    }
                }
            },
        }
    )
)
