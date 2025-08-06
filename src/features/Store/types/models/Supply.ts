export const SupplyEffectType = {
    BoostYield: 'boostYield',
    BoostYieldTimed: 'boostYieldTimed',
    BoostGrowth: 'boostGrowth',
    BoostGrowthTimed: 'boostGrowthTimed',
} as const

export type SupplyEffectType = (typeof SupplyEffectType)[keyof typeof SupplyEffectType]

export const SupplyDurationType = {
    Temporary: 'temporary',
    SingleUse: 'singleUse',
} as const

export type SupplyDurationType = (typeof SupplyDurationType)[keyof typeof SupplyDurationType]


export type StoreSupply = {
    id: string
    name: string,
    label: string,
    icon: string,
    description: string
    price: number
    effect: SupplyEffectType
    multiplier: number
    time?: number | undefined
    duration: SupplyDurationType
}