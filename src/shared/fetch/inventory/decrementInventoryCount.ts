import { apiFetch } from "@/shared/utils.ts/api"

export const decrementInventoryCount = async (registeredInventoryCount: number, multiplier?: number) => {
    try {
        const token = localStorage.getItem('token')

        const newCount = registeredInventoryCount - (multiplier ?? 1)

        await apiFetch("/api/inventory/count", {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                count: newCount
            })
        })
    } catch (error) {
        console.log(error)
    }
}