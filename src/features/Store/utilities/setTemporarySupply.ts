import { v4 as uuidv4 } from 'uuid'
import { convertMinToMill } from "@/shared/utils.ts/convertMinToMill";
import type { SetTemporarySupplyProps } from '../types/props/SetTemporarySupplyProps';

export const setTemporarySupply = ({
    supply,
    applyBuffToAllPlants,
    removeSupply
}: SetTemporarySupplyProps) => {
    if (supply == null || supply.time == null) return;

    const expiration = Date.now() + convertMinToMill(supply.time);
    const buff = {
        id: uuidv4(),
        name: supply.effect,
        effect: supply,
        multiplier: supply.multiplier,
        expirationTime: expiration,
    }
    applyBuffToAllPlants(buff)
    removeSupply(supply.id)
}