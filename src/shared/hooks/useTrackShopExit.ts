import { useLocation } from "react-router-dom";
import { usePreviousRoute } from "./usePreviousRoute";
import { useEffect } from "react";
import { useProfileActions } from "./profile/useProfileActions";

export const useTrackShopExit = () => {
    const location = useLocation()
    const previousLocation = usePreviousRoute()
    const { setLastAtShop } = useProfileActions()

    useEffect(() => {

        if (previousLocation.pathname === '/shop' && location.pathname !== '/shop') {
            setLastAtShop(Date.now())
        }
    }, [location, previousLocation.pathname, setLastAtShop])
}