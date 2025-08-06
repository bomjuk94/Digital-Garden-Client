import type { plantMapType } from "@/shared/types";

export interface RemoveFromGardenProps {
    garden: plantMapType
    name: string
    plantExists: (id: string, name: string) => boolean
    id: string
}