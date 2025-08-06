import type { YieldType } from "../YieldType"
import type { GrowthPhaseType } from "../GrowthPhaseType"
import type { StoreSupply } from "@/features/Store/types"
import type { plantIcons } from "@/shared/utils.ts/constants"

export type PlantType = {
    id: string | undefined
    name: string
    label: string
    // icon: string,
    growthPhase: GrowthPhaseType
    timePlanted: number
    lastUpdated: number
    nextPhaseAt: number
    isWatered: boolean
    isHarvestable: boolean
    hasBeenWateredThisCycle: boolean
    missedWaterings: number
    isDead: boolean
    yield: YieldType
    buffs: (PlantBuffType | PlantBuffTimerType)[]
}
export type plantMapObjectType = {
    name: keyof typeof plantIcons
    label: string | undefined
    count: number | undefined
    // icon: string | undefined
    description: string
    category: string[]
    growTime: number
    phases: number
    maxWateringSkips: number
    rarity: string
    sellPrice: number
    plants: PlantType[] | undefined
}
export type plantMapType = {
    [plantName: string]: plantMapObjectType
}
export type PlantBuffType = {
    name: string
    effect: StoreSupply
    multiplier: number
}
export type PlantBuffTimerType = Pick<PlantBuffType, 'name' | 'effect' | 'multiplier'> & {
    id: string,
    expirationTime: number
}