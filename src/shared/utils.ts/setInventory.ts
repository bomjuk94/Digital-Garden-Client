import { useInventoryStore } from "../stores/useInventoryStore"
import { useRegisteredUserGameStore } from "../stores/useRegisteredUserGameStore"
import { useUserModeStore } from "../stores/useUserModeStore"
import type { PlantType, SetInventoryProps } from "../types"
import { apiFetch } from "./api"
import { plants } from "./constants"

export const setInventory = ({
    inventory,
    val,
    count,
}: SetInventoryProps) => {
    const updated = { ...inventory }
    const userMode = useUserModeStore.getState().userMode
    if (!val || typeof val.name !== "string") return
    // TODO: Modularize?
    if (val.name in updated) {
        let plantsToAdd: PlantType[] = []
        if (val.plants) {
            plantsToAdd = [...val.plants]
        }
        updated[val.name] = {
            ...updated[val.name],
            count: updated[val.name].count! + count,
            plants: [...(updated[val.name].plants ?? []), ...plantsToAdd],
        }
    } else {
        // TODO: Modularize?

        const newCount = Math.max(1, count)

        const plant = plants[val.name]
        updated[val.name] = {
            name: val.name,
            label: val.label,
            count: newCount,
            description: plant.description,
            category: plant.category,
            growTime: plant.growTime,
            phases: plant.phases,
            maxWateringSkips: plant.maxWateringSkips,
            rarity: plant.rarity,
            sellPrice: plant.sellPrice,
            plants: [...(val.plants) ?? []],
        }
    }

    const updatedInventoryCount = Object.values(updated).reduce((acc, plant) => {
        if (!plant || !plant.count) return 0
        return acc + plant.count
    }, 0)

    if (userMode === 'guest') {
        useInventoryStore.setState({ inventory: updated })
    } else if (userMode === 'registered') {
        useRegisteredUserGameStore.setState({
            registeredInventory: updated,
            registeredInventoryCount: updatedInventoryCount,
        })
        try {
            const token = localStorage.getItem('token')

            apiFetch("/api/inventory/update", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    updatedInventory: updated,
                })
            })
        } catch (error) {
            console.log(error)
        }
    }
}