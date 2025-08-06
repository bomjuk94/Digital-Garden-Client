import { showToast } from "@/shared/utils.ts/showToast"
import type { StockItemProps } from "../types/props/StockItemProps"
import { useConfirmationStore } from "@/shared/stores/useConfirmationStore"

export const useHandleStockItem = () => {

    const { ask } = useConfirmationStore()

    const handleStockItem = async ({
        plant,
        action,
        removeFromShop,
        toggleModal,
        setPlantMangerDetails,
        setShowPlantManagerDetails,
        shop,
    }: StockItemProps) => {
        if (action === 'unstock') {
            const success = await removeFromShop(plant, plant.name, 'unstock')
            if (success) {
                showToast('success', 'Plant successfully unstocked')
            }
        } else if (action === 'discard') {
            const confirmed = await ask('Are you sure you want to permanently discard the plant?')
            if (confirmed) {
                const success = await removeFromShop(plant, plant.name, 'discard')
                if (success) {
                    showToast('success', 'Plant successfully discarded')
                }
            }
        }

        if ((shop?.[plant?.name]?.count ?? 0) <= 1) {
            toggleModal('shop')
            setPlantMangerDetails(null)
            setShowPlantManagerDetails(false)
        }
    }
    return { handleStockItem }
}