import { useSuppliseStore } from "@/features/Greenhouse/stores/useSuppliesStore"
import { useRegisteredUserGameStore } from "@/shared/stores/useRegisteredUserGameStore"
import { useUserModeStore } from "@/shared/stores/useUserModeStore"
import { apiFetch } from "@/shared/utils.ts/api"
import { useEffect } from "react"

export const useGetSupplies = () => {
    const userMode = useUserModeStore.getState().userMode
    // guest
    const supplies = useSuppliseStore(state => state.supplies)
    // registered
    const registeredSupplies = useRegisteredUserGameStore(state => state.registeredSupplies)
    const setRegisteredSupplies = useRegisteredUserGameStore(state => state.setRegisteredSupplies)


    useEffect(() => {
        const fetchRegisteredSupplies = async () => {
            try {
                if (userMode !== 'registered') return
                const token = localStorage.getItem('token')

                const response = await apiFetch("/api/supplies", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                })

                if (!response.ok) return
                const data = await response.json()

                const isDifferent = JSON.stringify(data.supplies) !== JSON.stringify(registeredSupplies)
                if (isDifferent) {
                    setRegisteredSupplies(data.supplies)
                }
            } catch (error) {
                console.log("fetch supplies error:", error)
            }
        }

        fetchRegisteredSupplies()
    }, [userMode, registeredSupplies, setRegisteredSupplies])

    if (userMode === 'guest') {
        return { supplies }
    }
    return { supplies: registeredSupplies }
}