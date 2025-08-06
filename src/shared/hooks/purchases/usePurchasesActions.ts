import { usePurchasesStore } from "@/features/Purchases/stores/usePurchasesStore"
import { useRegisteredUserGameStore } from "@/shared/stores/useRegisteredUserGameStore"
import { useUserModeStore } from "@/shared/stores/useUserModeStore"

export const usePurchasesActions = () => {
    const userMode = useUserModeStore.getState().userMode
    // guest
    const addPurchase = usePurchasesStore((s) => s.addPurchase)

    // registered
    const addRegisteredPurchase = useRegisteredUserGameStore((s) => s.addRegisteredPurchase)

    if (userMode === 'guest') {
        return {
            addPurchase,
        }
    }

    return {
        addPurchase: addRegisteredPurchase,
    }
}