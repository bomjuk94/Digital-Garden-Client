import type { plantMapObjectType } from "@/shared/types"

export type dialogueType = Record<string, string[]>

export type Customer = {
    id: string
    name: string
    image: string
    plantName: string | undefined
    plantLabel: string | undefined
    plant: plantMapObjectType | undefined
    purchasePrice: number | undefined
    timer: number
    hasResponded: boolean
    dialogue: dialogueType
}
