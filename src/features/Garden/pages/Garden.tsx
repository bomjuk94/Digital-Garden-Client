import NavigationIcon from "@/features/Greenhouse/components/NavigationIcon"
import InstructionsIcon from "@/shared/components/InstructionsIcon"
import GardenInstructionsModal from "@/shared/components/modals/GardenInstructionsModal"
import InventoryModal from "@/features/Greenhouse/components/InventoryModal"
import { useModalStore } from "@/shared/stores/useModalStore"
import InventoryIcon from "@/shared/components/InventoryIcon"
import GardenList from "../components/GardenList"
import PlantDetailsModal from "@/shared/components/modals/PlantDetailsModal"
import ReceiptIcon from "@/shared/components/ReceiptIcon"
import ReceiptModal from "@/shared/components/modals/ReceiptModal"
import StoreModal from "@/features/Store/components/StoreModal"
import StoreIcon from "@/shared/components/StoreIcon"
import { useGetUserProfile } from "@/shared/hooks/useGetUserProfile"
import { useGetGarden } from "@/shared/hooks/useGetGarden"
import { useGetInventory } from "@/shared/hooks/useGetInventory"
import { useGetPurchases } from "@/shared/hooks/useGetPurchases"
import { useGardenActions } from "@/shared/hooks/garden/useGardenActions"

const Garden = () => {

    const { profile } = useGetUserProfile()
    const { garden, loading, error } = useGetGarden()
    const { inventory } = useGetInventory()
    const { purchases } = useGetPurchases()
    const {
        showPlantDetails,
        plantDetails,
        setPlantDetails,
        setShowPlantDetails,
    } = useGardenActions()

    const onPlantDetailsClose = () => {
        setShowPlantDetails(false)
        setPlantDetails(null)
    }

    const { activeModal, toggleModal } = useModalStore()

    if (error || loading) return

    return (
        <div className='bg-[var(--bg-primary)] h-dvh flex flex-col justify-center relative bg-forest'>
            <div
                className='min-w-desktop-width max-w-desktop-width min-h-desktop-height max-h-desktop-height mx-auto bg-garden rounded-twenty relative overflow-visible bg-[var(--bg-primary)]'>

                <p className='absolute top-2 left-2 bg-[var(--bg-primary)] py-1 px-2.5 rounded-twenty text-sm'>
                    ${
                        profile &&
                        profile.balance
                    }
                </p>

                <GardenList garden={garden} />
                {
                    activeModal === 'inventory' && <InventoryModal inventory={inventory} />
                }

                {
                    activeModal === 'instructions' && <GardenInstructionsModal onClose={toggleModal} activeModal={activeModal} />
                }

                {
                    activeModal === 'receipt' && <ReceiptModal receipts={purchases} />
                }

                {
                    activeModal === 'store' && <StoreModal />
                }

                <div className='absolute bottom-2 right-2'>
                    <div className='flex flex-col gap-1.5'>
                        <InventoryIcon />
                        <NavigationIcon />
                        <StoreIcon />
                        <ReceiptIcon />
                        <InstructionsIcon />
                    </div>
                </div>

                {
                    showPlantDetails &&
                    <PlantDetailsModal
                        plant={plantDetails}
                        onPlantDetailsClose={onPlantDetailsClose}
                    />
                }
            </div>
        </div>
    )
}

export default Garden