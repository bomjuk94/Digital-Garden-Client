import type { plantMapType, plantMapObjectType } from "@/shared/types"
import type { Customer } from "../models"

export interface RandomCustomerProps {
    resetCustomer: () => void
    shopList: plantMapType
    customers: Customer[]
    chooseRandomPlant: (shopStockList: plantMapType) => plantMapObjectType
}