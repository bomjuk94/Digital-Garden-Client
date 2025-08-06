import type { HandlePlantGardenActionProps } from "../types/props/HandlePlantGardenActionProps"
import { useShowPlantDetailsFromGarden } from "./useShowPlantDetailsFromGarden"
import { useHarvestPlantFromGarden } from "./useHarvestPlantFromGarden"
import { useDiscardPlantFromGarden } from "./useDiscardPlantFromGarden"
import { useConfirmationStore } from "@/shared/stores/useConfirmationStore"

export const useHandlePlantGardenAction = () => {
    const { handleShowPlantDetailsFromGarden } = useShowPlantDetailsFromGarden()
    const { handleHarvestPlantFromGarden } = useHarvestPlantFromGarden()
    const { discardPlantFromGarden } = useDiscardPlantFromGarden()
    const { ask } = useConfirmationStore()

    const handlePlantGardenAction = async ({
        plant,
        action,
        removeFromGarden,
        setPlantDetails,
        setShowPlantDetails,
        setActiveIndex,
        inventoryCount,
        maxInventorySpace,
    }: HandlePlantGardenActionProps) => {
        if (!plant) return
        if (action === 'harvest') {
            handleHarvestPlantFromGarden({
                setActiveIndex,
                plant,
                inventoryCount,
                maxInventorySpace,
                removeFromGarden,
            })
        } else if (action === 'details') {
            handleShowPlantDetailsFromGarden({
                setPlantDetails,
                setShowPlantDetails,
                setActiveIndex,
                plant,
            })
        } else if (action === 'discard') {
            const confirmed = await ask('Are you sure you want to permanently discard the plant?')

            if (confirmed) {
                discardPlantFromGarden({
                    removeFromGarden,
                    plant,
                })
            }
        }
        setActiveIndex(null)
    }

    return { handlePlantGardenAction }
}