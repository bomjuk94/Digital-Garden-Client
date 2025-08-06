import { useGardenStore } from "@/features/Garden/stores/useGardenStore";
import { useUserModeStore } from "../stores/useUserModeStore";
import { useRegisteredUserGameStore } from "../stores/useRegisteredUserGameStore";

export const useGetGarden = () => {
    const guestGarden = useGardenStore((state) => state.garden);
    const registeredInventory = useRegisteredUserGameStore((state) => state.registeredGarden); // hydrated at login
    const userMode = useUserModeStore((state) => state.userMode);

    return {
        garden: userMode === "guest" ? guestGarden : registeredInventory,
        error: null,
        loading: false,
    };
};
