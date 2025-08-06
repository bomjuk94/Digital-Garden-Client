import type { plantMapObjectType, plantMapType } from "../models"

export interface SetInventoryProps {
    inventory: plantMapType
    val: plantMapObjectType
    count: number
    setInventoryCount: () => void
}