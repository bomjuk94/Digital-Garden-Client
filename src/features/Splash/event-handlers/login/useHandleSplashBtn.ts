import { useSetUserMode } from "./useSetUserMode"

export const useHandleSplashBtn = () => {

    const { storeUserMode } = useSetUserMode()

    const handleSplashBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
        const userModeValue = e.currentTarget.value
        storeUserMode(userModeValue)
    }

    return { handleSplashBtn }
}