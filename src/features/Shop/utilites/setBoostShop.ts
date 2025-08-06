import { EffectNames } from "@/features/Effects/constants"
import type { StoreUpgrade } from "@/features/Store/types"

type ApplyBoostMultiplierFn = (upgrades: StoreUpgrade[] | undefined) => { intervalTime: number }

export const setBoostShop = (
    upgrades: StoreUpgrade[] | undefined,
    intervalFunc: () => void,
    applyBoostMultiplier: ApplyBoostMultiplierFn,
    clearIntervalById: (id: string) => void,
    registerInterval: (id: string, fn: () => void, delay: number) => void,
) => {

    const { intervalTime } = applyBoostMultiplier(upgrades)
    clearIntervalById(EffectNames.BoostShop)
    registerInterval(EffectNames.BoostShop, intervalFunc, intervalTime)
}
