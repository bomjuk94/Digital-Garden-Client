import type { StoreApi } from "zustand";
import type { plantMapType, PlantType } from "../models";

export interface AddToInventoryProps<T> {
    val: PlantType
    name: string
    inventory: plantMapType
    plantExists: (id: string, name: string) => boolean
    setInventoryCount: () => void
    // set: StoreApi<T>['setState']
    multiplier?: number | undefined
}
