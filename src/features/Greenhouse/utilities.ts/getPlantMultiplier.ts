import { EffectNames } from "@/features/Effects/constants";
import type { PlantType } from "@/shared/types";

export const getPlantMultiplier = (plant: PlantType) => {
    const multipliers = plant.buffs
        .filter(buff =>
            buff.name === EffectNames.BoostGrowth ||
            buff.name === EffectNames.BoostGrowthTimed
        )
        .map(buff => 1 - buff.multiplier);

    const totalMultiplier = multipliers.reduce((acc, m) => acc * m, 1);
    const clampedMultiplier = Math.max(totalMultiplier, 0.25);
    return clampedMultiplier
}