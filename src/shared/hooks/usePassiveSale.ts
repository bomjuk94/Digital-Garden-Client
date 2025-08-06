import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { setBoostShop } from "@/features/Shop/utilites/setBoostShop"
import { useApplyBoostMultiplier } from "@/features/Shop/event-handlers/useApplyBoostMultiplier"
import { useSchedulerActions } from "./scheduler/schedulerActions"
import { useGetShop } from "./shop/useGetShop"
import { useGetUpgrades } from "./upgrades/useGetUpgrades"
import { useShopActions } from "./shop/useShopActions"

export const usePassiveSale = () => {
    const location = useLocation()
    const { shop } = useGetShop()
    const { performPassiveSale } = useShopActions()
    const { upgrades } = useGetUpgrades()
    const { applyBoostMultiplier } = useApplyBoostMultiplier()
    const { clearIntervalById, registerInterval } = useSchedulerActions()

    useEffect(() => {
        const onShopPage = location.pathname === "/shop"
        if (onShopPage) return // only block if actively on the shop page

        setBoostShop(
            upgrades,
            () => {
                if (Object.keys(shop).length > 0) {
                    performPassiveSale()
                }
            },
            applyBoostMultiplier,
            clearIntervalById,
            registerInterval
        )

    }, [location.pathname, shop, upgrades])

    // useEffect(() => {
    //     const onShopPage = location.pathname === "/shop"
    //     if (onShopPage || Object.keys(shop).length === 0) return

    //     setBoostShop(
    //         upgrades,
    //         performPassiveSale,
    //         applyBoostMultiplier,
    //         clearIntervalById,
    //         registerInterval
    //     )

    // }, [location.pathname, shop, upgrades])
}
