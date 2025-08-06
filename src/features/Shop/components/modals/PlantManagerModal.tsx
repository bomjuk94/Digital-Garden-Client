import { useMemo } from "react"
import { useLocation } from "react-router-dom"
import type { PlantManagerModalProps } from "../../types"
import { getSpriteStyle } from "@/shared/utils.ts/getSpriteStyle"
import { growthPhaseMap } from "@/shared/utils.ts/constants"
import { capitalizeName } from "@/shared/utils.ts/capitalizeName"
import { usePaginatedPlantManagerList } from "../../utilites/usePaginatedPlantManagerList"
import { convertUnix } from "@/shared/utils.ts/convertUnixToHumanReadable"
import { useModalStore } from "@/shared/stores/useModalStore"
import { useHandleStockItem } from "../../event-handlers/useHandleStockItem"
import { useShopActions } from "@/shared/hooks/shop/useShopActions"
import { useGetShop } from "@/shared/hooks/shop/useGetShop"

const PlantManagerModal = ({
    plant,
    onPlantManagerDetailsClose,
}: PlantManagerModalProps) => {

    const location = useLocation()
    const isShopPage = location.pathname
    const {
        setPlantMangerDetails,
        setShowPlantManagerDetails,
        removeFromShop,
    } = useShopActions()

    const { shop } = useGetShop()
    const { handleStockItem } = useHandleStockItem()
    const { toggleModal } = useModalStore()

    const freshPlants = useMemo(() => {
        return plant?.name ? shop[plant.name]?.plants ?? [] : []
    }, [plant?.name, shop])

    const { paginatedPlants, totalPages, currentPage, setCurrentPage } =
        usePaginatedPlantManagerList(freshPlants)

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <div className="bg-[var(--bg-primary)] border border-[var(--border)] rounded-2xl shadow-lg p-6 space-y-4 max-w-sm w-[90%] text-center relative">
                <div className="flex flex-col items-center text-[var(--text-primary)] space-y-3 text-sm leading-relaxed">

                    {
                        plant &&
                        <div
                            className="
                        w-[53px] h-[94px] border 
                        border-red-500
                        cursor-pointer
                        "
                            style={getSpriteStyle(growthPhaseMap['bloom'], plant)}
                        >

                        </div>
                    }
                    <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
                        {plant?.label}
                    </h2>

                    <ul className="relative">
                        {
                            paginatedPlants.map((plant) => (
                                <li className="flex flex-col gap-2" key={plant.name}>
                                    <ul>
                                        <li>
                                            <p>
                                                <strong>Missed Waterings: </strong> {plant?.missedWaterings}
                                            </p>
                                        </li>

                                        <li>
                                            <p>
                                                <strong>Date/Time Planted: </strong> {convertUnix(plant?.timePlanted)}
                                            </p>
                                        </li>
                                        <li className="flex gap-1">
                                            <p>
                                                <strong>Buffs:</strong>
                                            </p>
                                            {
                                                plant?.buffs.length > 0 ?
                                                    <ul className="flex gap-1">
                                                        {plant?.buffs.map((buff, i) => (
                                                            <li key={i}>
                                                                {capitalizeName(buff.effect.label)}
                                                                {i < plant.buffs.length - 1 && ','}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    :
                                                    'No buffs'
                                            }
                                        </li>
                                    </ul>

                                    {
                                        isShopPage &&

                                        <div className="flex gap-1.5 self-start">
                                            <button
                                                onClick={() => handleStockItem({
                                                    plant,
                                                    action: 'unstock',
                                                    removeFromShop,
                                                    toggleModal,
                                                    setPlantMangerDetails,
                                                    setShowPlantManagerDetails,
                                                    shop,
                                                })}
                                                className="
                                                bg-[var(--accent-purple)]
                                                py-1 px-1.5
                                                rounded-md
                                                text-xs
                                                cursor-pointer
                                            "
                                            >
                                                Unstock
                                            </button>

                                            <button
                                                onClick={() => handleStockItem({
                                                    plant,
                                                    action: 'discard',
                                                    removeFromShop,
                                                    toggleModal,
                                                    setPlantMangerDetails,
                                                    setShowPlantManagerDetails,
                                                    shop,
                                                })}
                                                className="
                                                bg-[var(--accent-mint)]
                                                py-1 px-1.5
                                                rounded-md
                                                text-xs
                                                cursor-pointer
                                            "
                                            >
                                                Discard
                                            </button>
                                        </div>
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </div>

                <div className="absolute top-2 left-2.5">
                    <p className="text-sm">
                        {currentPage + 1}/{totalPages}
                    </p>
                </div>

                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                    disabled={currentPage === 0}
                    className={`absolute top-1/2 left-1 px-2 py-1 rounded-md bg-gray-300 disabled:opacity-50 ${currentPage === 0 ? '' : 'cursor-pointer'} text-xs min-w-max`}
                >
                    ← Prev
                </button>

                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
                    disabled={currentPage === totalPages - 1}
                    className={`absolute top-1/2 right-1 px-2 py-1 rounded-md bg-gray-300 disabled:opacity-50 ${currentPage === totalPages - 1 ? '' : 'cursor-pointer'} text-xs min-w-max`}
                >
                    Next →
                </button>

                <button
                    onClick={onPlantManagerDetailsClose}
                    className="absolute top-2 right-2.5 text-2xl cursor-pointer"
                >
                    X
                </button>
            </div>
        </div>
    )
}

export default PlantManagerModal