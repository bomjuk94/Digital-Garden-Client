import type { PlantType, plantMapObjectType, plantMapType } from "@/shared/types";
import type { StockItemActions } from "../StockItemActions";
import type { ShopRemovalActions } from "../ShopRemovalTypes";
import type { ModalType } from "@/shared/types";

export interface StockItemProps {
    plant: PlantType
    action: StockItemActions
    removeFromShop: (plant: PlantType, name: string, action: ShopRemovalActions) => Promise<boolean>
    toggleModal: (modal: ModalType) => void
    setPlantMangerDetails: (val: plantMapObjectType | null) => void
    setShowPlantManagerDetails: (val: boolean) => void
    shop: plantMapType
}