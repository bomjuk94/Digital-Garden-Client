import type { SetPlantToManagerDetailsProps } from "../types/props/SetPlantToManagerDetailsProps"

export const setPlantToManageFromShop = ({
    setPlantMangerDetails,
    plant,
    setShowPlantManagerDetails,
    toggleModal,
}: SetPlantToManagerDetailsProps) => {
    setPlantMangerDetails(plant)
    setShowPlantManagerDetails(true)
    toggleModal('plantManager')
}