import { useLocation } from "react-router-dom"
import type { PlantDetailsModalProps } from "../../types/props/PlantDetailsModalProps"
import { capitalizeName } from "../../utils.ts/capitalizeName"
import { getSpriteStyle } from "../../utils.ts/getSpriteStyle"
import { growthPhaseMap } from "../../utils.ts/constants"
import { useModalStore } from "../../stores/useModalStore"
import { useManageStock } from "@/shared/hooks/useManageStock"
import { useInventoryActions } from "@/shared/hooks/inventory/useInventoryActions"
import { useShopActions } from "@/shared/hooks/shop/useShopActions"

const PlantDetailsModal = ({ plant, onPlantDetailsClose }: PlantDetailsModalProps) => {

    const location = useLocation()
    const isShopPage = location.pathname === '/shop'

    const { inventoryCount, maxInventorySpace } =
        useInventoryActions()

    const {
        setPlantDetails,
        setShowPlantDetails,
        setPlantMangerDetails,
        setShowPlantManagerDetails,
        deletePlant,
        unstockPlant,
    } = useShopActions()

    const { handleManageStock } = useManageStock()

    const { toggleModal } = useModalStore()

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <div className="bg-[var(--bg-primary)] border border-[var(--border)] rounded-2xl shadow-lg p-6 space-y-4 max-w-sm w-[90%] text-center relative">
                <div className="flex flex-col items-center text-[var(--text-primary)] space-y-3 text-sm leading-relaxed">

                    <div
                        className="
                        w-[53px] h-[94px] cursor-pointer
                        "
                        style={getSpriteStyle(growthPhaseMap['bloom'], plant!)}
                    >

                    </div>
                    <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
                        {plant?.label}
                    </h2>

                    <ul className="flex flex-col items-start gap-1.5 text-left w-full">
                        <li>
                            <p>
                                <strong>Description: </strong> {plant?.description}
                            </p>
                        </li>
                        <li className="flex gap-1">
                            <p>
                                <strong>Categories:</strong>
                            </p>
                            <ul className="flex gap-1">
                                {plant?.category.map((category, i) => (
                                    <li key={i}>
                                        {capitalizeName(category)}
                                        {i < plant.category.length - 1 && ','}
                                    </li>
                                ))}
                            </ul>
                        </li>
                        <li>
                            <p>
                                <strong>Grow Time: </strong> {plant?.growTime} hours
                            </p>
                        </li>
                        <li>
                            <p>
                                <strong>Phases: </strong> {plant?.phases}
                            </p>
                        </li>
                        <li>
                            <p>
                                <strong>Max Watering Skips: </strong> {plant?.maxWateringSkips}
                            </p>
                        </li>
                        <li>
                            <p>
                                <strong>Rarity: </strong> {capitalizeName(plant?.rarity)}
                            </p>
                        </li>
                        <li>
                            <p>
                                <strong>In stock: </strong> {plant?.count}
                            </p>
                        </li>
                        <li>
                            <p>
                                <strong>Sell Price: </strong> ${plant?.sellPrice}
                            </p>
                        </li>
                    </ul>

                    {
                        isShopPage &&

                        <div className="flex gap-1.5 self-start">
                            <button
                                onClick={() => handleManageStock({
                                    action: 'unstockAll',
                                    plant,
                                    maxInventorySpace,
                                    inventoryCount,
                                    unstockPlant,
                                    deletePlant,
                                    setPlantDetails,
                                    setShowPlantDetails,
                                    toggleModal,
                                    setPlantMangerDetails,
                                    setShowPlantManagerDetails
                                })}
                                className="
                                    bg-[var(--accent-purple)]
                                    py-1 px-1.5
                                    rounded-md
                                    text-xs
                                    cursor-pointer
                                "
                            >
                                Unstock All
                            </button>

                            <button
                                onClick={() => handleManageStock({
                                    action: 'manage',
                                    plant,
                                    maxInventorySpace,
                                    inventoryCount,
                                    unstockPlant,
                                    deletePlant,
                                    setPlantDetails,
                                    setShowPlantDetails,
                                    toggleModal,
                                    setPlantMangerDetails,
                                    setShowPlantManagerDetails
                                })}
                                className="
                                    bg-[var(--accent-mint)]
                                    py-1 px-1.5
                                    rounded-md
                                    text-xs
                                    cursor-pointer
                                "
                            >
                                Manage
                            </button>
                        </div>
                    }
                </div>
                <button
                    onClick={onPlantDetailsClose}
                    className="absolute top-2 right-2.5 text-2xl cursor-pointer"
                >
                    X
                </button>
            </div>
        </div>
    )
}

export default PlantDetailsModal