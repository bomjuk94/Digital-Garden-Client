import { create } from "zustand";
import { persist } from 'zustand/middleware'
import type { BaseUserType, plantMapType, PlantType } from "../types";
import type { Seed } from "@/features/Greenhouse/types/types";
import type { userBalanceActionType } from "../types";
import { apiFetch } from "../utils.ts/api";
import { fetchUpgrades } from "../fetch/upgrades/fetchUpgrades";
import { returnMaxInventorySpace } from "../utils.ts/returnMaxInventorySpace";
import { decrementInventoryCount } from "../fetch/inventory/decrementInventoryCount";
import type { StoreSupply, StoreUpgrade } from "@/features/Store/types";
import { v4 as uuidv4 } from 'uuid'
import type { PlantBuffTimerType } from "../types";
import { showToast } from "../utils.ts/showToast";
import { setRegisteredBalance } from "../fetch/profile/setRegisteredBalance";
import type { setSeedsCountProps } from "@/features/Greenhouse/types/types";
import { plants } from "../utils.ts/constants";
import { removeFromInventory } from "../utils.ts/removeFromInventory";
import { addToInventory } from "../utils.ts/addToInventory";
import type { PlantBuffType } from "../types";
import type { CapacityKeyType } from "../types";
import type { CapcityType } from "../types/CapacityType";
import { isHarvestable, isReadyForNextGrowthPhase, isPlantDead } from "@/features/Greenhouse/utilities.ts";
import { applySoilExpansion } from "@/features/Effects/upgrades/applySoilExpansion";
import { applyGenerateSeedsEffect } from "@/features/Effects/upgrades/applyGenerateSeedsEffect";
import type { plantMapObjectType } from "../types";
import type { GardenRemovalActions } from "@/features/Garden/types";
import { removeFromGarden } from "@/features/Garden/utilities/removeFromGarden";
import type { Customer } from "@/features/Shop/types";
import type { PurchaseType } from "@/features/Purchases/types";
import { customers } from "@/features/Shop/constants";
import { generateAndSetRandomCustomer } from "@/features/Shop/utilites/generateAndSetRandomCustomer";
import type { ShopRemovalActions } from "@/features/Shop/types";
import { removeFromShop } from "@/features/Shop/utilites/removeFromShop";
import { EffectNames } from "@/features/Effects/constants";
import { setInventory } from "../utils.ts/setInventory";

