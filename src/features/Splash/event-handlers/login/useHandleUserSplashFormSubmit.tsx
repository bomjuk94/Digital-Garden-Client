import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useShowErrors } from "@/shared/hooks/useShowErrors"
import { validateUserFormInputs } from "@/shared/utils.ts/validateUserFormInputs"
import type { FormModeTypes } from "../../types/types"
import { useSubmitFormData } from "../register/useSubmitFormData"
import { useRegisteredUserGameStore } from "@/shared/stores/useRegisteredUserGameStore"
import { apiFetch } from "@/shared/utils.ts/api"
import { stripMongoId } from "@/shared/utils.ts/stripMongoId"

export const useHandleUserSplashFormSubmit = () => {
    const navigate = useNavigate()
    const usernameRef = useRef<HTMLInputElement>(null)
    const userPassword = useRef<HTMLInputElement>(null)
    const formRef = useRef<HTMLFormElement>(null)
    const [errors, setErrors] = useState<string[]>([])
    const updatePayload: Record<string, string> = {}
    const { handleFormSubmit } = useSubmitFormData()

    useShowErrors(errors)

    const handleUserFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const form = formRef.current
        if (!form) return

        const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null
        const mode = (submitter?.value as FormModeTypes) || "login"

        const newErrors: string[] = []
        const newUsername = usernameRef.current?.value.trim()
        const newPassword = userPassword.current?.value.trim()

        validateUserFormInputs({
            newUsername,
            newPassword,
            newErrors,
            setErrors,
            updatePayload,
        })

        if (newErrors.length === 0 && Object.keys(updatePayload).length > 0) {
            const data = {
                username: newUsername!,
                password: newPassword!,
                mode,
            }

            const response = await handleFormSubmit(data)
            form.reset()

            if (response === 200) {

                localStorage.removeItem('registered-user-game-storage')

                useRegisteredUserGameStore.persist.clearStorage()

                useRegisteredUserGameStore.setState({
                    registeredInventory: {},
                    registeredInventoryCount: 0,
                    registeredGarden: {},
                    registeredSeeds: [],
                    registeredSupplies: [],
                    registeredUpgrades: [],
                    registeredPlants: [],
                    registeredProfile: null,
                    registeredPurchases: [],
                    registeredShop: {},
                })

                try {
                    const token = localStorage.getItem("token")
                    if (!token) throw new Error("No token found")

                    const fetches = [
                        // profile
                        // plants
                        // seeds
                        // supplies
                        // upgrades
                        // inventory/inventoryCount
                        // garden
                        // purchases
                        // shop

                        { key: "profile", store: useRegisteredUserGameStore.getState().setRegisteredProfile, promise: apiFetch('/api/profile').then(r => r.json()), transform: (data) => stripMongoId(data), },
                        { key: "plants", store: useRegisteredUserGameStore.getState().setRegisteredPlants, promise: apiFetch('/api/plants').then(r => r.json()), transform: (data) => stripMongoId(data, 'plants'), },
                        { key: "seeds", store: useRegisteredUserGameStore.getState().setRegisteredSeeds, promise: apiFetch('/api/seeds').then(r => r.json()), transform: (data) => stripMongoId(data, 'seeds'), },
                        { key: "supplies", store: useRegisteredUserGameStore.getState().setRegisteredSupplies, promise: apiFetch('/api/supplies').then(r => r.json()), transform: (data) => stripMongoId(data, 'supplies'), },
                        { key: "upgrades", store: useRegisteredUserGameStore.getState().setRegisteredUpgrades, promise: apiFetch('/api/upgrades').then(r => r.json()), transform: (data) => stripMongoId(data, 'upgrades'), },
                        {
                            key: "inventory",
                            store: (val) => {
                                const clean = stripMongoId(val, 'inventory');
                                useRegisteredUserGameStore.setState({
                                    registeredInventory: clean,
                                    registeredInventoryCount: val.inventoryCount ?? 0,
                                });
                            },
                            promise: apiFetch('/api/inventory').then(r => r.json()),
                            transform: (data) => data,
                        },
                        { key: "garden", store: useRegisteredUserGameStore.getState().setRegisteredGarden, promise: apiFetch('/api/garden').then(r => r.json()), transform: (data) => stripMongoId(data, 'garden') },
                        { key: "purchases", store: useRegisteredUserGameStore.getState().setRegisteredPurchases, promise: apiFetch('/api/purchases').then(r => r.json()), transform: (data) => stripMongoId(data, 'purchases'), },
                        { key: "shop", store: useRegisteredUserGameStore.getState().setRegisteredShop, promise: apiFetch('/api/shop').then(r => r.json()), transform: (data) => stripMongoId(data, 'shop'), },
                    ];

                    const results = await Promise.allSettled(fetches.map(f => f.promise));

                    results.forEach((result, index) => {
                        const { key, store, transform } = fetches[index];
                        if (result.status === "fulfilled") {
                            store(transform(result.value));
                        } else {
                            console.error(`❌ ${key} fetch failed`, result.reason);
                        }
                    });

                    navigate("/green-house")
                } catch (error) {
                    console.error("Error hydrating inventory after login:", error)
                    navigate("/green-house")
                }
            }
        }
    }

    return {
        handleUserFormSubmit,
        usernameRef,
        userPassword,
        formRef,
    }
}
