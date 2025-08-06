import { useShopStore } from "@/features/Shop/stores/useShopStore";
import { useUserModeStore } from "@/shared/stores/useUserModeStore";
import { useRegisteredUserGameStore } from "@/shared/stores/useRegisteredUserGameStore";

export const useGetShop = () => {
    const guestShop = useShopStore((state) => state.shop);
    const registeredShop = useRegisteredUserGameStore((state) => state.registeredShop); // hydrated at login
    const userMode = useUserModeStore((state) => state.userMode);

    return {
        shop: userMode === "guest" ? guestShop : registeredShop,
        error: null,
        loading: false,
    };
};
