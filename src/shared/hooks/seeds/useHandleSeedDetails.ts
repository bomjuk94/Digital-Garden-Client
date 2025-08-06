import { useSeedsStore } from "@/features/Greenhouse/stores/useSeedsStore"
import { useRegisteredUserGameStore } from "@/shared/stores/useRegisteredUserGameStore"
import { useUserModeStore } from "@/shared/stores/useUserModeStore"

export const useHandleSeedDetails = () => {
    const userMode = useUserModeStore((s) => s.userMode)
    // Guest
    const showSeedDetails = useSeedsStore((s) => s.showSeedDetails)
    const seedDetails = useSeedsStore((s) => s.seedDetails)
    const setShowSeedDetails = useSeedsStore((s) => s.setShowSeedDetails)
    const setSeedDetails = useSeedsStore((s) => s.setSeedDetails)
    // Registered
    const showRegisteredSeedDetails = useRegisteredUserGameStore((s) => s.showRegisteredSeedDetails)
    const registeredSeedDetails = useRegisteredUserGameStore((s) => s.registeredSeedDetails)
    const setShowRegisteredSeedDetails = useRegisteredUserGameStore((s) => s.setShowRegisteredSeedDetails)
    const setRegisteredSeedDetails = useRegisteredUserGameStore((s) => s.setRegisteredSeedDetails)

    if (userMode === 'guest') {
        return {
            showSeedDetails,
            seedDetails,
            setShowSeedDetails,
            setSeedDetails
        }
    }

    return {
        showSeedDetails: showRegisteredSeedDetails,
        seedDetails: registeredSeedDetails,
        setShowSeedDetails: setShowRegisteredSeedDetails,
        setSeedDetails: setRegisteredSeedDetails,
    }
}