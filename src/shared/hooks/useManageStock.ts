import type { HandleManageStockProps } from "../types/props/HandleManageStockProps"
import { unstockAllFromShop } from "../utils.ts/unstockAllFromShop"
import { managePlantFromShop } from "../utils.ts/managePlantFromShop"

export const useManageStock = () => {
    const handleManageStock = ({
        action,
        plant,
        maxInventorySpace,
        inventoryCount,
        unstockPlant,
        deletePlant,
        setPlantDetails,
        setShowPlantDetails,
        toggleModal,
        setPlantMangerDetails,
        setShowPlantManagerDetails
    }: HandleManageStockProps) => {
        if (action === 'unstockAll') {
            unstockAllFromShop({
                plant,
                maxInventorySpace,
                inventoryCount,
                unstockPlant,
                deletePlant,
                setPlantDetails,
                setShowPlantDetails,
                toggleModal,
            })
        } else if (action === 'manage') {
            managePlantFromShop({
                plant,
                setPlantMangerDetails,
                setShowPlantManagerDetails,
                toggleModal,
            })
        }
    }

    return { handleManageStock }
}