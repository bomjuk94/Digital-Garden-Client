import type { Seed } from "@/features/Greenhouse/types/types"

export interface GenerateSeedsEffectProps {
    seeds: Seed[]
    count: number | undefined
}