export type useRegisteredUserGameStore = {
    // Profile
    registeredProfile: BaseUserType | null
    setRegisteredProfile: (val: BaseUserType) => void
    setRegisteredProfileBalance: (val: number, action: userBalanceActionType) => void
    incrementRegisteredUsedPlantCapacity: () => void
    setRegisteredOnBoardingStatus: (val: boolean) => void
    setRegisteredPlantCapacity: (capacityKey: CapacityKeyType, type?: CapcityType, val?: number) => void
    setRegisteredPlantCapacityValue: (val: number, capacityKey: CapacityKeyType) => void
    addRegisteredPlantCapacitySpace: () => void
    setLastAtRegisteredShop: (val: number) => void
    getMaxRegisteredPlantCapacityValue: () => void
    // Seeds
    registeredSeeds: Seed[]
    setRegisteredSeeds: (val: Seed[]) => void
    decrementRegisteredSeedsCount: (name: string) => void
    findIndex: (name: string) => number | undefined
    showRegisteredSeedDetails: boolean
    setShowRegisteredSeedDetails: (val: boolean) => void
    registeredSeedDetails: Seed | null
    setRegisteredSeedDetails: (val: Seed | null) => void
    setRegisteredSeedCount: ({ name, val, type }: setSeedsCountProps) => void
    unlockRegisteredSeed: (name: string) => Promise<boolean>
    addRandomRegisteredSeedToList: (count?: number) => void
    // Plants
    registeredPlants: PlantType[]
    setRegisteredPlants: (val: PlantType[]) => void
    addRegisteredPlant: (val: PlantType) => void
    setRegisteredPlantIsWatered: (id: string, val: boolean) => void
    setRegisteredHasBeenWateredThisCycle: (id: string, val: boolean) => void
    removeRegisteredPlant: (id: string) => void
    registeredPlantBuffs: (PlantBuffType | PlantBuffTimerType)[]
    setRegisteredPlantBoost: (id: string, buff: PlantBuffType) => void
    setRegisteredPlantBuffs: (buffs: (PlantBuffType | PlantBuffTimerType)[]) => void
    updateRegisteredPlantGrowth: () => void
    resetRegisteredPlantBuffs: () => void
    // Inventory
    registeredInventory: plantMapType
    maxRegisteredInventorySpace: number
    maxRegisteredBaseInventorySpace: number
    registeredInventoryCount: number
    getRegisteredMaxInventorySpace: () => void
    setRegisteredMaxInventorySpace: () => void
    incrementRegisteredInventoryCount: (multiplier?: number) => void
    decrementRegisteredInventoryCount: (multiplier?: number) => void
    removeRegisteredPlantFromInventory: (id: string, name: string, multiplier?: number)
        => void
    setRegisteredInventoryCount: () => void
    addToRegisteredInventory: (val: PlantType, name: string, multiplier?: number) => Promise<void>
    pruneInactiveRegisteredBuffs: () => Promise<void>
    setRegisteredInventory: (count: number, val: plantMapObjectType) => void
    registeredPlantExistsInInventory: (id: string, name: string) => boolean
    // Supplies
    registeredSupplies: StoreSupply[]
    setRegisteredSupplies: (supplies: StoreSupply[]) => void
    addRegisteredSupply: (supply: StoreSupply) => void
    removeRegisteredSupply: (id: string) => void
    // Upgrades
    registeredUpgrades: StoreUpgrade[]
    addRegisteredUpgrade: (upgrade: StoreUpgrade) => void
    removeRegisteredUpgrade: (id: string) => void
    setRegisteredUpgrades: (upgrades: StoreUpgrade[]) => void
    // Buffs
    applyBuffToAllRegisteredPlants: (buff: PlantBuffTimerType) => void
    // Garden
    registeredGarden: plantMapType
    addRegisteredPlantToGarden: (val: PlantType, name: string) => void
    registeredPlantExists: (id: string, name: string) => boolean
    setRegisteredGarden: (garden: plantMapType) => void
    registeredPlantDetails: plantMapObjectType | null
    showRegisteredPlantDetails: boolean
    setRegisteredPlantDetails: (val: plantMapObjectType | null) => void
    setShowRegisteredPlantDetails: (val: boolean) => void
    removeFromRegisteredGarden: (plant: PlantType, name: string, action: GardenRemovalActions) => void
    addToRegisteredGarden: (val: PlantType, name: string) => void
    // Scheduler
    activeRegisteredIntervals: Record<string, NodeJS.Timeout>
    registerRegisteredInterval: (id: string, fn: () => void, delay: number) => void
    clearRegisteredIntervalById: (id: string) => void
    // Shop
    registeredShop: plantMapType
    setRegisteredShop: (shop: plantMapType) => void
    registeredShopPlantDetails: plantMapObjectType | null
    showRegisteredShopPlantDetails: boolean
    setShowRegisteredShopPlantDetails: (val: boolean) => void
    setRegisteredShopPlantDetails: (val: plantMapObjectType | null) => void
    showRegisteredShopPlantManagerDetails: boolean
    registeredShopPlantManagerDetails: plantMapObjectType | null
    setShowRegisteredShopPlantManagerDetails: (val: boolean) => void
    setRegisteredShopPlantMangerDetails: (val: plantMapObjectType | null) => void
    performRegisteredPassiveSale: () => void
    removeFromRegisteredShop: (plant: PlantType, name: string, action: ShopRemovalActions) => Promise<boolean>
    registeredShopPlantExists: (id: string, name: string) => boolean
    addToRegisteredShop: (val: PlantType, name: string) => void
    getCurrentRegisteredStockCount: (shop: plantMapType) => number
    maxRegisteredStockSpace: number
    getRegisteredMaxStockSpace: () => number
    deleteRegisteredPlant: (name: string) => void
    unstockRegisteredPlant: (plant: plantMapObjectType) => void
    // Customer
    registeredCustomer: Customer | null
    chooseRandomRegisteredCustomer: () => Customer | null
    chooseRandomRegisteredPlant: (shopStockList: plantMapType) => plantMapObjectType
    resetRegisteredCustomer: () => void
    registeredOneLinerActive: boolean
    setRegisteredOneLinerActive: (val: boolean) => void
    registeredIntervalId: NodeJS.Timeout | null
    chooseRandomRegisteredDialogOption: (dialogOptions: string[]) => string
    clearRegisteredCustomerInterval: (id: NodeJS.Timeout) => void
    setRegisteredIntervalId: (id: NodeJS.Timeout) => void
    // Purchases
    registeredPurchases: PurchaseType[]
    setRegisteredPurchases: (purchases: PurchaseType[]) => void
    addRegisteredPurchase: (val: PurchaseType) => void
}

let setFn: ((state: Partial<useRegisteredUserGameStore>) => void) | null = null

