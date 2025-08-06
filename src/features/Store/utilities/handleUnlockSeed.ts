import { showToast } from "@/shared/utils.ts/showToast"
import type { UnlockSeedProps } from "../types/props/UnlockSeedProps"

export const handleUnlockSeed = async ({
    profile,
    seed,
    setBalance,
    unlockSeed,
}: UnlockSeedProps) => {
    if (!profile || profile?.balance < seed.unlockPrice) return showToast('error', 'Not enough funds')
    setBalance(seed.unlockPrice, 'decrease')
    const success = await unlockSeed(seed.name)
    if (success) return showToast('success', `${seed.label} has been unlocked!`)
}