import type { DiscardPlantFromGardenProps } from "../types/props/DiscardPlantFromGardenProps"

export const useDiscardPlantFromGarden = () => {
    const discardPlantFromGarden = ({
        removeFromGarden,
        plant,
    }: DiscardPlantFromGardenProps) => {
        removeFromGarden(plant?.plants![0], plant.name!, 'discard')
    }

    return { discardPlantFromGarden }
}