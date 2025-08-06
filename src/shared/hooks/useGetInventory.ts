import { useInventoryStore } from "../stores/useInventoryStore";
import { useUserModeStore } from "../stores/useUserModeStore";
import { useRegisteredUserGameStore } from "../stores/useRegisteredUserGameStore";


export const useGetInventory = () => {
    const guestInventory = useInventoryStore((state) => state.inventory);
    const registeredInventory = useRegisteredUserGameStore((state) => state.registeredInventory); // hydrated at login
    const userMode = useUserModeStore((state) => state.userMode);

    return {
        inventory: userMode === "guest" ? guestInventory : registeredInventory,
        error: null,
        loading: false,
    };
};
