import type { StoreSeed } from "./Seed"
import type { StoreSupply } from "./Supply"
import type { StoreUpgrade } from "./Upgrade"

export type StoreType = {
    seeds: StoreSeed[]
    suppliesStore: StoreSupply[]
    upgrades: StoreUpgrade[]
}
export type SeedBtnClickType = 'buy' | 'unlock'