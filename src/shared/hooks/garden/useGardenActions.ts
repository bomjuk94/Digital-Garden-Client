import { useGardenStore } from "@/features/Garden/stores/useGardenStore"
import { useRegisteredUserGameStore } from "@/shared/stores/useRegisteredUserGameStore"
import { useUserModeStore } from "@/shared/stores/useUserModeStore"

export const useGardenActions = () => {
    const userMode = useUserModeStore.getState().userMode
    // guest
    const showPlantDetails = useGardenStore((s) => s.showPlantDetails)
    const plantDetails = useGardenStore((s) => s.plantDetails)
    const setPlantDetails = useGardenStore((s) => s.setPlantDetails)
    const setShowPlantDetails = useGardenStore((s) => s.setShowPlantDetails)
    const removeFromGarden = useGardenStore((s) => s.removeFromGarden)
    const addToGarden = useGardenStore((s) => s.addToGarden)
    // registered
    const showRegisteredPlantDetails = useRegisteredUserGameStore((s) => s.showRegisteredPlantDetails)
    const registeredPlantDetails = useRegisteredUserGameStore((s) => s.registeredPlantDetails)
    const setRegisteredPlantDetails = useRegisteredUserGameStore((s) => s.setRegisteredPlantDetails)
    const setShowRegisteredPlantDetails = useRegisteredUserGameStore((s) => s.setShowRegisteredPlantDetails)
    const removeFromRegisteredGarden = useRegisteredUserGameStore((s) => s.removeFromRegisteredGarden)
    const addToRegisteredGarden = useRegisteredUserGameStore((s) => s.addToRegisteredGarden)

    if (userMode === 'guest') {
        return {
            showPlantDetails,
            plantDetails,
            setPlantDetails,
            setShowPlantDetails,
            removeFromGarden,
            addToGarden,
        }
    }

    return {
        showPlantDetails: showRegisteredPlantDetails,
        plantDetails: registeredPlantDetails,
        setPlantDetails: setRegisteredPlantDetails,
        setShowPlantDetails: setShowRegisteredPlantDetails,
        removeFromGarden: removeFromRegisteredGarden,
        addToGarden: addToRegisteredGarden,
    }
}