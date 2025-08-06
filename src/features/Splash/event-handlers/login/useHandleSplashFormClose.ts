import { useSetUserMode } from "./useSetUserMode";

export const useHandleSplashFormClose = () => {
    const { storeUserMode } = useSetUserMode()

    const handleSplashFormClose = () => {
        storeUserMode(null)
    }

    return { handleSplashFormClose }
}