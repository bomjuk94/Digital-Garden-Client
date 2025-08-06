import { useInventoryStore } from "../stores/useInventoryStore";
import { useRegisteredUserGameStore } from "../stores/useRegisteredUserGameStore";
import { useUserModeStore } from "../stores/useUserModeStore";
import type { RemoveFromInventoryProps } from "../types";
import { apiFetch } from "./api";

export const removeFromInventory = async <T>({
    inventory,
    name,
    plantExists,
    id,
}: RemoveFromInventoryProps<T>) => {
    if (!name) return;

    const updated = Object.fromEntries(
        Object.entries(inventory).map(([key, value]) => [
            key,
            { ...value, plants: [...(value.plants || [])] },
        ])
    );

    const entry = updated[name];
    const currentCount = entry?.plants?.length ?? 0;

    if (currentCount > 0 && plantExists(id, name)) {

        const updatedPlants = entry.plants.filter((plant) => plant.id !== id);

        const updatedCount = updatedPlants.length;

        if (updatedCount > 0) {
            updated[name] = {
                ...entry,
                count: updatedCount,
                plants: updatedPlants,
            };
        } else {
            delete updated[name];
        }

        const newInventoryCount = Object.values(updated).reduce(
            (acc, plant) => acc + Math.max(plant.plants.length, 0),
            0
        );

        const userMode = useUserModeStore.getState().userMode;

        if (userMode === "guest") {
            useInventoryStore.setState({
                inventory: updated,
                inventoryCount: newInventoryCount,
            });
        } else if (userMode === "registered") {

            useRegisteredUserGameStore.setState({
                registeredInventory: updated,
                registeredInventoryCount: newInventoryCount,
            });

            try {
                const token = localStorage.getItem("token");

                await apiFetch("/api/inventory/update", {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        updatedInventory: updated,
                    }),
                });
            } catch (error) {
                console.error("Error syncing inventory:", error);
            }
        }
    } else {
        console.warn(
            `Tried to remove plant '${name}' with id '${id}' but none found`
        );
    }
};
