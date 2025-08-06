import type { BaseUserType } from "@/shared/types"
import type { StoreSeed } from "../models"
import type { setSeedsCountProps } from "@/features/Greenhouse/types/types"
import type { userBalanceActionType } from "@/shared/types"

export interface PurchaseSeedProps {
    profile: BaseUserType
    setSeedCount: ({ name, val, type }: setSeedsCountProps) => void
    seed: StoreSeed
    setBalance: (val: number, action: userBalanceActionType) => void
}