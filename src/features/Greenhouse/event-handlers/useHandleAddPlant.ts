import type { Seed } from "../types/types"
import { createPlant } from "@/shared/utils.ts/factories/createPlant"
import { showToast } from "@/shared/utils.ts/showToast"
import { useGetUserProfile } from "@/shared/hooks/useGetUserProfile"
import { usePlantActions } from "@/shared/hooks/plants/usePlantActions"
import { useGetPlants } from "@/shared/hooks/useGetPlants"
import { useProfileActions } from "@/shared/hooks/profile/useProfileActions"
import { useSeedActions } from "@/shared/hooks/seeds/useSeedActions"

export const useHandleAddPlant = () => {

    const { addPlant } = usePlantActions()
    const { setPlantCapacity, setBalance } = useProfileActions()
    const { setSeedCount } = useSeedActions()
    const { plants } = useGetPlants()
    const { profile } = useGetUserProfile()

    const handleAddPlant = async (
        seed: Seed,
        setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>
    ) => {

        if (!profile) {
            showToast('error', 'User not loaded')
            return
        }

        if (profile.balance < seed.buyPrice) {
            showToast('error', 'Not enough funds to purchase seed')
            setActiveIndex(null)
            return
        }

        const { calculatedPlantCapacity, usedPlantCapacity } = profile.game

        if (usedPlantCapacity >= calculatedPlantCapacity || plants.length >= calculatedPlantCapacity) {
            showToast('error', 'No more space to plant seed')
            setActiveIndex(null)
            return
        }

        if (seed.count === 0) {
            showToast('error', 'No more seeds to plant')
            setActiveIndex(null)
            return
        }

        addPlant(createPlant(seed))
        setPlantCapacity('usedPlantCapacity', 'increment')
        setSeedCount({ name: seed.name, type: 'decrement' })
        setBalance(seed.buyPrice, 'decrease')
        setActiveIndex(null)
    }

    return { handleAddPlant }
}