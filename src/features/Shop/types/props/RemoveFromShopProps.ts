import type { plantMapType } from "@/shared/types";

export interface RemoveFromShopProps {
    shop: plantMapType
    name: string
    plantExists: (id: string, name: string) => boolean
    id: string | undefined
}