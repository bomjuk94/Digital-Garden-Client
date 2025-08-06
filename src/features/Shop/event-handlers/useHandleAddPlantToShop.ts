import type { HandleAddPlantToShopProps } from "../types/props/HandleAddPlantToShopProps"
import { useAddToShop } from "./useAddToShop"

export const useHandleAddPlantToShop = () => {
    const { handleAddToShop } = useAddToShop()

    const handleAddPlantToShop = ({
        item,
        addToShop,
        setActiveIndex,
    }: HandleAddPlantToShopProps) => {
        handleAddToShop({
            addToShop,
            item,
            setActiveIndex,
        })
    }

    return { handleAddPlantToShop }
}