import { showToast } from "./showToast"
import type { UnstockAllFromShopProps } from "../types/props/UnstockAllFromShopProps"

export const unstockAllFromShop = ({
    plant,
    maxInventorySpace,
    inventoryCount,
    unstockPlant,
    deletePlant,
    setPlantDetails,
    setShowPlantDetails,
    toggleModal,
}: UnstockAllFromShopProps) => {
    if (!plant || typeof plant.count !== "number") return
    if (plant && plant.count > (maxInventorySpace - inventoryCount)) return showToast('error', 'Insufficient space in the inventory. Make room in the inventory before unstocking')

    unstockPlant(plant)

    if (!plant || typeof plant.name !== "string") return

    deletePlant(plant.name)
    setPlantDetails(null)
    setShowPlantDetails(false)
    toggleModal('shop')
}