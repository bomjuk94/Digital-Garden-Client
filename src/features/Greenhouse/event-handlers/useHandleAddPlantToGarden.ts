import type { HandleAddPlantToGardenProps } from "../types"
import { showToast } from "@/shared/utils.ts/showToast"

export const useHandleAddPlantToGarden = () => {

    const handleAddPlantToGarden = ({
        item,
        addToGarden,
    }: HandleAddPlantToGardenProps) => {
        if (!item.plants || item.plants.length === 0) {
            return showToast('error', 'No Plant to add!')
        }

        const plantToAdd = item.plants[0]
        addToGarden(plantToAdd, item.name!)
        if (!plantToAdd || !plantToAdd.id) return
    }

    return { handleAddPlantToGarden }
}