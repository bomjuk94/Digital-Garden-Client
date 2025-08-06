import { usePurchasesStore } from "@/features/Purchases/stores/usePurchasesStore";
import { useUserModeStore } from "../stores/useUserModeStore";
import { useRegisteredUserGameStore } from "../stores/useRegisteredUserGameStore";

export const useGetPurchases = () => {
    const guestPurchases = usePurchasesStore((state) => state.purchases);
    const registeredPurchases = useRegisteredUserGameStore((state) => state.registeredPurchases); // hydrated at login
    const userMode = useUserModeStore((state) => state.userMode);

    return {
        purchases: userMode === "guest" ? guestPurchases : registeredPurchases,
        error: null,
        loading: false,
    };
};
