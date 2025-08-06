import { useCustomerStore } from "@/features/Shop/stores/useCustomerStore";
import { useUserModeStore } from "../stores/useUserModeStore";
import { useRegisteredUserGameStore } from "../stores/useRegisteredUserGameStore";

export const useGetCustomer = () => {
    const guestCustomer = useCustomerStore((state) => state.customer);
    const registeredCustomer = useRegisteredUserGameStore((state) => state.registeredCustomer); // hydrated at login
    const userMode = useUserModeStore((state) => state.userMode);

    return {
        customer: userMode === "guest" ? guestCustomer : registeredCustomer,
        error: null,
        loading: false,
    };
};
