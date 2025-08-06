import { useState } from "react"
import type { GardenListProps } from "../types"
import { getSpriteStyle } from "@/shared/utils.ts/getSpriteStyle"
import { growthPhaseMap } from "@/shared/utils.ts/constants"
import { useHandlePlantGardenAction } from "../event-handlers/useHandlePlantGardenAction"
import { usePaginateGardenList } from "../utilities/usePaginateGardenList"
import { useGardenActions } from "@/shared/hooks/garden/useGardenActions"
import { useInventoryActions } from "@/shared/hooks/inventory/useInventoryActions"

const GardenList = ({ garden }: GardenListProps) => {

    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    const {
        setPlantDetails,
        setShowPlantDetails,
        removeFromGarden
    } = useGardenActions()
    const {
        inventoryCount,
        maxInventorySpace,
    } = useInventoryActions()

    const { handlePlantGardenAction } = useHandlePlantGardenAction()

    const { paginatedPlants, totalPages, currentPage, setCurrentPage } = usePaginateGardenList(garden)

    const handlePlantClick = (i: number) => {
        setActiveIndex(i)
    }

    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-20">

            <ul className="flex gap-16">
                {
                    paginatedPlants.map((plant, i) => (
                        <li
                            className="flex flex-col items-center gap-1.5 relative"
                            key={i}
                        >

                            <button
                                onClick={() => handlePlantClick(i)}
                                className="
                                w-[53px] h-[94px] border 
                                border-red-500
                                cursor-pointer
                                "
                                style={getSpriteStyle(growthPhaseMap['bloom'], plant)}
                            >
                            </button>

                            <p
                                className="
                            bg-[var(--bg-primary)] 
                            absolute -bottom-6.5 left-1/2
                            transform -translate-x-fifty-percent
                            w-max
                            py-1 px-2 rounded-md text-xs mt-1"
                            >
                                {plant.label}
                            </p>

                            <p
                                className="absolute -top-2 -right-1.5 bg-[var(--accent-yellow)] py-1 px-1.5 rounded-full text-ten"
                            >
                                x{plant.count}
                            </p>

                            {
                                activeIndex === i &&
                                <div
                                    className="
                                    absolute -top-25 left-0 right-0"
                                >
                                    <div className="flex flex-col gap-2">

                                        <button
                                            onClick={() => handlePlantGardenAction({
                                                plant,
                                                action: 'harvest',
                                                removeFromGarden,
                                                setPlantDetails,
                                                setShowPlantDetails,
                                                setActiveIndex,
                                                inventoryCount,
                                                maxInventorySpace,
                                            })}

                                            className="
                                    bg-[var(--accent-mint)]
                                    py-1 px-1.5
                                    rounded-md
                                    text-xs
                                    cursor-pointer
                                "
                                        >
                                            Harvest
                                        </button>
                                        <button
                                            onClick={() => handlePlantGardenAction({
                                                plant,
                                                action: 'details',
                                                removeFromGarden,
                                                setPlantDetails,
                                                setShowPlantDetails,
                                                setActiveIndex,
                                                inventoryCount,
                                                maxInventorySpace,
                                            })}

                                            className="
                                    bg-[var(--accent-mint)]
                                    py-1 px-1.5
                                    rounded-md
                                    text-xs
                                    cursor-pointer
                                "
                                        >
                                            Details
                                        </button>
                                        <button
                                            onClick={() => handlePlantGardenAction({
                                                plant,
                                                action: 'discard',
                                                removeFromGarden,
                                                setPlantDetails,
                                                setShowPlantDetails,
                                                setActiveIndex,
                                                inventoryCount,
                                                maxInventorySpace,
                                            })}

                                            className="
                                    bg-[var(--accent-purple)]
                                    py-1 px-1.5
                                    rounded-md
                                    text-xs
                                    cursor-pointer
                                "
                                        >
                                            Discard
                                        </button>
                                    </div>
                                </div>
                            }
                        </li>
                    ))
                }
            </ul>
            {
                Object.values(garden).length > 0 &&
                <div className="flex justify-between gap-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-23">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                        disabled={currentPage === 0}
                        className={`px-2 py-1 rounded-md bg-gray-300 disabled:opacity-50 ${currentPage === 0 ? '' : 'cursor-pointer'} text-sm min-w-max`}
                    >
                        ← Prev
                    </button>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
                        disabled={currentPage === totalPages - 1}
                        className={`px-2 py-1 rounded-md bg-gray-300 disabled:opacity-50 ${currentPage === totalPages - 1 ? '' : 'cursor-pointer'} text-sm min-w-max`}
                    >
                        Next →
                    </button>
                </div>
            }
        </div >
    )
}

export default GardenList