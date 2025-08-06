import type { HarvestPlantFromGardenProps } from "../types/props/HarvestPlantFromGardenProps"
import { showToast } from "@/shared/utils.ts/showToast"

export const useHarvestPlantFromGarden = () => {
    const handleHarvestPlantFromGarden = ({
        setActiveIndex,
        plant,
        inventoryCount,
        maxInventorySpace,
        removeFromGarden,
    }: HarvestPlantFromGardenProps) => {
        setActiveIndex(null)
        if (!plant?.plants) return
        if (plant?.plants?.length < 1) return showToast('error', 'No plant to harvest')
        if (inventoryCount >= maxInventorySpace) return showToast('error', 'Not enough space in the inventory')
        removeFromGarden(plant?.plants![0], plant.name!, 'remove')
    }

    return { handleHarvestPlantFromGarden }
}