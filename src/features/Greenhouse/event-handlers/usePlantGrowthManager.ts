import { useEffect } from "react"
import { usePlantActions } from "@/shared/hooks/plants/usePlantActions"

export const usePlantGrowthManager = () => {
    const { updatePlantGrowth } = usePlantActions()

    useEffect(() => {

        const interval = setInterval(() => {
            updatePlantGrowth()
        }, 5000)

        return () => clearInterval(interval)
    }, [updatePlantGrowth])
}
