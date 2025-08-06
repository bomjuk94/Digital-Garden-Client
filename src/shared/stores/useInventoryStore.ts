import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { PlantType, plantMapObjectType, plantMapType } from '../types'
import { addToInventory } from '../utils.ts/addToInventory'
import { removeFromInventory } from '../utils.ts/removeFromInventory'
import { setInventory } from '../utils.ts/setInventory'
import { returnMaxInventorySpace } from '../utils.ts/returnMaxInventorySpace'
import { useUpgradesStore } from '@/features/Greenhouse/stores/useUpgradesStore'

export type InventoryStore = {
    inventory: plantMapType
    inventoryHydrated: boolean
    inventoryCount: number
    setInventoryCount: () => void
    decrementInventoryCount: (multiplier?: number) => void
    incrementInventoryCount: (multiplier?: number) => void
    maxInventorySpace: number
    maxBaseInventorySpace: number
    addToInventory: (val: PlantType, name: string, multiplier?: number) => Promise<void>
    removeFromInventory: (id: string, name: string, multiplier?: number) => void
    setInventory: (count: number, val: plantMapObjectType) => void
    resetInventory: () => void
    plantExists: (id: string, name: string) => boolean
    showInventoryModal: boolean
    toggleInventoryModal: () => void
    getMaxInventorySpace: () => number | undefined
    setMaxInventorySpace: () => void
    pruneInactiveBuffs: () => Promise<void>
}

let setFn: ((state: Partial<InventoryStore>) => void) | null = null

export const useInventoryStore = create<InventoryStore>()(
    persist(
        (set, get) => {
            setFn = set
            return {
                inventory: {} as plantMapType,
                inventoryHydrated: false,
                inventoryCount: 0,
                setInventoryCount: () => {
                    const { inventory } = get()

                    const newInventoryCount = Object.values(inventory).reduce(
                        (acc, plant) => acc + (plant.count || 0),
                        0
                    );

                    set({ inventoryCount: newInventoryCount });

                },
                decrementInventoryCount: (multiplier) => {
                    const { inventoryCount } = get()

                    set({
                        inventoryCount: inventoryCount - (multiplier ?? 1)
                    })
                },
                incrementInventoryCount: (multiplier) => {
                    const { inventoryCount } = get()

                    set({
                        inventoryCount: inventoryCount + (multiplier ?? 1)
                    })
                },
                maxInventorySpace: 5,
                maxBaseInventorySpace: 5,
                addToInventory: async (val, name, multiplier): Promise<void> => {
                    const { inventory, setInventoryCount, plantExists } = get()

                    // ✅ explicitly await to preserve Promise<void> typing
                    await addToInventory({
                        val,
                        name,
                        inventory,
                        plantExists,
                        setInventoryCount,
                        set,
                        multiplier,
                    })
                },
                removeFromInventory: (id, name) => {
                    const { inventory, plantExists, setInventoryCount } = get()

                    removeFromInventory({
                        inventory,
                        name,
                        plantExists,
                        id,
                        setInventoryCount,
                        set
                    })
                },
                setInventory: (count, val) => {
                    const { inventory, setInventoryCount } = get()

                    setInventory({
                        inventory,
                        val,
                        // set,
                        count,
                        setInventoryCount,
                    })
                },
                resetInventory: () => set({ inventory: {}, inventoryCount: 0 }),
                plantExists: (id, name) => {
                    const { inventory } = get()
                    if (name in inventory) {
                        return inventory[name].plants!.some((plant) => plant.id === id)
                    }
                    return false
                },
                showInventoryModal: false,
                toggleInventoryModal: () => set((state) => ({ showInventoryModal: !state.showInventoryModal })),
                getMaxInventorySpace: () => {
                    const base = get().maxBaseInventorySpace
                    const upgrades = useUpgradesStore.getState().upgrades
                    set({
                        maxInventorySpace: returnMaxInventorySpace(upgrades, base)
                    })
                },
                setMaxInventorySpace: () => {
                    const base = get().maxBaseInventorySpace
                    const upgrades = useUpgradesStore.getState().upgrades
                    const additionalInventorySpace = returnMaxInventorySpace(upgrades, base)

                    set({ maxInventorySpace: additionalInventorySpace })
                },
                pruneInactiveBuffs: async (): Promise<void> => {
                    const { inventory } = get();
                    const now = Date.now();

                    const updated = { ...inventory };

                    Object.values(updated).forEach((item) => {
                        if (!item.plants) return;
                        item.plants = item.plants.map((plant) => ({
                            ...plant,
                            buffs: plant.buffs.filter(
                                (buff) => !("expirationTime" in buff) || buff.expirationTime > now
                            ),
                        }));
                    });

                    set({ inventory: updated });
                }
            }
        },
        {
            name: 'inventory-storage',
            partialize: (state) => ({ inventory: state.inventory }),
            onRehydrateStorage: () => {
                return (state) => {
                    if (setFn && state) {
                        setFn({ inventoryHydrated: true })
                        state.setInventoryCount();
                    }
                }
            },
        }
    )
)