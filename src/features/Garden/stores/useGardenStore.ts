import type { plantMapType, PlantType, plantMapObjectType } from '@/shared/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { showToast } from '@/shared/utils.ts/showToast'
import { useInventoryStore } from '@/shared/stores/useInventoryStore'
import { removeFromGarden } from '../utilities/removeFromGarden'
import type { GardenRemovalActions } from '../types'
import { plants } from '@/shared/utils.ts/constants'

export type GardenStore = {
    garden: plantMapType
    gardenHydrated: boolean
    addToGarden: (val: PlantType, name: string) => void
    removeFromGarden: (plant: PlantType, name: string, action: GardenRemovalActions) => void
    resetGarden: () => void
    plantExists: (id: string, name: string) => boolean
    plantDetails: plantMapObjectType | null
    setPlantDetails: (val: plantMapObjectType | null) => void
    showPlantDetails: boolean
    setShowPlantDetails: (val: boolean) => void
}

let setFn: ((state: Partial<GardenStore>) => void) | null = null

export const useGardenStore = create<GardenStore>()(
    persist(
        (set, get) => {
            setFn = set
            return {
                garden: {} as plantMapType,
                gardenHydrated: false,
                addToGarden: (val, name) => {
                    const { garden, plantExists } = get()
                    const { removeFromInventory } = useInventoryStore.getState();

                    const updated = { ...garden }

                    if (name in garden) {
                        if (!plantExists(val.id, val.name)) {
                            updated[name] = {
                                ...updated[name],
                                count: garden[name].count! + 1,
                                plants: [...garden[name].plants!, val],
                            }
                        } else {
                            return showToast('error', 'plant already exists')
                        }
                    } else {
                        const plant = plants[name]

                        updated[name] = {
                            name,
                            label: val.label,
                            count: 1,
                            description: plant.description,
                            category: plant.category,
                            growTime: plant.growTime,
                            phases: plant.phases,
                            maxWateringSkips: plant.maxWateringSkips,
                            rarity: plant.rarity,
                            sellPrice: plant.sellPrice,
                            plants: [val],
                        }
                    }

                    removeFromInventory(val.id, name)

                    set({ garden: updated })
                },
                removeFromGarden: (plant, name, action) => {

                    const { garden, plantExists } = get()
                    const addToInventory = useInventoryStore.getState().addToInventory

                    removeFromGarden({
                        garden,
                        name,
                        plantExists,
                        id: plant.id,
                    })

                    if (action === 'discard') return

                    addToInventory(plant, name)
                },
                resetGarden: () => set({ garden: {} }),
                plantExists: (id, name) => {
                    const { garden } = get()
                    if (name in garden) {
                        return garden[name].plants!.some((plant) => plant.id === id)
                    }
                    return false
                },
                plantDetails: null,
                setPlantDetails: (val) => set({ plantDetails: val }),
                showPlantDetails: false,
                setShowPlantDetails: (val) => set({ showPlantDetails: val })
            }
        },
        {
            name: 'garden-storage',
            partialize: (state) => ({ garden: state.garden }),
            onRehydrateStorage: () => {
                return () => {
                    if (setFn) {
                        setFn({ gardenHydrated: true })
                    }
                }
            },
        }
    )
)