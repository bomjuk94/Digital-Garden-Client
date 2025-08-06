import { usePlantStore } from "../stores/usePlantStores";
import { useUserModeStore } from "../stores/useUserModeStore";
import { useRegisteredUserGameStore } from "../stores/useRegisteredUserGameStore";

export const useGetPlants = () => {
    const guestPlants = usePlantStore((state) => state.plants);
    const registeredPlants = useRegisteredUserGameStore((state) => state.registeredPlants); // hydrated at login
    const userMode = useUserModeStore((state) => state.userMode);

    return {
        plants: userMode === "guest" ? guestPlants : registeredPlants,
        error: null,
        loading: false,
    };
};
