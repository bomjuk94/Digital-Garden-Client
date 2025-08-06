import { useCustomerStore } from "@/features/Shop/stores/useCustomerStore"
import { useRegisteredUserGameStore } from "@/shared/stores/useRegisteredUserGameStore"
import { useUserModeStore } from "@/shared/stores/useUserModeStore"

export const useCustomerActions = () => {
    const userMode = useUserModeStore.getState().userMode
    // guest
    const chooseRandomCustomer = useCustomerStore((s) => s.chooseRandomCustomer)
    const chooseRandomDialogOption = useCustomerStore((s) => s.chooseRandomDialogOption)
    const resetCustomer = useCustomerStore((s) => s.resetCustomer)
    const oneLinerActive = useCustomerStore((s) => s.oneLinerActive)
    const setOneLinerActive = useCustomerStore((s) => s.setOneLinerActive)
    const intervalId = useCustomerStore((s) => s.intervalId)
    const clearCustomerInterval = useCustomerStore((s) => s.clearCustomerInterval)
    const setIntervalId = useCustomerStore((s) => s.setIntervalId)

    // registered
    const chooseRandomRegisteredCustomer = useRegisteredUserGameStore((s) => s.chooseRandomRegisteredCustomer)
    const chooseRandomRegisteredDialogOption = useRegisteredUserGameStore((s) => s.chooseRandomRegisteredDialogOption)
    const resetRegisteredCustomer = useRegisteredUserGameStore((s) => s.resetRegisteredCustomer)
    const registeredOneLinerActive = useRegisteredUserGameStore((s) => s.registeredOneLinerActive)
    const setRegisteredOneLinerActive = useRegisteredUserGameStore((s) => s.setRegisteredOneLinerActive)
    const registeredIntervalId = useRegisteredUserGameStore((s) => s.registeredIntervalId)
    const clearRegisteredCustomerInterval = useRegisteredUserGameStore((s) => s.clearRegisteredCustomerInterval)
    const setRegisteredIntervalId = useRegisteredUserGameStore((s) => s.setRegisteredIntervalId)

    if (userMode === 'guest') {
        return {
            chooseRandomCustomer,
            chooseRandomDialogOption,
            resetCustomer,
            oneLinerActive,
            setOneLinerActive,
            intervalId,
            clearCustomerInterval,
            setIntervalId,
        }
    }

    return {
        chooseRandomCustomer: chooseRandomRegisteredCustomer,
        chooseRandomDialogOption: chooseRandomRegisteredDialogOption,
        resetCustomer: resetRegisteredCustomer,
        oneLinerActive: registeredOneLinerActive,
        setOneLinerActive: setRegisteredOneLinerActive,
        intervalId: registeredIntervalId,
        clearCustomerInterval: clearRegisteredCustomerInterval,
        setIntervalId: setRegisteredIntervalId,
    }
}