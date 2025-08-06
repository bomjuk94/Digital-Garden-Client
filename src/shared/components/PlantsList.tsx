import { useState } from "react"
import type { PlantsListProps } from "../types/props/PlantsListProps"
import { getSpriteStyle } from "../utils.ts/getSpriteStyle"
import { growthPhaseMap } from "../utils.ts/constants"
import { useToolsStore } from "../stores/useToolsStore"
import waterDrop from '@assets/overlay/water-drop.webp'
import skull from '@assets/overlay/skull.webp'
import { getTimeRemaining } from "../utils.ts/getTimeRemaining"
import { useHandlePlantClick } from "../hooks/useHandlePlantClick"
import { useModalStore } from "../stores/useModalStore"
import { useActiveBuffsCount } from "@/features/Greenhouse/event-handlers/useActiveBuffsCount"
import { useCheckActiveIndex } from "@/features/Greenhouse/event-handlers/useCheckActiveIndex"
import { useHandleShowActiveBuffs } from "@/features/Greenhouse/event-handlers/useHandleShowActiveBuffs"
import { usePaginatePlantsList } from "@/features/Greenhouse/event-handlers/usePaginatePlantsList"
import { useInventoryActions } from "../hooks/inventory/useInventoryActions"
import { usePlantActions } from "../hooks/plants/usePlantActions"
import { useProfileActions } from "../hooks/profile/useProfileActions"
import { useGetUserProfile } from "../hooks/useGetUserProfile"

const PlantsList = ({ plants }: PlantsListProps) => {

    const {
        inventoryCount,
        maxInventorySpace,
        addToInventory,
        plantExists,
        incrementInventoryCount,
        pruneInactiveBuffs,
    } = useInventoryActions()

    const {
        setIsWatered,
        setHasBeenWateredThisCycle,
        removePlant,
        setPlantBoost,
        setPlantBuffs,
    } = usePlantActions()

    const { setPlantCapacity } = useProfileActions()
    const { profile, effectiveCapacity } = useGetUserProfile()
    const usedPlantCapacity = profile?.game.usedPlantCapacity
    const { cursorToToolActive, activeTool, resetCursor } = useToolsStore()
    const [activeIndex, setActiveIndex] = useState<number | undefined>()
    const { handlePlantClick } = useHandlePlantClick()
    const { toggleModal } = useModalStore()
    const buffCounts = useActiveBuffsCount(plants)
    const { handleShowActiveBuffs } = useHandleShowActiveBuffs()
    const { totalPages, currentPlants, setCurrentPage, currentPage } = usePaginatePlantsList(plants)

    useCheckActiveIndex({
        activeIndex,
        plants,
        setActiveIndex,
    })

    return (
        <div className="relative w-full h-full">
            <div
                data-tutorial-id="greenhouse-plants"
                className="absolute top-fifty-five-percent left-1/2 w-fit transform -translate-x-fifty-percent">
                <ul className="flex items-center gap-12">
                    {currentPlants.map((plant, i) => {
                        return (
                            <li key={plant.id} className="text-center relative plant interactable">
                                <button
                                    onClick={() =>
                                        handlePlantClick({
                                            plant,
                                            i,
                                            cursorToToolActive,
                                            activeTool,
                                            resetCursor,
                                            setIsWatered,
                                            setHasBeenWateredThisCycle,
                                            plantExists,
                                            addToInventory,
                                            removePlant,
                                            setPlantCapacity,
                                            setActiveIndex,
                                            inventoryCount,
                                            maxInventorySpace,
                                            incrementInventoryCount,
                                            setPlantBoost,
                                            pruneInactiveBuffs,
                                        })
                                    }
                                    data-tutorial-id="greenhouse-plant-details"
                                    className="
            w-[48px] h-[94px]
            cursor-pointer
          "
                                    style={getSpriteStyle(growthPhaseMap[plant.growthPhase], plant)}
                                />
                                <p
                                    className="
            bg-[var(--bg-primary)] 
            absolute -bottom-6.5 left-1/2
            transform -translate-x-fifty-percent
            w-max
            py-1 px-2 rounded-md text-xs mt-1
          "
                                >
                                    {plant.label}
                                </p>

                                {plant.isHarvestable && (
                                    <span
                                        data-tutorial-id="greenhouse-harvest-plant-notification"
                                        className="
              absolute -top-8 left-0 right-0
              bg-[var(--accent-mint)]
              py-1 px-1.5
              rounded-md
              text-xs
              animate-bounce duration-1000
              ease-in-out
            "
                                    >
                                        Harvest
                                    </span>
                                )}

                                {!plant.hasBeenWateredThisCycle &&
                                    !plant.isHarvestable &&
                                    !plant.isDead &&
                                    activeIndex !== i && (
                                        <img
                                            src={waterDrop}
                                            alt="Water Drop"
                                            data-tutorial-id="greenhouse-water-plant"
                                            className="
                absolute -top-8 left-0 right-0
                animate-bounce duration-1000
                ease-in-out
              "
                                        />
                                    )}

                                {plant.isDead && (
                                    <img
                                        src={skull}
                                        alt="Skull"
                                        className="
              absolute -top-8 left-0 right-0
              animate-bounce duration-1000
              ease-in-out
            "
                                    />
                                )}

                                {activeIndex === i && !plant.isDead && !plant.isHarvestable && (
                                    <p className="absolute -top-8 left-0 right-0 animate-bounce duration-1000 ease-in-out text-xs">
                                        {getTimeRemaining(plant.nextPhaseAt).label}
                                    </p>
                                )}

                                {/* Active supply buffs */}
                                {buffCounts[i] > 0 && (
                                    <button
                                        onClick={() => handleShowActiveBuffs({
                                            buffs: plant.buffs,
                                            setPlantBuffs,
                                            toggleModal,
                                        })}
                                        className="bg-[var(--accent-purple)] py-1 px-1.5 rounded-full absolute -top-16 right-0 left-0 text-xs cursor-pointer w-full"
                                    >
                                        {buffCounts[i]} {buffCounts[i] > 1 ? "buffs" : "buff"}
                                    </button>
                                )}
                            </li>
                        )
                    })}
                </ul>
            </div>

            <p
                className="absolute top-[76%] right-63 bg-[var(--bg-primary)] border border-[var(--border)] text-xs px-2 py-0.5 rounded-full shadow-md text-[var(--primary))]"
            >
                {usedPlantCapacity}/{effectiveCapacity} slots used
            </p>

            {
                plants.length > 3 &&
                <>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                        disabled={currentPage === 0}
                        className={`absolute top-[63%] left-60 w-max transform -translate-y-1/2 border text-xs disabled:opacity-50 px-2 py-1 rounded-md bg-gray-300 border-none ${currentPage === 0 ? '' : 'cursor-pointer'}`}
                    >
                        ← Prev
                    </button>

                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
                        disabled={currentPage === totalPages - 1}
                        className={`absolute top-[63%] right-60 w-max transform -translate-y-1/2 px-2 py-1 rounded-md border text-xs disabled:opacity-50 bg-gray-300 border-none ${currentPage === totalPages - 1 ? '' : 'cursor-pointer'}`}
                    >
                        Next →
                    </button>
                </>
            }
        </div>
    )
}

export default PlantsList
