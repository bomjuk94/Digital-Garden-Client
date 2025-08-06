import { useEffect } from "react"
import { showToast } from "@/shared/utils.ts/showToast"
import type { PurchaseType } from "@/features/Purchases/types"
import type { BaseUserType } from "@/shared/types"
import { convertToDate } from "@/shared/utils.ts/convertToDate"

export const useShowPassiveSales = (
    purchases: PurchaseType[],
    profile: BaseUserType | null,
) => {
    useEffect(() => {
        if (purchases.length === 0) return

        const plantsSold = purchases.filter(p =>
            p.method === 'passive' &&
            profile &&
            convertToDate(p.timestamp) > convertToDate(profile.lastAtShop)
        ).length

        if (!plantsSold) return

        showToast('success', `${plantsSold} ${plantsSold > 1 ? 'plants were' : 'plant was'} sold while you were away.`)
    }, [profile, purchases])
}
