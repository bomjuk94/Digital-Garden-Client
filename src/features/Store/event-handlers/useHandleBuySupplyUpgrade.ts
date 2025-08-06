import { showToast } from "@/shared/utils.ts/showToast"
import type { StoreSupply, StoreUpgrade } from "../types"
import type { BuySupplyUpgradeProps } from "../types/props/BuySupplyUpgradeProps"
import { upgradesEffectMap } from "@/features/Effects/system/upgradesEffectMap"
import { EffectNames } from "@/features/Effects/constants"
import { useProfileActions } from "@/shared/hooks/profile/useProfileActions"
import { useSchedulerActions } from "@/shared/hooks/scheduler/schedulerActions"

export const useHandleBuySupplyUpgrade = () => {

    const { addPlantCapacitySpace } = useProfileActions()
    const { clearIntervalById } = useSchedulerActions()

    const handleBuySupplyUpgrade = ({
        item,
        activeStoreTab,
        profile,
        addSupply,
        addUpgrade,
        setBalance,
        upgrades,
    }: BuySupplyUpgradeProps) => {
        if (!profile || profile?.balance < item.price) return showToast('error', 'Not enough funds')

        if (activeStoreTab === 'suppliesStore') {
            addSupply(item as StoreSupply)
        } else if (activeStoreTab === 'upgrades') {
            const upgradeItem = item as StoreUpgrade

            const userUpgrades = upgrades?.filter(u => u.effect === upgradeItem.effect) ?? []

            if (
                typeof upgradeItem.maxStacks === 'number' &&
                userUpgrades.length >= upgradeItem.maxStacks
            ) {
                return showToast('error', 'You already own the maximum allowed upgrades for this effect.')
            }

            addUpgrade(item as StoreUpgrade)

            if (item.effect === EffectNames.IncreasePots) {
                addPlantCapacitySpace()
            }

            const effectFn = upgradesEffectMap[item.effect]

            if (effectFn) {
                clearIntervalById(item.effect)
                effectFn()
            } else {
                console.warn(`No passive effect registered for: ${item.effect}`)
            }
        }
        setBalance(item.price, 'decrease')
        showToast('success', `${item.label} has been purchased`)
    }

    return { handleBuySupplyUpgrade }
}