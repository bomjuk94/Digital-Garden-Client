import { showToast } from "@/shared/utils.ts/showToast"
import type { PurchaseSeedProps } from "../types/props/PurchaseSeedProps"

export const purchaseSeed = ({
    profile,
    setSeedCount,
    seed,
    setBalance,
}: PurchaseSeedProps) => {
    if (!profile || profile?.balance < seed.buyPrice) return showToast('error', 'Not enough funds')
    setSeedCount({ name: seed.name, type: 'increment' })
    setBalance(seed.buyPrice, 'decrease')
    showToast('success', `${seed.label} has been purchased`)
}