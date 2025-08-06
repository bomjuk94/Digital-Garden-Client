import { v4 as uuidv4 } from 'uuid'
import type { Seed } from '@/features/Greenhouse/types/types'
import type { YieldType } from '@/shared/types/YieldType'
import type { GrowthPhaseType } from '@/shared/types/GrowthPhaseType'
import { capitalizeName } from '../capitalizeName'
import type { PlantType } from '@/shared/types'

export const createPlant = (seed: Seed): PlantType => {
    const now = Date.now()

    return {
        id: uuidv4(),
        name: seed.name.toLowerCase(),
        label: `${capitalizeName(seed.name)} Plant`,
        // TODO: Find a way to search for plant by file name instead of using a hard coded string
        growthPhase: 'seedling' as GrowthPhaseType,
        timePlanted: now,
        lastUpdated: now,
        // Testing
        // nextPhaseAt: now + 10 * 1000, // 10 seconds
        // Production
        nextPhaseAt: now + 30 * 1000,
        isWatered: false,
        hasBeenWateredThisCycle: false,
        missedWaterings: 0,
        isHarvestable: false,
        isDead: false,
        yield: seed.name.toLowerCase() as YieldType,
        buffs: []
    }
}