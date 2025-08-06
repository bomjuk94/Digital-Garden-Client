import { useUserModeStore } from "@/shared/stores/useUserModeStore";
import type { RandomCustomerProps } from "../types/props/RandomCustomerProps";
import { useCustomerStore } from "../stores/useCustomerStore";
import { useRegisteredUserGameStore } from "@/shared/stores/useRegisteredUserGameStore";

export const generateAndSetRandomCustomer = ({
    resetCustomer,
    shopList,
    customers,
    chooseRandomPlant,
}: RandomCustomerProps) => {
    const userMode = useUserModeStore.getState().userMode
    resetCustomer()

    if (!shopList || Object.keys(shopList).length === 0) return
    const randomCustomer = customers[Math.floor(Math.random() * customers.length)];
    const randomPlant = chooseRandomPlant(shopList)

    const updated = {
        ...randomCustomer,
        plantName: randomPlant.name,
        plantLabel: randomPlant.label,
        plant: randomPlant,
        purchasePrice: randomPlant.sellPrice,
    }

    if (userMode === 'guest') {
        useCustomerStore.setState({ customer: updated })
        return updated
    } else if (userMode === 'registered') {
        useRegisteredUserGameStore.setState({ registeredCustomer: updated })
        return updated
    }
}