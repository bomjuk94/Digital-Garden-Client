import { apiFetch } from "../utils.ts/api"

export const fetchPurchases = async (token: string) => {
    const res = await apiFetch('/api/purchases', {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": 'application/json'
        }
    })

    if (!res.ok) {
        const errorMsg = await res.text()
        throw new Error(`Could not fetch purchases ${errorMsg}`)
    }

    return res.json()
}