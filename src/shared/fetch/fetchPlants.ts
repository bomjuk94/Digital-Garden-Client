import { apiFetch } from "../utils.ts/api"

export const fetchPlants = async (token: string) => {
    const res = await apiFetch('/api/plants', {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": 'application/json',
        }
    })

    if (!res.ok) {
        const errorMsg = await res.text()
        throw new Error(`Could not fetch plants ${errorMsg}`)
    }

    return res.json()
}