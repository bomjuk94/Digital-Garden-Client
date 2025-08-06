import type { HandleSeedBtnClickProps } from "../types/props/HandleSeedBtnClickProps"
import { purchaseSeed } from "../utilities/purchaseSeed"
import { handleUnlockSeed } from "../utilities/handleUnlockSeed"

export const useHandleSeedBtnClick = () => {

    const handleSeedBtnClick = async ({
        seed,
        action,
        profile,
        setSeedCount,
        setBalance,
        unlockSeed,
    }: HandleSeedBtnClickProps) => {
        if (action === 'buy') {
            purchaseSeed({
                profile,
                setSeedCount,
                seed,
                setBalance,
            })
        } else if (action === 'unlock') {

            handleUnlockSeed({
                profile,
                seed,
                setBalance,
                unlockSeed,
            })
        }
    }

    return { handleSeedBtnClick }
}