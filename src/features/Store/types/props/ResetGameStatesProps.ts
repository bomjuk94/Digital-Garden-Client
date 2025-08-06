import type { CreateUserInputType } from "@/shared/types"

export interface ResetGameStatesProps {
    resetUser: () => void
    resetPlants: () => void
    setUser: (data: CreateUserInputType) => void
    resetSeeds: () => void
    resetInventory: () => void
    resetGarden: () => void
    resetShop: () => void
    resetPurchases: () => void
    resetCursor: () => void
    resetUpgrades: () => void
    resetSupplies: () => void
    data: CreateUserInputType
}