import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { StoreSupply } from "@/features/Store/types"
import { v4 as uuidv4 } from 'uuid'


export type SuppliesStore = {
    supplies: StoreSupply[]
    suppliesHydrated: boolean
    addSupply: (supply: StoreSupply) => void
    removeSupply: (id: string) => void
    resetSupplies: () => void
}

let setFn: ((state: Partial<SuppliesStore>) => void) | null = null

export const useSuppliseStore = create<SuppliesStore>()(
    persist(
        (set, get) => {
            setFn = set

            return {
                supplies: [],
                suppliesHydrated: false,
                addSupply: (supply: StoreSupply) => {
                    const { supplies } = get()
                    const updated = [...supplies, { ...supply, id: uuidv4() }]
                    set({ supplies: updated })
                },
                removeSupply: (id: string) => {
                    const { supplies } = get()
                    const updated = supplies.filter((supply) => supply.id !== id)
                    set({ supplies: updated })
                },
                resetSupplies: () => set({ supplies: [] }),
            }
        },
        {
            name: "supplies-storage",
            partialize: (state) => ({
                supplies: state.supplies,
            }),
            onRehydrateStorage: () => {
                return () => {
                    if (setFn) {
                        setFn({ suppliesHydrated: true })
                    }
                }
            },
        }
    )
)