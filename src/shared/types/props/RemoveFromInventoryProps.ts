import type { StoreApi } from "zustand";
import type { plantMapType } from "../models";

export interface RemoveFromInventoryProps<T> {
    inventory: plantMapType
    name: string
    plantExists: (id: string, name: string) => boolean
    id: string
    setInventoryCount: () => void
    // set: StoreApi<T>['setState']
}