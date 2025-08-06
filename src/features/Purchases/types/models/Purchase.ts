import type { CustomerDetails } from "../CustomerDetails";
import type { PlantType } from "@/shared/types";
import type { PurchaseMethodType } from "../PurchaseMethodType";

export type PurchaseType = {
    customer: CustomerDetails,
    plant: PlantType,
    purchasePrice: number,
    timestamp: number,
    method: PurchaseMethodType
}