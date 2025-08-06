import { showToast } from "@/shared/utils.ts/showToast";
import type { HandleCustomerPurchaseProps } from "../types/props/HandleCustomerPurchaseProps";
import type { PurchaseType } from "@/features/Purchases/types";
import { useCustomerActions } from "@/shared/hooks/customer/useCustomerActions";

export const useHandleCustomerPurchase = () => {

    const {
        setOneLinerActive,
        chooseRandomDialogOption,
        setIntervalId,
    } = useCustomerActions()

    const handleCustomerPurchase = async ({
        action,
        customer,
        removeFromShop,
        setBalance,
        resetCustomer,
        addPurchase,
        setDialog,
    }: HandleCustomerPurchaseProps) => {
        if (action === 'sell') {
            if (!customer || !customer.plant || !customer.plant.plants || !customer.plantName) return;

            const randomIndividualPlant = customer.plant.plants[Math.floor(Math.random() * customer.plant.plants.length)];
            const success = await removeFromShop(randomIndividualPlant, customer.plantName, 'sell')


            if (success) {
                if (!customer || !customer.purchasePrice) return

                setBalance(customer.purchasePrice, 'increase')
                showToast('success', `${customer.plantLabel} sold successfully!`)
                const purchase: PurchaseType = {
                    customer: {
                        id: customer.id,
                        name: customer.name,
                        image: customer.image,
                    },
                    plant: customer.plant.plants[0],
                    purchasePrice: customer.purchasePrice,
                    timestamp: Date.now(),
                    method: 'manual',
                }

                if (!addPurchase) return

                addPurchase(purchase)
                setOneLinerActive(true)
                setDialog(chooseRandomDialogOption(customer.dialogue.oneLiners))
                const nextCustomer = () => {
                    setOneLinerActive(false)
                    resetCustomer()
                }

                const interval = setInterval(nextCustomer, 5000)
                setIntervalId(interval)

                return () => clearInterval(interval)
            }
        } else if (action === 'decline') {
            resetCustomer()
            showToast('warning', 'Sale was declined')
        }
    }

    return { handleCustomerPurchase }
}