import type { ResetGameStatesProps } from "@/features/Store/types/props/ResetGameStatesProps"

export const resetGameStates = ({
    resetUser,
    resetPlants,
    resetSeeds,
    resetInventory,
    resetGarden,
    resetShop,
    resetPurchases,
    resetCursor,
    resetUpgrades,
    resetSupplies,
    setUser,
    data,
}: ResetGameStatesProps) => {
    resetUser()
    resetPlants()
    setUser(data)
    resetSeeds()
    resetInventory()
    resetGarden()
    resetShop()
    resetPurchases()
    resetCursor()
    resetUpgrades()
    resetSupplies()
}
