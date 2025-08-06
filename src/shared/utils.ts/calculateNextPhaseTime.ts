import type { GrowthPhaseType } from "../types/GrowthPhaseType";
import { phaseDurations } from "./constants";

export const calculateNextPhaseTime = (currentPhase: GrowthPhaseType, growthMultiplier = 1): number => {
    const duration = phaseDurations[currentPhase] ?? 0
    return Date.now() + duration * growthMultiplier
}