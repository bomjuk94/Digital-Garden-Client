import type { PlantType } from "@/shared/types"

export interface CheckActiveIndexProps {
    activeIndex: number | undefined
    plants: PlantType[]
    setActiveIndex: React.Dispatch<React.SetStateAction<number | undefined>>
}