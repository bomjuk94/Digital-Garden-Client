import type { plantMapObjectType } from "../models"
import type { ModalType } from "../models"

export interface SetPlantToManagerDetailsProps {
    setPlantMangerDetails: (val: plantMapObjectType | null) => void
    plant: plantMapObjectType
    setShowPlantManagerDetails: (val: boolean) => void
    toggleModal: (modal: ModalType) => void
}