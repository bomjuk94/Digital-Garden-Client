import { showToast } from "./showToast"
import type { AddToInventoryProps } from "../types"
import { plants } from "./constants"
import { v4 as uuidv4 } from 'uuid'
import { apiFetch } from "./api"
import { useInventoryStore } from "@/shared/stores/useInventoryStore"
import { useRegisteredUserGameStore } from "../stores/useRegisteredUserGameStore"
import { useUserModeStore } from "../stores/useUserModeStore"

export const addToInventory = async <T>(
    {
        val,
        name,
        plantExists,
        setInventoryCount,
        multiplier,
    }: AddToInventoryProps<T>
): Promise<void> => {
    const userMode = useUserModeStore.getState().userMode

    const currentInventory =
        userMode === "guest"
            ? useInventoryStore.getState().inventory
            : useRegisteredUserGameStore.getState().registeredInventory

    const updated = Object.fromEntries(
        Object.entries(currentInventory).map(([key, item]) => [
            key,
            {
                ...item,
                plants: [...(item.plants ?? [])],
            },
        ])
    )

    const plantList = [val]
    if (multiplier && multiplier > 0) {
        for (let index = 0; index < multiplier; index++) {
            const plantO = {
                ...val,
                id: uuidv4(),
            }
            plantList.push(plantO)
        }
    }

    if (name in updated) {
        if (!plantExists(val.id, val.name)) {
            updated[name] = {
                ...updated[name],
                count: updated[name].count! + (multiplier ?? 1),
                plants: [...updated[name].plants!, ...plantList],
            }
        } else {
            showToast("error", "Plant already exists")
            return
        }
    } else {
        const plant = plants[name]
        if (!plant) {
            showToast("error", "Invalid plant type")
            return
        }

        updated[name] = {
            name,
            label: val.label,
            count: (updated[name]?.count ?? 0) + (multiplier ?? 1),
            description: plant.description,
            category: plant.category,
            growTime: plant.growTime,
            phases: plant.phases,
            maxWateringSkips: plant.maxWateringSkips,
            rarity: plant.rarity,
            sellPrice: plant.sellPrice,
            plants: [...(updated[name]?.plants ?? []), ...plantList],
        }
    }

    if (userMode === "guest") {
        useInventoryStore.setState({ inventory: updated })
        setInventoryCount()
    } else if (userMode === 'registered') {
        useRegisteredUserGameStore.setState({
            registeredInventory: updated
        })
        setInventoryCount()

        try {
            const token = localStorage.getItem("token")
            if (!token) {
                showToast("error", "You must be logged in to update inventory")
                return
            }

            await apiFetch("/api/inventory/update", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ updatedInventory: updated }),
            })

            showToast("success", "Inventory updated successfully")
        } catch (error) {
            console.error("Inventory update error:", error)
            showToast("error", "Could not update inventory")
        }
    }
}
