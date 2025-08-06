import type { IsHarvestableProps } from "../types/props/IsHarvestableProps"

export const isHarvestable = ({
    isFullyMature,
    isReady,
    plant,
}: IsHarvestableProps) => {
    if (isFullyMature && isReady && plant.isWatered) {
        return {
            ...plant,
            isHarvestable: true,
        }
    }
    return null
}