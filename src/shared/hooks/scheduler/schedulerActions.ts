import { useEffectSchedulerStore } from "@/features/Effects/stores/useEffectSchedulerStore"
import { useRegisteredUserGameStore } from "@/shared/stores/useRegisteredUserGameStore"
import { useUserModeStore } from "@/shared/stores/useUserModeStore"

export const useSchedulerActions = () => {
    const userMode = useUserModeStore.getState().userMode
    // guest
    const clearIntervalById = useEffectSchedulerStore((s) => s.clearIntervalById)
    const registerInterval = useEffectSchedulerStore((s) => s.registerInterval)
    // registered
    const clearRegisteredIntervalById = useRegisteredUserGameStore((s) => s.clearRegisteredIntervalById)
    const registerRegisteredInterval = useRegisteredUserGameStore((s) => s.registerRegisteredInterval)

    if (userMode === 'guest') {
        return {
            clearIntervalById,
            registerInterval,
        }
    }

    return {
        clearIntervalById: clearRegisteredIntervalById,
        registerInterval: registerRegisteredInterval,
    }
}