import { showToast } from "@/shared/utils.ts/showToast"
import type { RemoveFromShopProps } from "../types"
import { useUserModeStore } from "@/shared/stores/useUserModeStore"
import { useShopStore } from "../stores/useShopStore"
import { useRegisteredUserGameStore } from "@/shared/stores/useRegisteredUserGameStore"
import { apiFetch } from "@/shared/utils.ts/api"

export const removeFromShop = async ({
    shop,
    name,
    plantExists,
    id,
}: RemoveFromShopProps) => {
    const updated = { ...shop }
    const userMode = useUserModeStore.getState().userMode
    if (name) {
        if (!id) return

        if (shop[name].count! > 0 && plantExists(id, name)) {
            const updatedPlants = shop[name].plants!.filter(
                (plant) => plant.id !== id
            )

            const updatedCount = shop[name].count! - 1

            if (updatedCount > 0) {
                updated[name] = {
                    ...shop[name],
                    count: updatedCount,
                    plants: updatedPlants,
                }
            } else {
                delete updated[name]
            }

            if (userMode === 'guest') {
                useShopStore.setState({ shop: updated })
                return true
            } else if (userMode === 'registered') {
                useRegisteredUserGameStore.setState({ registeredShop: updated })

                try {
                    const token = localStorage.getItem('token')

                    await apiFetch("/api/shop/update", {
                        method: "PUT",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            updatedShop: updated,
                        })
                    })
                } catch (error) {
                    console.log(error)
                }
                return true
            }
        } else {
            showToast('error', 'No plant to remove')
            return false
        }
    } else {
        showToast('error', 'Plant does not exist in shop')
        return false
    }
}