import type { CapcityType } from "@/shared/types/CapacityType"
import type { ToolBeltNameTypes } from "@/shared/types/ToolBeltNameTypes"

export type ToolbeltAction = {
    name: ToolBeltNameTypes
    label: string
    icon: string
}
export type Seed = {
    name: string
    label: string
    icon: string
    count: number
    description: string
    category: string[]
    growTime: number
    phases: number
    maxWateringSkips: number
    rarity: string
    sellPrice: number
    buyPrice: number
    locked: boolean
    unlockPrice: number
}
export interface SeedListProps {
    seeds: Seed[]
}
export interface setSeedsCountProps {
    name: string
    val?: number
    type?: CapcityType
}