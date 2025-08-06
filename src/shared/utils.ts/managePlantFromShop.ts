import { showToast } from "./showToast"
import type { ManagePlantFromShopProps } from "../types/props/ManagePlantFromShopProps"
import { setPlantToManageFromShop } from "./setPlantToManageFromShop"

export const managePlantFromShop = ({
    plant,
    setPlantMangerDetails,
    setShowPlantManagerDetails,
    toggleModal,
}: ManagePlantFromShopProps) => {
    if (plant && plant.plants) {
        setPlantToManageFromShop({
            setPlantMangerDetails,
            plant,
            setShowPlantManagerDetails,
            toggleModal,
        })
    } else {
        return showToast('error', 'No plants to manage')
    }
}