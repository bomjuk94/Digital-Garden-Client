import { useUpgradesStore } from "@/features/Greenhouse/stores/useUpgradesStore";
import { useUserModeStore } from "@/shared/stores/useUserModeStore";
import { useRegisteredUserGameStore } from "@/shared/stores/useRegisteredUserGameStore";

export const useGetUpgrades = () => {
    const guestUpgrades = useUpgradesStore((state) => state.upgrades);
    const registeredUpgrades = useRegisteredUserGameStore((state) => state.registeredUpgrades); // hydrated at login
    const userMode = useUserModeStore((state) => state.userMode);

    return {
        upgrades: userMode === "guest" ? guestUpgrades : registeredUpgrades,
        error: null,
        loading: false,
    };
};
