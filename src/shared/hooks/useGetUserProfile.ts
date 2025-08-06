import { useUserProfileStore } from "../stores/useUserProfileStore";
import { useUserModeStore } from "../stores/useUserModeStore";
import { useRegisteredUserGameStore } from "../stores/useRegisteredUserGameStore";

export const useGetUserProfile = () => {
    const guestProfile = useUserProfileStore((s) => s.userProfile)
    const registeredProfile = useRegisteredUserGameStore((s) => s.registeredProfile)
    const userMode = useUserModeStore((s) => s.userMode)

    const profile = userMode === "guest" ? guestProfile : registeredProfile

    const effectiveCapacity =
        profile?.game.calculatedPlantCapacity

    return {
        profile,
        effectiveCapacity,
        error: null,
        loading: false,
    }
}
