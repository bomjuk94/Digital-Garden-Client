import { useEffect } from "react"
import { getTimeRemaining } from "@/shared/utils.ts/getTimeRemaining"
import type { CheckActiveIndexProps } from "../types/props/CheckActiveIndexProps"

export const useCheckActiveIndex = ({
    activeIndex,
    plants,
    setActiveIndex,
}: CheckActiveIndexProps) => {
    useEffect(() => {
        if (activeIndex === undefined) return

        const interval = setInterval(() => {
            const plant = plants[activeIndex]
            if (!plant) return

            const { diff } = getTimeRemaining(plant.nextPhaseAt)
            if (diff <= 0) {
                setActiveIndex(undefined)
                clearInterval(interval)
            }
        }, 1000)

        return () => clearInterval(interval)
    }, [activeIndex, plants])
}