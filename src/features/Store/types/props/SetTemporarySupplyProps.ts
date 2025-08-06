import type { StoreSupply } from "../models";
import type { PlantBuffTimerType } from "@/shared/types";

export interface SetTemporarySupplyProps {
    supply: StoreSupply
    applyBuffToAllPlants: (buff: PlantBuffTimerType) => void
    removeSupply: (effect: string) => void
}