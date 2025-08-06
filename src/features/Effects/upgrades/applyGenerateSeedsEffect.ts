import { useUserModeStore } from "@/shared/stores/useUserModeStore"
import type { GenerateSeedsEffectProps } from "./types/props"
import { useSeedsStore } from "@/features/Greenhouse/stores/useSeedsStore"
import { useRegisteredUserGameStore } from "@/shared/stores/useRegisteredUserGameStore"
import { apiFetch } from "@/shared/utils.ts/api"

export const applyGenerateSeedsEffect = async ({
    seeds,
    count,
}: GenerateSeedsEffectProps) => {
    const userMode = useUserModeStore.getState().userMode
    const updated = [...seeds]
    const unlockedSeeds = seeds.filter((seed) => !seed.locked)

    if (!unlockedSeeds) return
    const randomSeed = unlockedSeeds[Math.floor(Math.random() * unlockedSeeds.length)]
    const seedIndex = updated.findIndex(seed => seed.name === randomSeed.name)

    if (!seedIndex) return
    const finalCount = count ?? 1

    updated[seedIndex] = {
        ...randomSeed,
        count: (randomSeed.count || 0) + finalCount,
    }

    if (userMode === 'guest') {

        useSeedsStore.setState({
            seeds: updated
        })
    } else if (userMode === 'registered') {
        useRegisteredUserGameStore.setState({
            registeredSeeds: updated
        })

        try {
            const token = localStorage.getItem("token")
            if (!token) return

            await apiFetch("/api/seeds/update", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ updatedSeeds: updated }),
            })
        } catch (error) {
            console.error("Registered seeds update error:", error)
        }
    }
}