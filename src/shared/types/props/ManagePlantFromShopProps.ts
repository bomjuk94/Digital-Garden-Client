import type { plantMapObjectType } from "../models";
import type { ModalType } from "../models";

export interface ManagePlantFromShopProps {
    plant: plantMapObjectType | null
    setPlantMangerDetails: (val: plantMapObjectType | null) => void
    setShowPlantManagerDetails: (val: boolean) => void
    toggleModal: (modal: ModalType) => void
}