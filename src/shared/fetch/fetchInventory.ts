import { apiFetch } from "../utils.ts/api";

export const fetchInventory = async (token: string) => {
    const res = await apiFetch('/api/inventory', {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })

    if (!res.ok) {
        const errorMsg = await res.text()
        throw new Error(errorMsg || 'API error')
    }

    return res.json()

}