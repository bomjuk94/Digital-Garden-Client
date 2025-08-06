import type { StoreUpgrade } from "@/features/Store/types"

export const returnMaxInventorySpace = (
    upgrades: StoreUpgrade[] | undefined,
    base: number,
) => {
    if (!upgrades || upgrades.length === 0) return base

    const additionalInventorySpace = upgrades.reduce((acc, upgrade) => {
        if (upgrade.effect === 'increaseInventory') {
            return acc + upgrade.multiplier
        }
        return acc
    }, 0)

    return additionalInventorySpace + base
}