import type { HandleSupplyUseProps } from '../types/props/HandleSupplyUseProps';
import { setSingleSupply } from '../utilities/setSingleSupply';
import { setTemporarySupply } from '../utilities/setTemporarySupply';

export const useHandleSupplyUse = () => {

    const handleSupplyUse = ({
        supply,
        e,
        setCursorToTool,
        closeModal,
        removeSupply,
        applyBuffToAllPlants,
    }: HandleSupplyUseProps) => {
        if (supply.duration === 'singleUse') {
            setSingleSupply({
                e,
                setCursorToTool,
                supply,
                closeModal,
                removeSupply,
            })
        } else if (supply.duration === 'temporary') {
            setTemporarySupply({
                supply,
                applyBuffToAllPlants,
                removeSupply
            })
        }
    }

    return { handleSupplyUse }
}