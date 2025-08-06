import { useSeedsStore } from "@/features/Greenhouse/stores/useSeedsStore";
import { useEffectSchedulerStore } from "../stores/useEffectSchedulerStore";
import { EffectNames } from "../constants";
import { useUpgradesStore } from "@/features/Greenhouse/stores/useUpgradesStore";
import { useUserModeStore } from "@/shared/stores/useUserModeStore";
import { useRegisteredUserGameStore } from "@/shared/stores/useRegisteredUserGameStore";

export const applyPassiveSeedGeneration = () => {
    const userMode = useUserModeStore.getState().userMode

    const registerInterval = userMode === 'guest' ?
        useEffectSchedulerStore.getState().registerInterval
        :
        useRegisteredUserGameStore.getState().registerRegisteredInterval
    const addRandomSeedToList = userMode === 'guest' ?
        useSeedsStore.getState().addRandomSeedToList
        :
        useRegisteredUserGameStore.getState().addRandomRegisteredSeedToList

    const upgrades = userMode === 'guest' ?
        useUpgradesStore.getState().upgrades
        :
        useRegisteredUserGameStore.getState().registeredUpgrades

    const count = upgrades?.reduce((acc, curr) => {
        if (curr.effect === 'generateSeeds') {
            return acc + curr.multiplier
        }

        return acc
    }, 0)

    if (!count) return 'no count'

    registerInterval(
        EffectNames.GenerateSeeds,
        () => addRandomSeedToList(count),
        30 * 1000 // 30 seconds production
        // 5000 // 5 seconds testing
    )
}