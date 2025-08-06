import { useShopStore } from "@/features/Shop/stores/useShopStore"
import { useRegisteredUserGameStore } from "@/shared/stores/useRegisteredUserGameStore"
import { useUserModeStore } from "@/shared/stores/useUserModeStore"

export const useShopActions = () => {
    const userMode = useUserModeStore.getState().userMode
    // guest
    const plantDetails = useShopStore((s) => s.plantDetails)
    const showPlantDetails = useShopStore((s) => s.showPlantDetails)
    const setShowPlantDetails = useShopStore((s) => s.setShowPlantDetails)
    const setPlantDetails = useShopStore((s) => s.setPlantDetails)
    const showPlantManagerDetails = useShopStore((s) => s.showPlantManagerDetails)
    const plantManagerDetails = useShopStore((s) => s.plantManagerDetails)
    const setShowPlantManagerDetails = useShopStore((s) => s.setShowPlantManagerDetails)
    const setPlantMangerDetails = useShopStore((s) => s.setPlantMangerDetails)
    const performPassiveSale = useShopStore((s) => s.performPassiveSale)
    const addToShop = useShopStore((s) => s.addToShop)
    const getCurrentStockCount = useShopStore((s) => s.getCurrentStockCount)
    const getMaxStockSpace = useShopStore((s) => s.getMaxStockSpace)
    const deletePlant = useShopStore((s) => s.deletePlant)
    const unstockPlant = useShopStore((s) => s.unstockPlant)
    const removeFromShop = useShopStore((s) => s.removeFromShop)

    // registered
    const registeredShopPlantDetails = useRegisteredUserGameStore((s) => s.registeredShopPlantDetails)
    const showRegisteredShopPlantDetails = useRegisteredUserGameStore((s) => s.showRegisteredShopPlantDetails)
    const setShowRegisteredShopPlantDetails = useRegisteredUserGameStore((s) => s.setShowRegisteredShopPlantDetails)
    const setRegisteredShopPlantDetails = useRegisteredUserGameStore((s) => s.setRegisteredShopPlantDetails)
    const showRegisteredShopPlantManagerDetails = useRegisteredUserGameStore((s) => s.showRegisteredShopPlantManagerDetails)
    const registeredShopPlantManagerDetails = useRegisteredUserGameStore((s) => s.registeredShopPlantManagerDetails)
    const setShowRegisteredShopPlantManagerDetails = useRegisteredUserGameStore((s) => s.setShowRegisteredShopPlantManagerDetails)
    const setRegisteredShopPlantMangerDetails = useRegisteredUserGameStore((s) => s.setRegisteredShopPlantMangerDetails)
    const performRegisteredPassiveSale = useRegisteredUserGameStore((s) => s.performRegisteredPassiveSale)
    const addToRegisteredShop = useRegisteredUserGameStore((s) => s.addToRegisteredShop)
    const getCurrentRegisteredStockCount = useRegisteredUserGameStore((s) => s.getCurrentRegisteredStockCount)
    const getRegisteredMaxStockSpace = useRegisteredUserGameStore((s) => s.getRegisteredMaxStockSpace)
    const deleteRegisteredPlant = useRegisteredUserGameStore((s) => s.deleteRegisteredPlant)
    const unstockRegisteredPlant = useRegisteredUserGameStore((s) => s.unstockRegisteredPlant)
    const removeFromRegisteredShop = useRegisteredUserGameStore((s) => s.removeFromRegisteredShop)

    if (userMode === 'guest') {
        return {
            plantDetails,
            showPlantDetails,
            setShowPlantDetails,
            setPlantDetails,
            showPlantManagerDetails,
            plantManagerDetails,
            setShowPlantManagerDetails,
            setPlantMangerDetails,
            performPassiveSale,
            addToShop,
            getCurrentStockCount,
            getMaxStockSpace,
            deletePlant,
            unstockPlant,
            removeFromShop,
        }
    }

    return {
        plantDetails: registeredShopPlantDetails,
        showPlantDetails: showRegisteredShopPlantDetails,
        setShowPlantDetails: setShowRegisteredShopPlantDetails,
        setPlantDetails: setRegisteredShopPlantDetails,
        showPlantManagerDetails: showRegisteredShopPlantManagerDetails,
        plantManagerDetails: registeredShopPlantManagerDetails,
        setShowPlantManagerDetails: setShowRegisteredShopPlantManagerDetails,
        setPlantMangerDetails: setRegisteredShopPlantMangerDetails,
        performPassiveSale: performRegisteredPassiveSale,
        addToShop: addToRegisteredShop,
        getCurrentStockCount: getCurrentRegisteredStockCount,
        getMaxStockSpace: getRegisteredMaxStockSpace,
        deletePlant: deleteRegisteredPlant,
        unstockPlant: unstockRegisteredPlant,
        removeFromShop: removeFromRegisteredShop,
    }
}