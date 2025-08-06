export const UpgradeEffectType = {
    IncreasePots: 'increasePots',
    AutomateWatering: 'automateWatering',
    IncreaseInventory: 'increaseInventory',
    BoostShop: 'boostShop',
    GenerateSeeds: 'generateSeeds',
    IncreaseShop: 'increaseShop',
} as const

export type UpgradeEffectType = (typeof UpgradeEffectType)[keyof typeof UpgradeEffectType]

export type StoreUpgrade = {
    id: string
    name: string
    label: string
    icon: string
    description: string
    price: number
    effect: string
    multiplier: number
    maxStacks?: number | undefined
    duration: string
}