export const useRegisteredUserGameStore = create<useRegisteredUserGameStore>()(
    persist(
        (set, get) => {
            setFn = set

            return {
                registeredProfile: null,
                setRegisteredProfile: (val) => set({ registeredProfile: val }),
                setRegisteredProfileBalance: async (val, action) => {
                    set((state) => {
                        if (!state.registeredProfile) return state

                        const balanceChange = action === 'increase' ? val : -val

                        return {
                            registeredProfile: {
                                ...state.registeredProfile,
                                balance: state.registeredProfile.balance + balanceChange,
                            },
                        }
                    })

                    try {
                        const token = localStorage.getItem('token')
                        if (token) {
                            await setRegisteredBalance(val, action, token)
                        }
                    } catch (error) {
                        console.error("Failed to update balance:", error)
                    }
                },
                // setRegisteredProfileBalance: async (val, action) => {
                //     const { registeredProfile } = get()
                //     if (!registeredProfile) return
                //     let balance = registeredProfile.balance

                //     balance += action === 'increase' ? val : -val

                //     const updated = {
                //         ...registeredProfile,
                //         balance,
                //     }
                //     // Request to update balance
                //     const token = localStorage.getItem('token')
                //     if (token) {
                //         await setRegisteredBalance(val, action, token)
                //     }

                //     set({ registeredProfile: updated })
                // },
                incrementRegisteredUsedPlantCapacity: async () => {
                    const { registeredProfile } = get()
                    if (!registeredProfile || !registeredProfile.game) return;

                    const updated = {
                        ...registeredProfile,
                        game: {
                            ...registeredProfile?.game,
                            usedPlantCapacity: registeredProfile?.game.usedPlantCapacity + 1,
                        }
                    }
                    set({ registeredProfile: updated })

                    try {
                        const token = localStorage.getItem('token')

                        await apiFetch("/api/profile/usedPlantCapacity", {
                            method: "PATCH",
                            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
                        })
                    } catch (error) {
                        console.log(error)
                    }
                },
                setRegisteredOnBoardingStatus: async (val) => {
                    const { registeredProfile } = get()
                    if (!registeredProfile) return

                    const updated = {
                        ...registeredProfile,
                        onboardingComplete: val,
                    }

                    try {
                        const token = localStorage.getItem('token')
                        if (!token) return

                        const response = await apiFetch("/api/profile/onboardingStatus", {
                            method: "PATCH",
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": 'application/json',
                            },
                            body: JSON.stringify({
                                status: val,
                            })
                        })

                        if (!response.ok) return
                    } catch (error) {
                        console.log(error)
                    }
                    set({ registeredProfile: updated })
                },
                setRegisteredPlantCapacity: (capacityKey, type?, val?) => {
                    const { registeredProfile, setRegisteredPlantCapacityValue } = get()

                    if (!registeredProfile) return

                    const current = registeredProfile.game.usedPlantCapacity

                    let newCount = current

                    if (type === 'increment') {
                        newCount = current + 1
                    } else if (type === 'decrement') {
                        newCount = Math.max(0, current - 1)
                    } else if (val !== undefined) {
                        newCount = val
                    }

                    setRegisteredPlantCapacityValue(newCount, capacityKey)
                },
                setRegisteredPlantCapacityValue: async (val, capacityKey) => {
                    const { registeredProfile } = get()

                    const updated = {
                        ...registeredProfile!,
                        game: {
                            ...registeredProfile!.game,
                            [capacityKey]: val
                        },
                    }
                    set({ registeredProfile: updated })

                    // Request to update profile
                    try {
                        const token = localStorage.getItem('token')
                        if (!token) return

                        const response = await apiFetch("/api/profile/update", {
                            method: "PUT",
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": 'application/json',
                            },
                            body: JSON.stringify({
                                updatedProfile: updated,
                            })
                        })

                        if (!response.ok) return
                    } catch (error) {
                        console.log(error)
                    }
                },
                addRegisteredPlantCapacitySpace: async () => {
                    const { registeredProfile, registeredUpgrades } = get()

                    if (!registeredProfile || !registeredUpgrades) return

                    await applySoilExpansion({ userProfile: registeredProfile })
                },
                setLastAtRegisteredShop: async (val) => {
                    const { registeredProfile } = get()
                    if (!registeredProfile) return

                    const updated = {
                        ...registeredProfile,
                        lastAtShop: val,
                    }
                    set({ registeredProfile: updated })
                    // request to update lastAtShop
                    try {
                        const token = localStorage.getItem('token')

                        await apiFetch("/api/profile/update", {
                            method: "PUT",
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                updatedProfile: updated,
                            })
                        })
                    } catch (error) {
                        console.log(error)
                    }
                },
                getMaxRegisteredPlantCapacityValue: () => {
                    const { registeredProfile, registeredUpgrades } = get()
                    if (!registeredProfile) return

                    const base = registeredProfile.game.plantCapacity ?? 3
                    const bonus = registeredUpgrades
                        .filter(u => u.effect.toLowerCase() === EffectNames.IncreasePots.toLowerCase())
                        .reduce((sum, u) => sum + u.multiplier, 0)

                    const maxPlantSpace = base + bonus

                    const updated = {
                        ...registeredProfile,
                        game: {
                            ...registeredProfile.game,
                            calculatedPlantCapacity: maxPlantSpace,
                        },
                    }

                    set({ registeredProfile: updated })
                },
                registeredSeeds: [],
                setRegisteredSeeds: (val) => set({ registeredSeeds: val }),
                decrementRegisteredSeedsCount: (name) => {
                    const { registeredSeeds, findIndex } = get()

                    const index = findIndex(name)
                    if (index === undefined) return

                    const updated = [...registeredSeeds]

                    const currentCount = updated[index].count
                    const newCount = currentCount - 1
                    updated[index] = { ...updated[index], count: newCount }

                    set({ registeredSeeds: updated })
                },

                findIndex: (name) => {
                    const { registeredSeeds } = get()
                    const index = registeredSeeds.findIndex((seed) => seed.name === name)
                    return index !== -1 ? index : undefined
                },
                showRegisteredSeedDetails: false,
                setShowRegisteredSeedDetails: (val) => set({ showRegisteredSeedDetails: val }),
                registeredSeedDetails: null,
                setRegisteredSeedDetails: (val) => set({ registeredSeedDetails: val }),
                setRegisteredSeedCount: async ({ name, val, type }) => {
                    const { registeredSeeds, findIndex } = get()

                    const index = findIndex(name)
                    if (index === undefined) return

                    const updated = [...registeredSeeds]
                    const currentCount = updated[index].count
                    const newCount = type === 'increment' ? currentCount + 1 : currentCount - 1

                    if (type === 'increment' || type === 'decrement') {
                        updated[index] = { ...updated[index], count: newCount }
                    } else if (val !== undefined) {
                        updated[index] = { ...updated[index], count: val }
                    }
                    // Request to update seeds count
                    try {
                        const token = localStorage.getItem('token')

                        await apiFetch("/api/seeds/count", {
                            method: "PUT",
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": 'application/json',
                            },
                            body: JSON.stringify({
                                name,
                                updatedSeed: updated,
                            })
                        })
                    } catch (error) {
                        console.log(error)
                    }

                    set({ registeredSeeds: updated })
                },
                unlockRegisteredSeed: async (name): Promise<boolean> => {
                    const { registeredSeeds, findIndex } = get()

                    const index = findIndex(name)
                    if (index === undefined) return false

                    const updated = [...registeredSeeds]
                    updated[index] = {
                        ...updated[index],
                        locked: false,
                    }
                    // Request to change locked value for chosen seed
                    try {
                        const token = localStorage.getItem('token')

                        await apiFetch("/api/seeds/unlock", {
                            method: "PUT",
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": 'application/json',
                            },
                            body: JSON.stringify({
                                name,
                                updatedSeed: updated,
                            })
                        })
                    } catch (error) {
                        console.log(error)
                    }

                    set({ registeredSeeds: updated })
                    return true
                },
                addRandomRegisteredSeedToList: (count?) => {
                    const { registeredSeeds } = get()

                    applyGenerateSeedsEffect({
                        seeds: registeredSeeds,
                        count,
                        // set,
                    })
                },
                registeredPlants: [],
                setRegisteredPlants: (val) => set({ registeredPlants: val }),
                addRegisteredPlant: async (val) => {
                    const { registeredPlants } = get()
                    const updated = [...registeredPlants, val]
                    set({ registeredPlants: updated })

                    try {
                        const token = localStorage.getItem('token')
                        if (!token) return

                        const res = await fetch("/api/plants/add", {
                            method: "POST",
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": 'application/json'
                            },
                            body: JSON.stringify({
                                plant: val,
                            })
                        })
                        if (res.ok) {
                            showToast('success', `${val.label} added!`)
                        } else {
                            showToast('error', `Could not add ${val.label}`)
                        }
                    } catch (error) {
                        console.log(error)
                    }
                },
                setRegisteredPlantIsWatered: async (id, val) => {
                    const { registeredPlants } = get()
                    const updatedPlants = registeredPlants.map((plant) => {
                        if (plant.id === id) {
                            return {
                                ...plant,
                                isWatered: val,
                            }
                        } else {
                            return plant
                        }
                    })
                    set({ registeredPlants: updatedPlants })
                    // Request to update plants
                    try {
                        const token = localStorage.getItem('token')

                        await apiFetch("/api/plants/update", {
                            method: "PUT",
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": 'application/json',
                            },
                            body: JSON.stringify({
                                updatedPlants,
                            })
                        })
                    } catch (error) {
                        console.log(error)
                    }
                },
                setRegisteredHasBeenWateredThisCycle: async (id, val) => {
                    const { registeredPlants } = get()
                    const updatedPlants = registeredPlants.map((plant) => {
                        if (plant.id === id) {
                            return {
                                ...plant,
                                hasBeenWateredThisCycle: val,
                            }
                        } else {
                            return plant
                        }
                    })
                    set({ registeredPlants: updatedPlants })

                    try {
                        const token = localStorage.getItem('token')

                        await apiFetch("/api/plants/update", {
                            method: "PUT",
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": 'application/json',
                            },
                            body: JSON.stringify({
                                updatedPlants,
                            })
                        })
                    } catch (error) {
                        console.log(error)
                    }
                },
                removeRegisteredPlant: async (id) => {
                    const { registeredPlants } = get()
                    const updated = registeredPlants.filter((plant) => plant.id !== id)
                    set({ registeredPlants: updated })

                    try {
                        const token = localStorage.getItem('token')

                        await apiFetch("/api/plants/remove", {
                            method: "PATCH",
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": 'application/json',
                            },
                            body: JSON.stringify({
                                idToRemove: id,
                            })
                        })
                    } catch (error) {
                        console.log(error)
                    }
                },
                setRegisteredPlantBoost: async (id, buff) => {
                    // Add buff to chosen plant
                    const { registeredPlants } = get()
                    const updated = registeredPlants.map((plant) => {
                        if (plant.id === id) {
                            return {
                                ...plant,
                                buffs: [...plant.buffs, buff]
                            }
                        }
                        return plant
                    })
                    set({ registeredPlants: updated })

                    try {
                        const token = localStorage.getItem('token')

                        await apiFetch("/api/plants/update", {
                            method: "PUT",
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": 'application/json',
                            },
                            body: JSON.stringify({
                                updatedPlants: updated,
                            })
                        })
                    } catch (error) {
                        console.log(error)
                    }
                },
                registeredPlantBuffs: [],
                setRegisteredPlantBuffs: (buffs) => {
                    set({ registeredPlantBuffs: [...buffs] })
                },
                updateRegisteredPlantGrowth: async () => {
                    const { registeredPlants } = get()
                    const now = Date.now()

                    const updatedPlants = registeredPlants.map((plant) => {
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

                    set({ registeredPlants: updatedPlants })
                    // update plants
                    try {
                        const token = localStorage.getItem('token')

                        await apiFetch("/api/plants/update", {
                            method: "PUT",
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": 'application/json',
                            },
                            body: JSON.stringify({
                                updatedPlants,
                            })
                        })
                    } catch (error) {
                        console.log(error)
                    }
                },
                resetRegisteredPlantBuffs: () => { set({ registeredPlantBuffs: [] }) },
                registeredInventory: {} as plantMapType,
                maxRegisteredInventorySpace: 5,
                maxRegisteredBaseInventorySpace: 5,
                registeredInventoryCount: 0,
                getRegisteredMaxInventorySpace: async () => {
                    const base = get().maxRegisteredBaseInventorySpace
                    // Fetch upgrades
                    const token = localStorage.getItem('token')
                    if (!token) return
                    const upgrades = await fetchUpgrades(token)
                    // Return total inventory space
                    set({
                        maxRegisteredInventorySpace: returnMaxInventorySpace(upgrades.upgrades, base)
                    })
                },
                setRegisteredMaxInventorySpace: async () => {
                    const base = get().maxRegisteredBaseInventorySpace
                    // Fetch upgrades
                    const token = localStorage.getItem('token')
                    if (!token) return
                    const upgrades = await fetchUpgrades(token)
                    // Return total inventory space
                    const additionalInventorySpace = returnMaxInventorySpace(upgrades.upgrades, base)

                    set({ maxRegisteredBaseInventorySpace: additionalInventorySpace })
                },
                incrementRegisteredInventoryCount: async (multiplier) => {
                    const { registeredInventoryCount } = get()

                    set({
                        registeredInventoryCount: registeredInventoryCount + (multiplier ?? 1)
                    })
                    // Request to increment db inventory count
                    try {
                        const token = localStorage.getItem('token')

                        const newCount = registeredInventoryCount + (multiplier ?? 1)

                        await apiFetch("/api/inventory/count", {
                            method: "PATCH",
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": 'application/json'
                            },
                            body: JSON.stringify({
                                count: newCount
                            })
                        })
                    } catch (error) {
                        console.log(error)
                    }
                },
                decrementRegisteredInventoryCount: async (multiplier?: number) => {
                    const { registeredInventoryCount } = get()
                    await decrementInventoryCount(registeredInventoryCount, multiplier)

                    set({
                        registeredInventoryCount: registeredInventoryCount - (multiplier ?? 1)
                    })
                },
                removeRegisteredPlantFromInventory: (id, name) => {
                    const { registeredInventory, registeredPlantExistsInInventory, setRegisteredInventoryCount } = get()

                    removeFromInventory({
                        inventory: registeredInventory,
                        name,
                        plantExists: registeredPlantExistsInInventory,
                        id,
                        setInventoryCount: setRegisteredInventoryCount,
                        // set,
                    })
                },
                setRegisteredInventoryCount: () => {
                    const { registeredInventory } = get()

                    const newInventoryCount = Object.values(registeredInventory).reduce(
                        (acc, plant) => acc + (plant.count || 0),
                        0
                    )

                    set({ registeredInventoryCount: newInventoryCount })
                },
                addToRegisteredInventory: async (val, name, multiplier): Promise<void> => {
                    const { registeredInventory, setRegisteredInventoryCount, registeredPlantExists } = get()

                    await addToInventory({
                        val,
                        name,
                        inventory: registeredInventory,
                        plantExists: registeredPlantExists,
                        setInventoryCount: setRegisteredInventoryCount,
                        multiplier,
                    })
                },
                pruneInactiveRegisteredBuffs: async (): Promise<void> => {
                    const { registeredInventory } = useRegisteredUserGameStore.getState()
                    const now = Date.now()

                    const updated = Object.fromEntries(
                        Object.entries(registeredInventory).map(([key, item]) => [
                            key,
                            {
                                ...item,
                                plants: item.plants?.map((plant) => ({
                                    ...plant,
                                    buffs: plant.buffs.filter(
                                        (buff) =>
                                            !("expirationTime" in buff) ||
                                            buff.expirationTime > now
                                    ),
                                })) ?? [],
                            },
                        ])
                    )

                    if (!updated || Object.keys(updated).length === 0) {
                        console.warn("Skipping buff pruning: registered inventory empty")
                        return
                    }

                    useRegisteredUserGameStore.setState({ registeredInventory: updated })

                    try {
                        const token = localStorage.getItem("token")
                        if (!token) return

                        await apiFetch("/api/inventory/update", {
                            method: "PUT",
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ updatedInventory: updated }),
                        })
                    } catch (error) {
                        console.error("Registered inventory update error:", error)
                    }
                },
                setRegisteredInventory: (count, val) => {
                    const { registeredInventory, setRegisteredInventoryCount } = get()

                    setInventory({
                        inventory: registeredInventory,
                        val,
                        count,
                        setInventoryCount: setRegisteredInventoryCount,
                    })
                },
                registeredPlantExistsInInventory: (id: string, name: string) => {
                    const { registeredInventory } = get()
                    if (name in registeredInventory) {
                        return registeredInventory[name].plants!.some((plant) => plant.id === id)
                    }
                    return false
                },
                registeredSupplies: [],
                setRegisteredSupplies: (supplies) => {
                    set({ registeredSupplies: supplies })
                },
                addRegisteredSupply: async (supply: StoreSupply) => {
                    const { registeredSupplies } = get()
                    const newSupply = { ...supply, id: uuidv4() }
                    const updated = [...registeredSupplies, newSupply]
                    try {
                        const token = localStorage.getItem('token')

                        await apiFetch("/api/supplies/add", {
                            method: "PATCH",
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": 'application/json'
                            },
                            body: JSON.stringify({
                                supply: newSupply,
                            })
                        })
                    } catch (error) {
                        console.log(error)
                    }

                    set({ registeredSupplies: updated })
                },
                removeRegisteredSupply: async (id: string) => {
                    const { registeredSupplies } = get()
                    const updated = registeredSupplies.filter((supply) => supply.id !== id)
                    set({ registeredSupplies: updated })
                    try {
                        const token = localStorage.getItem('token')

                        await apiFetch("/api/supplies/remove", {
                            method: "PATCH",
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                supplyId: id,
                            })
                        })
                    } catch (error) {
                        console.log(error)
                    }
                },
                registeredUpgrades: [],
                addRegisteredUpgrade: async (upgrade) => {
                    const { registeredUpgrades } = get()
                    const newUpgrade = { ...upgrade, id: uuidv4() }
                    const updated = [...registeredUpgrades, newUpgrade]
                    try {
                        const token = localStorage.getItem('token')

                        await apiFetch("/api/upgrades/add", {
                            method: "PATCH",
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": 'application/json'
                            },
                            body: JSON.stringify({
                                upgrade: newUpgrade,
                            })
                        })
                    } catch (error) {
                        console.log(error)
                    }

                    set({ registeredUpgrades: updated })
                },
                removeRegisteredUpgrade: (id: string) => {
                    const { registeredUpgrades } = get()
                    const updated = registeredUpgrades.filter((upgrade) => upgrade.id !== id)
                    set({ registeredUpgrades: updated })
                },
                setRegisteredUpgrades: (upgrades) => set({ registeredUpgrades: upgrades }),
                applyBuffToAllRegisteredPlants: async (buff) => {
                    const { registeredPlants } = get()
                    const updated = registeredPlants.map(plant =>
                        plant.isDead
                            ? plant
                            : { ...plant, buffs: [...plant.buffs, buff] }
                    )
                    try {
                        const token = localStorage.getItem('token')

                        const response = await apiFetch("/api/plants/buffs", {
                            method: "PUT",
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": 'application/json',
                            },
                            body: JSON.stringify({
                                updatedPlants: updated,
                            })
                        })

                        if (response.ok) {
                            showToast('success', 'Buff applied!')
                        }
                    } catch (error) {
                        console.log(error)
                    }

                    set({ registeredPlants: updated })
                },
                registeredGarden: {} as plantMapType,
                addRegisteredPlantToGarden: async (val, name) => {
                    const { registeredGarden, registeredPlantExists, removeRegisteredPlantFromInventory } = get()

                    const updated = { ...registeredGarden }

                    if (name in registeredGarden) {
                        if (!registeredPlantExists(val.id, val.name)) {
                            updated[name] = {
                                ...updated[name],
                                count: registeredGarden[name].count! + 1,
                                plants: [...registeredGarden[name].plants!, val],
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
                    removeRegisteredPlantFromInventory(val.id, name)

                    set({ registeredGarden: updated })
                    try {
                        const token = localStorage.getItem('token')

                        await apiFetch("/api/garden/update", {
                            method: "PUT",
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                updatedGarden: updated,
                            })
                        })
                    } catch (error) {
                        console.log(error)
                    }
                },
                setRegisteredGarden: (garden) => set({ registeredGarden: garden }),
                registeredPlantDetails: null,
                showRegisteredPlantDetails: false,
                setRegisteredPlantDetails: (val) => set({ registeredPlantDetails: val }),
                setShowRegisteredPlantDetails: (val) => set({ showRegisteredPlantDetails: val }),
                removeFromRegisteredGarden: (plant, name, action) => {
                    const { registeredGarden, registeredPlantExists, addToRegisteredInventory } = get()

                    if (!plant || !plant.id) return

                    removeFromGarden({
                        garden: registeredGarden,
                        name,
                        plantExists: registeredPlantExists,
                        id: plant.id,
                    })

                    if (action === 'discard') return

                    addToRegisteredInventory(plant, name)
                },
                addToRegisteredGarden: async (val, name) => {
                    const { registeredGarden, registeredPlantExists, removeRegisteredPlantFromInventory } = get()

                    const updated = { ...registeredGarden }

                    if (name in registeredGarden) {
                        if (!registeredPlantExists(val.id, val.name)) {
                            updated[name] = {
                                ...updated[name],
                                count: registeredGarden[name].count! + 1,
                                plants: [...registeredGarden[name].plants!, val],
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

                    removeRegisteredPlantFromInventory(val.id, name)

                    set({ registeredGarden: updated })
                    try {
                        const token = localStorage.getItem('token')

                        await apiFetch("/api/garden/update", {
                            method: "PUT",
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                updatedGarden: updated
                            })
                        })
                    } catch (error) {
                        console.log(error)
                    }
                },
                registeredPlantExists: (id, name) => {
                    const { registeredGarden } = get()
                    if (name in registeredGarden) {
                        return registeredGarden[name].plants!.some((plant) => plant.id === id)
                    }
                    return false
                },
                activeRegisteredIntervals: {},
                registerRegisteredInterval: (id, fn, delay) => {
                    get().clearRegisteredIntervalById(id)
                    const interval = setInterval(fn, delay)
                    set((state) => ({
                        activeRegisteredIntervals: {
                            ...state.activeRegisteredIntervals,
                            [id]: interval,
                        },
                    }))
                },
                clearRegisteredIntervalById: (id) => {
                    const existing = get().activeRegisteredIntervals[id]
                    if (existing) {
                        clearInterval(existing)
                        set((state) => {
                            const updated = { ...state.activeRegisteredIntervals }
                            delete updated[id]
                            return { activeRegisteredIntervals: updated }
                        })
                    }
                },
                registeredShop: {},
                setRegisteredShop: (shop) => set({ registeredShop: shop }),
                registeredShopPlantDetails: null,
                showRegisteredShopPlantDetails: false,
                setShowRegisteredShopPlantDetails: (val) => set({ showRegisteredShopPlantDetails: val }),
                setRegisteredShopPlantDetails: (val) => set({ registeredShopPlantDetails: val }),
                registeredShopPlantManagerDetails: null,
                showRegisteredShopPlantManagerDetails: false,
                setShowRegisteredShopPlantManagerDetails: (val) => set({ showRegisteredShopPlantManagerDetails: val }),
                setRegisteredShopPlantMangerDetails: (val) => set({ registeredShopPlantManagerDetails: val }),
                performRegisteredPassiveSale: () => {
                    const {
                        removeFromRegisteredShop,
                        chooseRandomRegisteredCustomer,
                        resetRegisteredCustomer,
                        setRegisteredProfileBalance,
                        addRegisteredPurchase,
                    } = get()

                    const newCustomer = chooseRandomRegisteredCustomer()
                    if (!newCustomer || !newCustomer?.purchasePrice) return

                    setRegisteredProfileBalance((newCustomer?.purchasePrice ?? 0), 'increase')

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
                    addRegisteredPurchase(purchase)
                    removeFromRegisteredShop(
                        newCustomer.plant.plants[0], newCustomer.plantName,
                        'sell'
                    )
                    resetRegisteredCustomer()
                },
                removeFromRegisteredShop: async (plant, name, action): Promise<boolean> => {

                    const { registeredShop, registeredShopPlantExists, addToRegisteredInventory } = get()

                    const success = await removeFromShop({
                        shop: registeredShop,
                        name,
                        plantExists: registeredShopPlantExists,
                        id: plant.id,
                    })

                    if (!success) return false

                    if (action !== 'discard' && action !== 'sell') {
                        addToRegisteredInventory(plant, name);
                    }

                    return true;
                },
                registeredShopPlantExists: (id, name) => {
                    const { registeredShop } = get()
                    if (name in registeredShop) {
                        return registeredShop[name].plants!.some((plant) => plant.id === id)
                    }
                    return false
                },
                addToRegisteredShop: async (val, name) => {
                    const {
                        registeredShop,
                        registeredShopPlantExists,
                        removeRegisteredPlantFromInventory,
                    } = get()

                    const updated = { ...registeredShop }

                    if (name in registeredShop) {
                        if (!val.id) return
                        if (!registeredShopPlantExists(val.id, val.name)) {
                            updated[name] = {
                                ...updated[name],
                                count: registeredShop[name].count! + 1,
                                plants: [...registeredShop[name].plants!, val],
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
                    removeRegisteredPlantFromInventory(val.id, name)

                    set({ registeredShop: updated })

                    try {
                        const token = localStorage.getItem('token')

                        await apiFetch("/api/shop/update", {
                            method: "PUT",
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                updatedShop: updated,
                            })
                        })
                    } catch (error) {
                        console.log(error)
                    }

                },
                getCurrentRegisteredStockCount: (shop) => {
                    return Object.values(shop).reduce((acc, curr) => {
                        return acc + (curr.count ?? 0)
                    }, 0)
                },
                maxRegisteredStockSpace: 3,
                getRegisteredMaxStockSpace: (): number => {
                    const {
                        maxRegisteredStockSpace,
                        registeredUpgrades,
                    } = get()

                    const increaseShopExists = registeredUpgrades?.find((upgrade) => upgrade.effect === EffectNames.IncreaseShop)

                    if (!increaseShopExists) return maxRegisteredStockSpace

                    const multiplier = increaseShopExists.multiplier

                    const effectCount = registeredUpgrades?.reduce((acc, curr) => {
                        if (curr.effect === EffectNames.IncreaseShop) {
                            return acc + 1
                        }

                        return acc
                    }, 0)

                    if (!effectCount) return maxRegisteredStockSpace

                    return maxRegisteredStockSpace + (multiplier * effectCount)
                },
                deleteRegisteredPlant: (name) => {
                    const { registeredShop } = get()

                    const updated = { ...registeredShop }
                    delete updated[name]
                    set({ registeredShop: updated })

                    try {
                        const token = localStorage.getItem('token')

                        apiFetch("/api/shop/update", {
                            method: "PUT",
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                updatedShop: updated
                            })
                        })
                    } catch (error) {
                        console.log(error)
                    }
                },
                unstockRegisteredPlant: (plant) => {
                    const {
                        registeredInventoryCount,
                        maxRegisteredInventorySpace,
                        setRegisteredInventory,
                    } = get()

                    if (!plant || typeof plant.count !== "number") return
                    if (plant.count > (maxRegisteredInventorySpace - registeredInventoryCount)) return showToast('error', 'Not enough space in inventory')
                    if (!plant || !Array.isArray(plant.plants)) return
                    setRegisteredInventory(plant.count, plant)
                },
                registeredCustomer: null,
                chooseRandomRegisteredCustomer: (): Customer | null => {
                    const { chooseRandomRegisteredPlant, resetRegisteredCustomer, registeredShop } = get()

                    const randomCustomer = generateAndSetRandomCustomer({
                        resetCustomer: resetRegisteredCustomer,
                        shopList: registeredShop,
                        customers,
                        chooseRandomPlant: chooseRandomRegisteredPlant,
                    })

                    if (!randomCustomer) {
                        return null
                    }
                    return randomCustomer

                },
                chooseRandomRegisteredPlant: (shopStockList) => {
                    const plants = Object.values(shopStockList);
                    const randomPlant = plants[Math.floor(Math.random() * plants.length)];
                    return randomPlant
                },
                resetRegisteredCustomer: () => set({
                    registeredCustomer: null,
                    registeredIntervalId: null,
                    registeredOneLinerActive: false
                }),
                registeredOneLinerActive: false,
                setRegisteredOneLinerActive: (val) => set({ registeredOneLinerActive: val }),
                registeredIntervalId: null,
                chooseRandomRegisteredDialogOption: (dialogOptions) => {
                    const randomDialog = dialogOptions[Math.floor(Math.random() * dialogOptions.length)];
                    return randomDialog
                },
                clearRegisteredCustomerInterval: (id) => {
                    if (id) {
                        clearInterval(id)
                    }
                },
                setRegisteredIntervalId: (id) => set({ registeredIntervalId: id }),
                registeredPurchases: [],
                setRegisteredPurchases: (purchases) => set({ registeredPurchases: purchases }),
                addRegisteredPurchase: async (val) => {
                    const { registeredPurchases } = get()
                    const updated = [...registeredPurchases, val]
                    set({ registeredPurchases: updated })
                    try {
                        const token = localStorage.getItem('token')

                        await apiFetch("/api/purchases/update", {
                            method: "PUT",
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                updatedPurchases: updated,
                            })
                        })
                    } catch (error) {
                        console.log(error)
                    }
                },
            }

        },
        {
            name: 'registered-user-game-storage',
            partialize: (state) => ({
                registeredProfile: state.registeredProfile,
                registeredInventory: state.registeredInventory,
                registeredInventoryCount: state.registeredInventoryCount,
                registeredSeeds: state.registeredSeeds,
                registeredGarden: state.registeredGarden,
                registeredSupplies: state.registeredSupplies,
                registeredUpgrades: state.registeredUpgrades,
                registeredPlants: state.registeredPlants,
                registeredShop: state.registeredShop,
                registeredCustomer: state.registeredCustomer,
                registeredPurchases: state.registeredPurchases,
            }),
        }
    )
)