import { apiFetch } from "@/shared/utils.ts/api"

export const fetchUpgrades = async (token: string) => {
    const res = await apiFetch('/api/upgrades', {
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