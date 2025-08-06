import type { Seed } from "../types";

export interface SeedDetailsModalProps {
    seed: Seed | null
    onSeedDetailsClose: () => void
}