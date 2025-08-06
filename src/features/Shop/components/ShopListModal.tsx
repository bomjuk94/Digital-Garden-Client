import { useModalStore } from "@/shared/stores/useModalStore"
import type { ShopListModalProps } from "../types"
import { growthPhaseMap } from "@/shared/utils.ts/constants"
import { getSpriteStyle } from "@/shared/utils.ts/getSpriteStyle"
import type { plantMapObjectType } from "@/shared/types"
import { useShopActions } from "@/shared/hooks/shop/useShopActions"

const ShopListModal = ({ onClose, activeModal, shop }: ShopListModalProps) => {

    const { toggleModal } = useModalStore()
    const {
        setPlantDetails,
        setShowPlantDetails,
        getCurrentStockCount,
        getMaxStockSpace,
    } = useShopActions()

    const shopExists = Object.values(shop).length
    const handlePlantClick = (plant: plantMapObjectType) => {
        setPlantDetails(plant)
        setShowPlantDetails(true)
        toggleModal('plantDetails')
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <div className="bg-[var(--bg-primary)] border border-[var(--border)] rounded-2xl shadow-lg p-6 max-w-lg w-[90%] space-y-4 text-[var(--text-primary)] text-sm leading-relaxed overflow-y-auto max-h-[90vh] hide-scrollbar relative">
                <h2 className="text-base font-semibold text-center">Shop Stock</h2>

                {
                    shopExists ?
                        <ul className="grid grid-cols-5 justify-items-center gap-x-2.5 gap-y-12">
                            {
                                Object.values(shop).map((plant, i) => (
                                    <li
                                        className="flex flex-col items-center gap-1.5 relative w-fit"
                                        key={i}
                                    >

                                        <button
                                            onClick={() => handlePlantClick(plant)}
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

                                        <div className="flex gap-0.5 absolute -top-4 -right-3.5 bg-[var(--accent-yellow)] py-1.5 px-2 rounded-full">
                                            <p
                                                className="text-ten"
                                                title={`Price: $${plant.sellPrice} | Stock: ${plant.count}`}
                                            >
                                                ${plant.sellPrice} | x{plant.count}
                                            </p>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>

                        :
                        <p className="text-center">
                            No items for sale...
                        </p>
                }

                <p className="absolute top-7 right-10 text-sm">
                    {`${getCurrentStockCount(shop) || 0}/${getMaxStockSpace()}`}
                </p>

                <button
                    onClick={() => onClose(activeModal)}
                    className="absolute top-2 right-2.5 text-2xl cursor-pointer"
                >
                    X
                </button>
            </div>
        </div>
    )
}

export default ShopListModal