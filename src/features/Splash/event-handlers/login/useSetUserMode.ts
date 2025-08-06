import { useUserModeStore } from "../../../../shared/stores/useUserModeStore";
import { isUserModeType } from "../../splashUtils";

export const useSetUserMode = () => {
    const { setUserMode } = useUserModeStore()

    const storeUserMode = (val: string | null) => {
        setUserMode(isUserModeType(val) ? val : null)
    }

    return { storeUserMode }
}