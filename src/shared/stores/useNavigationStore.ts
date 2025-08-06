import { create } from "zustand";

type NavigationStore = {
    showNavigation: boolean
    toggleNavigation: () => void
    resetNavigationState: () => void
}

export const useNavigationStore = create<NavigationStore>(
    (set, get) => ({
        showNavigation: false,
        toggleNavigation: () => {
            const { showNavigation } = get()
            set({ showNavigation: !showNavigation })
        },
        resetNavigationState: () => set({ showNavigation: false }),
    }))