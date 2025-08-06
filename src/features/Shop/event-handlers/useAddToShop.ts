import { useRegisteredUserGameStore } from "@/shared/stores/useRegisteredUserGameStore"
import type { AddToShopProps } from "../types/props/AddToShopProps"
import { showToast } from "@/shared/utils.ts/showToast"
import { useShopStore } from "../stores/useShopStore"
import { useUserModeStore } from "@/shared/stores/useUserModeStore"

export const useAddToShop = () => {

    const userMode = useUserModeStore((s) => s.userMode)
    const guestShop = useShopStore((s) => s.shop)
    const registeredShop = useRegisteredUserGameStore((s) => s.registeredShop)
    const shop = userMode === 'guest' ?
        guestShop
        :
        registeredShop
    const currentRegisteredStockCount = useRegisteredUserGameStore((s) => s.getCurrentRegisteredStockCount)
    const registeredMaxStockSpace = useRegisteredUserGameStore((s) => s.getRegisteredMaxStockSpace)
    const currentGuestStockCount = useShopStore((s) => s.getCurrentStockCount)
    const guestMaxStockSpace = useShopStore((s) => s.getMaxStockSpace)
    const currentStockCount = userMode === 'guest' ?
        currentGuestStockCount(shop)
        :
        currentRegisteredStockCount(shop)
    const maxStockCount = userMode === 'guest' ?
        guestMaxStockSpace()
        :
        registeredMaxStockSpace()
    const availableSpace = maxStockCount - currentStockCount

    const handleAddToShop = ({
        addToShop,
        item,
        setActiveIndex,
    }: AddToShopProps) => {
        if (!item.plants) return showToast('error', 'No Plant to add!')
        if (availableSpace < 1) return showToast('error', 'No more space to sell plants!')

        addToShop(item.plants[0], item.name!)
        setActiveIndex(null)
    }

    return { handleAddToShop }
}