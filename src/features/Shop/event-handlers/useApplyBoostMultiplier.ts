import { EffectNames } from "@/features/Effects/constants"
import type { StoreUpgrade } from "@/features/Store/types"

export const useApplyBoostMultiplier = () => {

    const applyBoostMultiplier = (upgrades: StoreUpgrade[] | undefined): { intervalTime: number } => {

        const boostShopUpgrades = upgrades?.filter(u => u.effect === EffectNames.BoostShop) ?? []
        let intervalTime = 30_000

        if (boostShopUpgrades.length !== 0) {
            const multiplier = boostShopUpgrades[0].multiplier ?? 0
            const cappedCount = Math.min(boostShopUpgrades.length, boostShopUpgrades[0].maxStacks ?? 2)
            const timeReduction = 5_000 * multiplier * cappedCount

            intervalTime = Math.max(5_000, intervalTime - timeReduction)
        }

        return { intervalTime }
    }

    return { applyBoostMultiplier }
}
