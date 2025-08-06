import { useInventoryStore } from "@/shared/stores/useInventoryStore"
import type { plantMapType, PlantType, plantMapObjectType } from "@/shared/types"
import type { ShopRemovalActions } from "../types/ShopRemovalTypes"
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { showToast } from "@/shared/utils.ts/showToast"
import { plants } from "@/shared/utils.ts/constants"
import { removeFromShop } from "../utilites/removeFromShop"
import { useCustomerStore } from "./useCustomerStore"
import { useUserProfileStore } from "@/shared/stores/useUserProfileStore"
import { usePurchasesStore } from "@/features/Purchases/stores/usePurchasesStore"
import type { PurchaseType } from "@/features/Purchases/types"
import { EffectNames } from "@/features/Effects/constants"
import { useUpgradesStore } from "@/features/Greenhouse/stores/useUpgradesStore"

export type ShopStore = {
    shop: plantMapType
    shopHydrated: boolean
    addToShop: (val: PlantType, name: string) => void
    removeFromShop: (plant: PlantType, name: string, action: ShopRemovalActions) => Promise<boolean>
    resetShop: () => void
    plantExists: (id: string, name: string) => boolean
    plantDetails: plantMapObjectType | null
    setPlantDetails: (val: plantMapObjectType | null) => void
    showPlantDetails: boolean
    setShowPlantDetails: (val: boolean) => void
    plantManagerDetails: plantMapObjectType | null
    setPlantMangerDetails: (val: plantMapObjectType | null) => void
    showPlantManagerDetails: boolean
    setShowPlantManagerDetails: (val: boolean) => void
    unstockPlant: (plant: plantMapObjectType) => void
    performPassiveSale: () => void
    deletePlant: (name: string) => void
    maxStockSpace: number
    getMaxStockSpace: () => number
    getCurrentStockCount: (shop: plantMapType) => number
    setShop: (shop: plantMapType) => void
}

let setFn: ((state: Partial<ShopStore>) => void) | null = null

export const useShopStore = create<ShopStore>()(
    persist(
        (set, get) => {
            setFn = set
            return {
                shop: {},
                shopHydrated: false,
                addToShop: (val, name) => {
                    const { shop, plantExists } = get()
                    const { removeFromInventory } = useInventoryStore.getState()

                    const updated = { ...shop }

                    if (name in shop) {
                        if (!val.id) return
                        if (!plantExists(val.id, val.name)) {
                            updated[name] = {
                                ...updated[name],
                                count: shop[name].count! + 1,
                                plants: [...shop[name].plants!, val],
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
                    if (!val.id) return
                    removeFromInventory(val.id, name)

                    set({ shop: updated })
                },
                removeFromShop: async (plant, name, action): Promise<boolean> => {

                    const { shop, plantExists } = get()
                    const addToInventory = useInventoryStore.getState().addToInventory

                    const success = await removeFromShop({
                        shop,
                        name,
                        plantExists,
                        id: plant.id,
                    })

                    if (!success) return false

                    if (action !== 'discard' && action !== 'sell') {
                        addToInventory(plant, name);
                    }

                    return true;
                },
                resetShop: () => set({ shop: {} }),
                plantExists: (id, name) => {
                    const { shop } = get()
                    if (name in shop) {
                        return shop[name].plants!.some((plant) => plant.id === id)
                    }
                    return false
                },
                plantDetails: null,
                setPlantDetails: (val) => set({ plantDetails: val }),
                showPlantDetails: false,
                setShowPlantDetails: (val) => set({ showPlantDetails: val }),
                plantManagerDetails: null,
                setPlantMangerDetails: (val) => set({ plantManagerDetails: val }),
                showPlantManagerDetails: false,
                setShowPlantManagerDetails: (val) => set({ showPlantManagerDetails: val }),
                unstockPlant: (plant) => {
                    const inventoryCount = useInventoryStore.getState().inventoryCount
                    const maxInventoryCount = useInventoryStore.getState().maxInventorySpace
                    const setInventory = useInventoryStore.getState().setInventory

                    if (!plant || typeof plant.count !== "number") return
                    if (plant.count > (maxInventoryCount - inventoryCount)) return showToast('error', 'Not enough space in inventory')
                    if (!plant || !Array.isArray(plant.plants)) return
                    setInventory(plant.count, plant)
                },
                performPassiveSale: () => {
                    const { removeFromShop } = get()
                    const chooseRandomCustomer = useCustomerStore.getState().chooseRandomCustomer
                    const resetCustomer = useCustomerStore.getState().resetCustomer
                    const setUserBalance = useUserProfileStore.getState().setBalance
                    const addPurchase = usePurchasesStore.getState().addPurchase

                    const newCustomer = chooseRandomCustomer()
                    if (!newCustomer || !newCustomer?.purchasePrice) return

                    setUserBalance((newCustomer?.purchasePrice ?? 0), 'increase')
                    if (!newCustomer || !newCustomer.plant || !newCustomer.plant.plants || !newCustomer.plantName) return
                    const purchase: PurchaseType = {
                        customer: {
                            id: newCustomer.id,
                            name: newCustomer.name,
                            image: newCustomer.image,
                        },
                        plant: newCustomer.plant.plants[0],
                        purchasePrice: newCustomer.purchasePrice,
                        timestamp: Date.now(),
                        method: 'passive',
                    }
                    addPurchase(purchase)
                    removeFromShop(newCustomer.plant.plants[0], newCustomer.plantName, 'sell')
                    resetCustomer()
                },
                deletePlant: (name) => {
                    const { shop } = get()

                    const updated = { ...shop }
                    delete updated[name]
                    set({ shop: updated })
                },
                maxStockSpace: 3,
                getMaxStockSpace: (): number => {
                    const { maxStockSpace } = get()
                    const upgrades = useUpgradesStore.getState().upgrades
                    const increaseShopExists = upgrades?.find((upgrade) => upgrade.effect === EffectNames.IncreaseShop)

                    if (!increaseShopExists) return maxStockSpace

                    const multiplier = increaseShopExists.multiplier

                    const effectCount = upgrades?.reduce((acc, curr) => {
                        if (curr.effect === EffectNames.IncreaseShop) {
                            return acc + 1
                        }

                        return acc
                    }, 0)

                    if (!effectCount) return maxStockSpace

                    return maxStockSpace + (multiplier * effectCount)
                },
                getCurrentStockCount: (shop) => {
                    return Object.values(shop).reduce((acc, curr) => {
                        return acc + (curr.count ?? 0)
                    }, 0)
                },
                setShop: (shop) => set({ shop })
            }
        },
        {
            name: "shop-storage",
            partialize: (state) => ({
                shop: state.shop,
            }),
            onRehydrateStorage: () => {
                return () => {
                    if (setFn) {
                        setFn({ shopHydrated: true })
                    }
                }
            },
        }
    )
)