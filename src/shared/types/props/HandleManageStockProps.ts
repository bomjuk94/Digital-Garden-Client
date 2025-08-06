import type { ManageStockActions } from "../ManageStockActions";
import type { plantMapObjectType } from "../models";
import type { ModalType } from "../models";

export interface HandleManageStockProps {
    action: ManageStockActions
    plant: plantMapObjectType | null
    maxInventorySpace: number
    inventoryCount: number
    unstockPlant: (plant: plantMapObjectType) => void
    deletePlant: (name: string) => void
    setPlantDetails: (val: plantMapObjectType | null) => void
    setShowPlantDetails: (val: boolean) => void
    toggleModal: (modal: ModalType) => void
    setPlantMangerDetails: (val: plantMapObjectType | null) => void
    setShowPlantManagerDetails: (val: boolean) => void
}