import { apiFetch } from "../utils.ts/api"
import { showToast } from "../utils.ts/showToast"

export const fetchSeeds = async (token: string) => {
    try {
        const res = await apiFetch('/api/seeds', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })

        const seeds = await res.json()

        if (res.ok) return seeds.seeds
    } catch (error: any) {
        console.log('error', error)
        showToast('error', (error.message || 'Undefined error'))
    }
}