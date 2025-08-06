import { useLocation } from "react-router-dom"
import { useEffect } from "react"
import { useChooseRandomCustomer } from "./useChooseRandomCustomer"
import type { plantMapType } from "@/shared/types"
import { setBoostShop } from "../utilites/setBoostShop"
import { useApplyBoostMultiplier } from "./useApplyBoostMultiplier"
import { useGetUpgrades } from "@/shared/hooks/upgrades/useGetUpgrades"
import { useSchedulerActions } from "@/shared/hooks/scheduler/schedulerActions"

export const useHandleChooseRandomCustomer = (shop: plantMapType) => {

    const { handleChooseRandomCustomer } = useChooseRandomCustomer()
    const { upgrades } = useGetUpgrades()
    const { clearIntervalById, registerInterval } = useSchedulerActions()

    const { applyBoostMultiplier } = useApplyBoostMultiplier()
    const location = useLocation()
    const onShopPage = location.pathname === "/shop"

    useEffect(() => {
        if (Object.values(shop).length === 0 || !onShopPage) return

        setBoostShop(
            upgrades,
            handleChooseRandomCustomer,
            applyBoostMultiplier,
            clearIntervalById,
            registerInterval,
        )
    }, [shop, onShopPage, upgrades, applyBoostMultiplier, clearIntervalById, handleChooseRandomCustomer, registerInterval])
}
