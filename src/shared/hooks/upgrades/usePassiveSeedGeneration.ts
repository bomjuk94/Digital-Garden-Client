import { EffectNames } from "@/features/Effects/constants"
import { useEffectSchedulerStore } from "@/features/Effects/stores/useEffectSchedulerStore"
import { applyPassiveSeedGeneration } from "@/features/Effects/system/applyPassiveSeedGeneration"
import { useRegisteredUserGameStore } from "@/shared/stores/useRegisteredUserGameStore"
import { useUserModeStore } from "@/shared/stores/useUserModeStore"
import { useEffect } from "react"
import { useUpgradesStore } from "@/features/Greenhouse/stores/useUpgradesStore"

export const usePassiveSeedGeneration = () => {

    const userMode = useUserModeStore((state) => state.userMode)
    const guestUpgrades = useUpgradesStore((s) => s.upgrades)
    const registeredUpgrades = useRegisteredUserGameStore((s) => s.registeredUpgrades)
    const upgrades = userMode === 'guest' ?
        guestUpgrades
        :
        registeredUpgrades


    const unregister = userMode === 'guest' ?
        useEffectSchedulerStore.getState().clearIntervalById
        :
        useRegisteredUserGameStore.getState().clearRegisteredIntervalById

    useEffect(() => {

        applyPassiveSeedGeneration()

        return () => {
            unregister?.(EffectNames.GenerateSeeds)
        }
    }, [userMode, unregister, upgrades])
}