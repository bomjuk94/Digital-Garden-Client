import type { PurchaseType } from "@/features/Purchases/types";
import type { CustomerPurchaseAction } from "../CustomerPurchaseActionType";
import type { Customer } from "../models";
import type { ShopRemovalActions } from "../ShopRemovalTypes";
import type { PlantType, userBalanceActionType } from "@/shared/types";

export interface HandleCustomerPurchaseProps {
    action: CustomerPurchaseAction
    customer: Customer
    removeFromShop: (plant: PlantType, name: string, action: ShopRemovalActions) => Promise<boolean>
    setBalance: (val: number, action: userBalanceActionType) => void
    resetCustomer: () => void
    addPurchase?: (val: PurchaseType) => void
    setDialog: React.Dispatch<React.SetStateAction<string>>
}