import { useNavigate } from "react-router-dom"
import type { CreateUserInputType } from "@/shared/types"
import { useUserProfileStore } from "../../../../shared/stores/useUserProfileStore"
import { useSetUserProfile } from "@/shared/hooks/useSetUserProfile"
import { useConfirmationStore } from "@/shared/stores/useConfirmationStore"
import { usePlantStore } from "@/shared/stores/usePlantStores"
import { useSeedsStore } from "@/features/Greenhouse/stores/useSeedsStore"
import { useInventoryStore } from "@/shared/stores/useInventoryStore"
import { useGardenStore } from "@/features/Garden/stores/useGardenStore"
import { useShopStore } from "@/features/Shop/stores/useShopStore"
import { usePurchasesStore } from "@/features/Purchases/stores/usePurchasesStore"
import { useToolsStore } from "@/shared/stores/useToolsStore"
import { resetGameStates } from "../../utilities/resetGameStates"
import { useUpgradesStore } from "@/features/Greenhouse/stores/useUpgradesStore"
import { useSuppliseStore } from "@/features/Greenhouse/stores/useSuppliesStore"

export const useGuestUserCreation = () => {

    const { userProfile, resetUser, } = useUserProfileStore()
    const { setUser } = useSetUserProfile()
    const { resetPlants } = usePlantStore()
    const { resetSeeds } = useSeedsStore()
    const { resetInventory } = useInventoryStore()
    const { resetGarden } = useGardenStore()
    const { ask } = useConfirmationStore()
    const { resetShop } = useShopStore()
    const { resetPurchases } = usePurchasesStore()
    const { resetCursor } = useToolsStore()
    const { resetUpgrades } = useUpgradesStore()
    const { resetSupplies } = useSuppliseStore()
    const navigate = useNavigate()

    const createGuestUser = async (data: CreateUserInputType): Promise<void> => {
        if (userProfile) {
            const confirmed = await ask("You already have a profile. Would you like to load it?")

            if (!confirmed) {
                resetGameStates({
                    resetUser,
                    resetPlants,
                    resetSeeds,
                    resetInventory,
                    resetUpgrades,
                    resetSupplies,
                    resetGarden,
                    resetShop,
                    resetPurchases,
                    resetCursor,
                    setUser,
                    data,
                })
            }
        } else {
            setUser(data)
        }

        navigate('/green-house')
    }

    return { createGuestUser }
}