import { useSeedsStore } from "@/features/Greenhouse/stores/useSeedsStore";
import { useUserModeStore } from "../stores/useUserModeStore";
import { useRegisteredUserGameStore } from "../stores/useRegisteredUserGameStore";

export const useGetSeeds = () => {
    const guestSeeds = useSeedsStore((state) => state.seeds);
    const registeredSeeds = useRegisteredUserGameStore((state) => state.registeredSeeds); // hydrated at login
    const userMode = useUserModeStore((state) => state.userMode);

    return {
        seeds: userMode === "guest" ? guestSeeds : registeredSeeds,
        error: null,
        loading: false,
    };
};
