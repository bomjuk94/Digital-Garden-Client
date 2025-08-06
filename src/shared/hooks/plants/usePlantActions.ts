import { usePlantStore } from "@/shared/stores/usePlantStores"
import { useRegisteredUserGameStore } from "@/shared/stores/useRegisteredUserGameStore"
import { useUserModeStore } from "@/shared/stores/useUserModeStore"

export const usePlantActions = () => {
    const userMode = useUserModeStore.getState().userMode
    // guest
    const applyBuffToAllPlants = usePlantStore.getState().applyBuffToAllPlants
    const setIsWatered = usePlantStore((s) => s.setPlantIsWatered)
    const setHasBeenWateredThisCycle = usePlantStore((s) => s.setHasBeenWateredThisCycle)
    const removePlant = usePlantStore((s) => s.removePlant)
    const setPlantBoost = usePlantStore((s) => s.setPlantBoost)
    const setPlantBuffs = usePlantStore((s) => s.setPlantBuffs)
    const updatePlantGrowth = usePlantStore((s) => s.updatePlantGrowth)
    const buffs = usePlantStore((s) => s.plantBuffs)
    const resetPlantBuffs = usePlantStore((s) => s.resetPlantBuffs)
    const addPlant = usePlantStore((s) => s.addPlant)
    // registered
    const applyBuffToAllRegisteredPlants = useRegisteredUserGameStore.getState().applyBuffToAllRegisteredPlants
    const setRegisteredPlantIsWatered = useRegisteredUserGameStore((s) => s.setRegisteredPlantIsWatered)
    const setRegisteredHasBeenWateredThisCycle = useRegisteredUserGameStore((s) => s.setRegisteredHasBeenWateredThisCycle)
    const removeRegisteredPlant = useRegisteredUserGameStore((s) => s.removeRegisteredPlant)
    const setRegisteredPlantBoost = useRegisteredUserGameStore((s) => s.setRegisteredPlantBoost)
    const setRegisteredPlantBuffs = useRegisteredUserGameStore((s) => s.setRegisteredPlantBuffs)
    const updateRegisteredPlantGrowth = useRegisteredUserGameStore((s) => s.updateRegisteredPlantGrowth)
    const registeredPlantBuffs = useRegisteredUserGameStore((s) => s.registeredPlantBuffs)
    const resetRegisteredPlantBuffs = useRegisteredUserGameStore((s) => s.resetRegisteredPlantBuffs)
    const addRegisteredPlant = useRegisteredUserGameStore((s) => s.addRegisteredPlant)

    if (userMode === 'guest') {
        return {
            applyBuffToAllPlants,
            setIsWatered,
            setHasBeenWateredThisCycle,
            removePlant,
            setPlantBoost,
            setPlantBuffs,
            updatePlantGrowth,
            buffs,
            resetPlantBuffs,
            addPlant,
        }
    }

    return {
        applyBuffToAllPlants: applyBuffToAllRegisteredPlants,
        setIsWatered: setRegisteredPlantIsWatered,
        setHasBeenWateredThisCycle: setRegisteredHasBeenWateredThisCycle,
        removePlant: removeRegisteredPlant,
        setPlantBoost: setRegisteredPlantBoost,
        setPlantBuffs: setRegisteredPlantBuffs,
        updatePlantGrowth: updateRegisteredPlantGrowth,
        buffs: registeredPlantBuffs,
        resetPlantBuffs: resetRegisteredPlantBuffs,
        addPlant: addRegisteredPlant,
    }
}