import type { BaseUserType } from "@/shared/types";
import type { StoreSeed } from "../models";
import type { userBalanceActionType } from "@/shared/types";

export interface UnlockSeedProps {
    profile: BaseUserType
    seed: StoreSeed
    setBalance: (val: number, action: userBalanceActionType) => void
    unlockSeed: (name: string) => Promise<boolean>
}