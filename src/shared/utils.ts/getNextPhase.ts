import type { GrowthPhaseType } from "../types/GrowthPhaseType";
import { plantPhases } from "./constants";

export const getNextPhase = (currentPhase: GrowthPhaseType) => {
    const newIndex = plantPhases.indexOf(currentPhase)
    const nextPhase = plantPhases[newIndex + 1]
    return nextPhase ?? 'bloom'
}