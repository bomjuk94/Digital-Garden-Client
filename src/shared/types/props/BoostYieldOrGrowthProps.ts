import type { PlantType } from "../models";
import type { PlantBuffType } from "../models";

export interface BoostYieldOrGrowthProps {
    plant: PlantType
    activeTool: "boostYield" | "boostGrowth"
    setPlantBoost: (id: string, buff: PlantBuffType) => void
    resetCursor: () => void
    plantExists: (id: string, name: string) => boolean
}