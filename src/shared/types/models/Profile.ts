import type { PurchaseType } from "@/features/Purchases/types";
import type { plantMapType, PlantType } from "./Plant";
import type { StoreSupply, StoreUpgrade } from "@/features/Store/types";

export type GameType = {
    plantCapacity: number,
    supplies: StoreSupply[],
    upgrades: StoreUpgrade[],
    usedPlantCapacity: number,
}

export type Profile = {
    _id: string,
    garden: plantMapType,
    inventory: plantMapType,
    plants: PlantType[],
    purchases: PurchaseType[],
    shop: plantMapType,
    userProfile: {
        balance: number,
        createdAt: string,
        game: GameType,
        lastActive: string,
        lastAtShop: string,
        onboardingCompleted: boolean,
    },
}