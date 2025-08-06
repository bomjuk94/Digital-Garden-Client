import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Customer } from "../types"
import { customers } from "../constants"
import type { plantMapObjectType, plantMapType } from "@/shared/types"
import { useShopStore } from "./useShopStore"
import { generateAndSetRandomCustomer } from "../utilites/generateAndSetRandomCustomer"

export type CustomerStore = {
    customer: Customer | null
    customerHydrated: boolean
    chooseRandomCustomer: () => Customer | null
    chooseRandomPlant: (shopStockList: plantMapType) => plantMapObjectType
    chooseRandomDialogOption: (dialogOptions: string[]) => string
    oneLinerActive: boolean
    setOneLinerActive: (val: boolean) => void
    resetCustomer: () => void
    intervalId: NodeJS.Timeout | null
    setIntervalId: (id: NodeJS.Timeout) => void
    clearCustomerInterval: (id: NodeJS.Timeout) => void
}

let setFn: ((state: Partial<CustomerStore>) => void) | null = null

export const useCustomerStore = create<CustomerStore>()(
    persist(
        (set, get) => {
            setFn = set
            return {
                customer: null,
                customerHydrated: false,
                chooseRandomCustomer: (): Customer | null => {
                    const { chooseRandomPlant, resetCustomer } = get()
                    const shopList = useShopStore.getState().shop

                    const randomCustomer = generateAndSetRandomCustomer({
                        resetCustomer,
                        shopList,
                        customers,
                        chooseRandomPlant,
                    })

                    if (!randomCustomer) {
                        return null
                    }
                    return randomCustomer
                },
                chooseRandomPlant: (shopStockList) => {
                    const plants = Object.values(shopStockList);
                    const randomPlant = plants[Math.floor(Math.random() * plants.length)];
                    return randomPlant
                },
                chooseRandomDialogOption: (dialogOptions) => {
                    const randomDialog = dialogOptions[Math.floor(Math.random() * dialogOptions.length)];
                    return randomDialog
                },
                oneLinerActive: false,
                setOneLinerActive: (val) => set({ oneLinerActive: val }),
                intervalId: null,
                setIntervalId: (id) => set({ intervalId: id }),
                clearCustomerInterval: (id) => {
                    if (id) {
                        clearInterval(id)
                    }
                },
                resetCustomer: () => set({
                    customer: null,
                    intervalId: null,
                    oneLinerActive: false
                }),
            }
        },
        {
            name: "customer-storage",
            onRehydrateStorage: () => {
                return () => {
                    if (setFn) {
                        setFn({ customer: null, customerHydrated: true })
                    }
                }
            },
        }
    )
)