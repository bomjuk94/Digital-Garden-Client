import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { PlantBuffTimerType, PlantBuffType, PlantType } from "../types"
import { isHarvestable } from "@/features/Greenhouse/utilities.ts/isHarvestable"
import { isReadyForNextGrowthPhase } from "@/features/Greenhouse/utilities.ts/isReadyForNextGrowthPhase"
import { isPlantDead } from "@/features/Greenhouse/utilities.ts/isPlantDead"

type PlantStore = {
    plants: PlantType[]
    plantsHydrated: boolean
    addPlant: (val: PlantType) => void
    removePlant: (id: string) => void
    setPlants: (val: PlantType[]) => void
    resetPlants: () => void
    updatePlantGrowth: () => void
    setPlantIsWatered: (id: string, val: boolean) => void
    setHasBeenWateredThisCycle: (id: string, val: boolean) => void
    setMissedWaterings: (id: string, val: number) => void
    applyBuffToAllPlants: (buff: PlantBuffTimerType) => void
    setPlantBoost: (id: string, buff: PlantBuffType) => void
    plantBuffs: (PlantBuffType | PlantBuffTimerType)[]
    setPlantBuffs: (buffs: (PlantBuffType | PlantBuffTimerType)[]) => void
    resetPlantBuffs: () => void
}

let setFn: ((state: Partial<PlantStore>) => void) | null = null

export const usePlantStore = create<PlantStore>()(
    persist(
        (set, get) => {
            setFn = set
            return {
                plants: [],
                plantsHydrated: false,
                addPlant: (val) => {
                    const { plants, setPlants } = get()
                    const updated = [...plants, val]
                    setPlants(updated)
                },
                removePlant: (id) => {
                    const { plants, setPlants } = get()
                    const updated = plants.filter((plant) => plant.id !== id)
                    setPlants(updated)
                },
                setPlants: (val) => set({ plants: val }),
                resetPlants: () => set({ plants: [] }),
                updatePlantGrowth: () => {
                    const { plants } = get()
                    const now = Date.now()

                    const updatedPlants = plants.map((plant) => {
                        if (plant.isDead || plant.isHarvestable) return plant;
                        const isReady = now >= plant.nextPhaseAt
                        const isNotMature = plant.growthPhase !== 'bloom'
                        const isFullyMature = plant.growthPhase === 'bloom'

                        const context = { plant, isReady, isNotMature, isFullyMature, now };

                        return (
                            isHarvestable(context) ??
                            isReadyForNextGrowthPhase(context) ??
                            isPlantDead(context) ??
                            plant
                        );
                    })

                    set({ plants: updatedPlants })
                },
                setPlantIsWatered: (id, val) => {
                    const { plants } = get()
                    const updatedPlants = plants.map((plant) => {
                        if (plant.id === id) {
                            return {
                                ...plant,
                                isWatered: val,
                            }
                        } else {
                            return plant
                        }
                    })
                    set({ plants: updatedPlants })
                },
                setHasBeenWateredThisCycle: (id, val) => {
                    const { plants } = get()
                    const updatedPlants = plants.map((plant) => {
                        if (plant.id === id) {
                            return {
                                ...plant,
                                hasBeenWateredThisCycle: val,
                            }
                        } else {
                            return plant
                        }
                    })
                    set({ plants: updatedPlants })
                },
                setMissedWaterings: (id, val) => {
                    const { plants } = get()
                    const updatedPlants = plants.map((plant) => {
                        if (plant.id === id) {
                            return {
                                ...plant,
                                missedWaterings: val,
                            }
                        } else {
                            return plant
                        }
                    })
                    set({ plants: updatedPlants })
                },
                setPlantBoost: (id, buff) => {
                    const { plants } = get()
                    const updated = plants.map((plant) => {
                        if (plant.id === id) {
                            return {
                                ...plant,
                                buffs: [...plant.buffs, buff]
                            }
                        }
                        return plant
                    })
                    set({ plants: updated })
                },
                applyBuffToAllPlants: (buff) => {
                    const { plants } = get()
                    const updated = plants.map(plant =>
                        plant.isDead
                            ? plant
                            : { ...plant, buffs: [...plant.buffs, buff] }
                    )
                    set({ plants: updated })
                },
                plantBuffs: [],
                setPlantBuffs: (buffs) => {
                    set({ plantBuffs: [...buffs] })
                },
                resetPlantBuffs: () => { set({ plantBuffs: [] }) }
            }
        },
        {
            name: "plant-storage",
            partialize: (state) => ({ plants: state.plants }),
            onRehydrateStorage: () => {
                return () => {
                    if (setFn) {
                        setFn({ plantsHydrated: true })
                    }
                }
            }
        }
    )
)
