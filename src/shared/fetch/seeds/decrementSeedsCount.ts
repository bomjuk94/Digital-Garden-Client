import { useRegisteredUserGameStore } from "@/shared/stores/useRegisteredUserGameStore"
import { apiFetch } from "@/shared/utils.ts/api"

export const decrementSeedsCount = async (token: string, name: string) => {

    const decrementRegisteredSeedsCount = useRegisteredUserGameStore.getState().decrementRegisteredSeedsCount

    try {
        const res = await apiFetch("/api/seeds/decrement", {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({
                name,
            })
        })

        if (res.ok) {
            decrementRegisteredSeedsCount(name)
        }
    } catch (error) {
        console.log(error)
    }
}