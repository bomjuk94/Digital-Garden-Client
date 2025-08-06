import { useState } from 'react'
import desk from '@assets/overlay/desk.webp'
import ToolBelt from '@/shared/components/ToolBelt'
import { toolbeltActions } from '../constants'
import SeedsList from '../components/SeedsList'
import InventoryModal from '../components/InventoryModal'
import PlantsList from '@/shared/components/PlantsList'
import { useToolsStore } from '@/shared/stores/useToolsStore'
import { useModalStore } from '@/shared/stores/useModalStore'
import WelcomeModal from '@/shared/components/modals/WelcomeModal'
import InstructionsModal from '@/shared/components/modals/InstructionsModal'
import InstructionsIcon from '@/shared/components/InstructionsIcon'
import SeedDetailsModal from '../components/SeedDetailsModal'
import NavigationIcon from '../components/NavigationIcon'
import InventoryIcon from '@/shared/components/InventoryIcon'
import ReceiptIcon from '@/shared/components/ReceiptIcon'
import ReceiptModal from '@/shared/components/modals/ReceiptModal'
import StoreModal from '@/features/Store/components/StoreModal'
import StoreIcon from '@/shared/components/StoreIcon'
import PlantBuffsModal from '../components/PlantBuffsModal'
import { useHandleSeedDetails } from '@/shared/hooks/seeds/useHandleSeedDetails'
import { useSetOnBoardingStatus } from '@/shared/hooks/profile/useSetOnBoardingStatus'
import { useGetUserProfile } from '@/shared/hooks/useGetUserProfile'
import { useGetSeeds } from '@/shared/hooks/useGetSeeds'
import { useGetPurchases } from '@/shared/hooks/useGetPurchases'
import { useGetPlants } from '@/shared/hooks/useGetPlants'

const GreenHouse = () => {

    const { profile } = useGetUserProfile()
    const { seeds } = useGetSeeds()
    const { purchases } = useGetPurchases()
    const { plants } = useGetPlants()

    const { setOnBoardingStatus } = useSetOnBoardingStatus()
    const {
        showSeedDetails,
        seedDetails,
        setShowSeedDetails,
        setSeedDetails
    } = useHandleSeedDetails()
    const { toolsHydated } = useToolsStore()
    const { activeModal, toggleModal } = useModalStore()
    const [showWelcome, setShowWelcome] = useState(!profile?.onboardingComplete)

    const onClose = () => {
        setShowWelcome(false)
        setOnBoardingStatus(true)
    }

    const onSeedDetailsClose = () => {
        setShowSeedDetails(false)
        setSeedDetails(null)
    }

    if (!profile || !seeds || !purchases || !plants || !toolsHydated) return

    return (
        <div className='bg-[var(--bg-primary)] h-dvh flex flex-col justify-center relative bg-forest'>
            <div
                data-tutorial-id="greenhouse-backdrop"
                className='min-w-desktop-width max-w-desktop-width min-h-desktop-height max-h-desktop-height mx-auto bg-greenhouse rounded-twenty relative overflow-visible bg-[var(--bg-primary)]'>

                <p className='absolute top-2 left-2 bg-[var(--bg-primary)] py-1 px-2.5 rounded-twenty text-sm'>
                    ${
                        profile &&
                        profile.balance
                    }
                </p>

                <img
                    src={desk}
                    alt="desk"
                    data-tutorial-id="greenhouse-desk"
                    className='absolute bottom-2 left-1/2 transform -translate-x-fifty-percent w-desk-width pointer-events-none'
                />

                <ToolBelt toolbeltActions={toolbeltActions} />

                {
                    activeModal === 'seeds' && <SeedsList seeds={seeds} />
                }

                {
                    activeModal === 'inventory' && <InventoryModal />
                }

                {showWelcome && (
                    <WelcomeModal onClose={onClose} />
                )}

                {
                    activeModal === 'instructions' && <InstructionsModal onClose={toggleModal} activeModal={activeModal} />
                }

                {
                    activeModal === 'receipt' && <ReceiptModal receipts={purchases} />
                }

                {
                    activeModal === 'store' && <StoreModal />
                }

                {
                    showSeedDetails &&
                    <SeedDetailsModal seed={seedDetails} onSeedDetailsClose={onSeedDetailsClose} />
                }

                {
                    activeModal === 'plantBuffs' &&
                    <PlantBuffsModal />
                }

                <PlantsList plants={plants} />

                <div className='absolute bottom-2 right-2'>
                    <div className='flex flex-col gap-1.5'>
                        <InventoryIcon />
                        <NavigationIcon />
                        <StoreIcon />
                        <ReceiptIcon />
                        <InstructionsIcon />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GreenHouse