import { showToast } from "@/shared/utils.ts/showToast";
import type { RemoveFromGardenProps } from "../types/props/RemoveFromGardenProps";
import { useUserModeStore } from "@/shared/stores/useUserModeStore";
import { useGardenStore } from "../stores/useGardenStore";
import { useRegisteredUserGameStore } from "@/shared/stores/useRegisteredUserGameStore";
import { apiFetch } from "@/shared/utils.ts/api";

export const removeFromGarden = async ({
    garden,
    name,
    plantExists,
    id,
}: RemoveFromGardenProps) => {
    const updated = { ...garden }
    const userMode = useUserModeStore.getState().userMode

    if (name) {
        if (garden[name].count! > 0 && plantExists(id, name)) {
            const updatedPlants = garden[name].plants!.filter(
                (plant) => plant.id !== id
            )

            const updatedCount = garden[name].count! - 1

            if (updatedCount > 0) {
                updated[name] = {
                    ...garden[name],
                    count: updatedCount,
                    plants: updatedPlants,
                }
            } else {
                delete updated[name]
            }

            if (userMode === 'guest') {
                useGardenStore.setState({ garden: updated })
            } else if (userMode === 'registered') {
                useRegisteredUserGameStore.setState({
                    registeredGarden: updated
                })

                try {
                    const token = localStorage.getItem('token')

                    await apiFetch("/api/garden/update", {
                        method: 'PUT',
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": 'application/json',
                        },
                        body: JSON.stringify({
                            updatedGarden: updated,
                        })
                    })
                } catch (error) {
                    console.log(error)
                }
            }

        } else {
            showToast('error', 'No plant to remove')
        }
    } else {
        showToast('error', 'Plant does not exist in garden')
    }
}