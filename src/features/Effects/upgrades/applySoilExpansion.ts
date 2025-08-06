import { useRegisteredUserGameStore } from "@/shared/stores/useRegisteredUserGameStore";
import { EffectNames } from "../constants";
import { useUserModeStore } from "@/shared/stores/useUserModeStore";
import { useUserProfileStore } from "@/shared/stores/useUserProfileStore";
import type { BaseUserType } from "@/shared/types";
import { apiFetch } from "@/shared/utils.ts/api";
import type { StoreUpgrade } from "@/features/Store/types";
import { useUpgradesStore } from "@/features/Greenhouse/stores/useUpgradesStore";

export const applySoilExpansion = async ({
    userProfile,
}: {
    userProfile: BaseUserType | null
}) => {

    const userMode = useUserModeStore.getState().userMode
    let upgrades: StoreUpgrade[] = []

    if (userMode === 'guest') {
        upgrades = useUpgradesStore.getState().upgrades
    } else if (userMode === 'registered') {
        try {
            const token = localStorage.getItem('token')

            const res = await apiFetch("/api/upgrades", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (!res.ok) {
                console.warn("⚠️ Failed to fetch upgrades")
                return
            }

            const data = await res.json()
            upgrades = data.upgrades || []
        } catch (error) {
            console.log("Error fetching upgrades", error)
        }
    }

    if (!Array.isArray(upgrades)) {
        console.warn("⚠️ Upgrades is not an array yet:", upgrades)
        return
    }

    const increasePlantCapacityExists = upgrades.find(
        (upgrade) => upgrade.effect.toLowerCase() === EffectNames.IncreasePots.toLowerCase()
    )
    const increasePlantCapacityCount = upgrades.filter((upgrade) => upgrade.effect.toLowerCase() === EffectNames.IncreasePots.toLowerCase()).length

    if (!increasePlantCapacityExists) {
        return console.log('🚫 No Soil Expansion upgrade found')
    }

    const multiplier = increasePlantCapacityExists.multiplier * increasePlantCapacityCount

    if (!userProfile) return
    const base = userProfile.game.plantCapacity

    const maxPlantCapacity = base + multiplier
    const updated = {
        ...userProfile,
        game: { ...userProfile.game, calculatedPlantCapacity: maxPlantCapacity },
    }

    if (userMode === 'guest') {
        useUserProfileStore.setState((state) => ({
            userProfile: {
                ...state.userProfile!,
                game: {
                    ...state.userProfile!.game,
                    calculatedPlantCapacity: maxPlantCapacity,
                },
            },
        }))
    } else if (userMode === 'registered') {
        useRegisteredUserGameStore.setState((state) => ({
            registeredProfile: {
                ...state.registeredProfile!,
                game: {
                    ...state.registeredProfile!.game,
                    calculatedPlantCapacity: maxPlantCapacity,
                },
            },
        }))

        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const response = await apiFetch("/api/profile/update", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify({
                    updatedProfile: {
                        ...updated,
                        game: { ...updated.game, calculatedPlantCapacity: maxPlantCapacity },
                    },
                }),
            })
        } catch (error) {
            console.log(error)
        }
    }
}