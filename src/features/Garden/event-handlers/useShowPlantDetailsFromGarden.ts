import type { ShowPlantDetailsFromGardenProps } from "../types/props/ShowPlantDetailsFromGardenProps"

export const useShowPlantDetailsFromGarden = () => {
    const handleShowPlantDetailsFromGarden = ({
        setPlantDetails,
        setShowPlantDetails,
        setActiveIndex,
        plant,
    }: ShowPlantDetailsFromGardenProps) => {
        setPlantDetails(plant)
        setShowPlantDetails(true)
        setActiveIndex(null)
    }

    return { handleShowPlantDetailsFromGarden }
}