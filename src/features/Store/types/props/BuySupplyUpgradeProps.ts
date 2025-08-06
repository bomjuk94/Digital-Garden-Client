import type { BaseUserType, StoreTabType } from "@/shared/types"
import type { StoreSupply, StoreUpgrade } from "../models"
import type { userBalanceActionType } from "@/shared/types"

export interface BuySupplyUpgradeProps {
    item: StoreSupply | StoreUpgrade
    activeStoreTab: Extract<StoreTabType, 'suppliesStore' | 'upgrades'>
    profile: BaseUserType
    addSupply: (supply: StoreSupply) => void
    addUpgrade: (upgrade: StoreUpgrade) => void
    setBalance: (val: number, action: userBalanceActionType) => void
    upgrades: StoreUpgrade[]
}