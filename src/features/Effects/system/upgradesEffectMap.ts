import { applyPassiveSeedGeneration } from "./applyPassiveSeedGeneration";

export const upgradesEffectMap: Record<string, () => void> = {
    generateSeeds: applyPassiveSeedGeneration,
}