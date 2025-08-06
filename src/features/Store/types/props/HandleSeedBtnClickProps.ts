import type { BaseUserType } from "@/shared/types"
import type { SeedBtnClickType, StoreSeed } from "../models"
import type { setSeedsCountProps } from "@/features/Greenhouse/types/types"
import type { userBalanceActionType } from "@/shared/types"

export interface HandleSeedBtnClickProps {
    seed: StoreSeed
    action: SeedBtnClickType
    profile: BaseUserType
    setSeedCount: ({ name, val, type }: setSeedsCountProps) => void
    setBalance: (val: number, action: userBalanceActionType) => void
    unlockSeed: (name: string) => Promise<boolean>
}