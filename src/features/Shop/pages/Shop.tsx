import NavigationIcon from "@/features/Greenhouse/components/NavigationIcon"
import InstructionsIcon from "@/shared/components/InstructionsIcon"
import ShopInstructionsModal from "@/shared/components/modals/ShopInstructionsModal"
import InventoryIcon from "@/shared/components/InventoryIcon"
import { useModalStore } from "@/shared/stores/useModalStore"
import InventoryModal from "@/features/Greenhouse/components/InventoryModal"
import ShopListModal from "../components/ShopListModal"
import PlantDetailsModal from "@/shared/components/modals/PlantDetailsModal"
import PlantManagerModal from "../components/modals/PlantManagerModal"
import Customer from "../components/Customer"
import { useHandleChooseRandomCustomer } from "../event-handlers/useHandleChooseRandomCustomer"
import ReceiptIcon from "@/shared/components/ReceiptIcon"
import ReceiptModal from "@/shared/components/modals/ReceiptModal"
import StoreModal from "@/features/Store/components/StoreModal"
import StoreIcon from "@/shared/components/StoreIcon"
import ShopIcon from "../components/ShopIcon"
import { useShowPassiveSales } from "../event-handlers/useShowPassiveSales"
import { useGetCustomer } from "@/shared/hooks/useGetCustomer"
import { useShopActions } from "@/shared/hooks/shop/useShopActions"
import { useGetUserProfile } from "@/shared/hooks/useGetUserProfile"
import { useGetInventory } from "@/shared/hooks/useGetInventory"
import { useGetPurchases } from "@/shared/hooks/useGetPurchases"
import { useGetShop } from "@/shared/hooks/shop/useGetShop"
import { Helmet } from "react-helmet"

const Shop = () => {

    const { profile } = useGetUserProfile()
    const { inventory } = useGetInventory()
    const { purchases } = useGetPurchases()
    const { shop } = useGetShop()
    const { customer } = useGetCustomer()
    const {
        plantDetails,
        showPlantDetails,
        setShowPlantDetails,
        setPlantDetails,
        showPlantManagerDetails,
        plantManagerDetails,
        setShowPlantManagerDetails,
        setPlantMangerDetails
    } = useShopActions()

    const { activeModal, toggleModal } = useModalStore()

    const onPlantDetailsClose = () => {
        setShowPlantDetails(false)
        setPlantDetails(null)
        toggleModal('shop')
    }
    const onPlantManagerDetailsClose = () => {
        setShowPlantManagerDetails(false)
        setPlantMangerDetails(null)
        toggleModal('plantDetails')
    }

    useHandleChooseRandomCustomer(shop)
    useShowPassiveSales(purchases, profile)

    return (
        <>
            <Helmet>
                <title>Shop - Digital Garden</title>
                <meta name="description" content="Visit the Shop to buy seeds, upgrades, and supplies. Boost growth, increase yields, and expand your Digital Garden adventure.">
                </meta>
            </Helmet>

            <div className='bg-[var(--bg-primary)] h-dvh flex flex-col justify-center relative bg-forest'>
                <div
                    className='min-w-desktop-width max-w-desktop-width min-h-desktop-height max-h-desktop-height mx-auto bg-shop rounded-twenty relative overflow-visible bg-[var(--bg-primary)]'>

                    <p className='absolute top-2 left-2 bg-[var(--bg-primary)] py-1 px-2.5 rounded-twenty text-sm'>
                        ${
                            profile &&
                            profile.balance
                        }
                    </p>

                    {
                        activeModal === 'inventory' && <InventoryModal inventory={inventory} />
                    }

                    {
                        activeModal === 'shop' && <ShopListModal onClose={toggleModal} activeModal={activeModal} shop={shop} />
                    }

                    {
                        activeModal === 'instructions' && <ShopInstructionsModal onClose={toggleModal} activeModal={activeModal} />
                    }

                    {
                        (activeModal === 'plantDetails' && showPlantDetails) &&
                        <PlantDetailsModal plant={plantDetails} onPlantDetailsClose={onPlantDetailsClose} />
                    }

                    {
                        (activeModal === 'plantManager' && showPlantManagerDetails) &&
                        <PlantManagerModal plant={plantManagerDetails} onPlantManagerDetailsClose={onPlantManagerDetailsClose} />
                    }

                    {
                        activeModal === 'receipt' && <ReceiptModal receipts={purchases} />
                    }

                    {
                        activeModal === 'store' && <StoreModal />
                    }

                    {
                        customer &&
                        <Customer customer={customer} />
                    }

                    <div className='absolute bottom-2 right-2'>
                        <div className='flex flex-col gap-1.5'>
                            <InventoryIcon />
                            <NavigationIcon />
                            <ShopIcon />
                            <StoreIcon />
                            <ReceiptIcon />
                            <InstructionsIcon />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Shop