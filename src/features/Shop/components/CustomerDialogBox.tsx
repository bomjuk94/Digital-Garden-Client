import { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import type { CustomerDialogBoxProps } from "../types"
import { useHandleCustomerPurchase } from '../event-handlers/useHandleCustomerPurchase'
import { useShopActions } from '@/shared/hooks/shop/useShopActions'
import { useProfileActions } from '@/shared/hooks/profile/useProfileActions'
import { usePurchasesActions } from '@/shared/hooks/purchases/usePurchasesActions'
import { useCustomerActions } from '@/shared/hooks/customer/useCustomerActions'

const CustomerDialogBox = ({ customer }: CustomerDialogBoxProps) => {

    const { removeFromShop } = useShopActions()
    const { setBalance } = useProfileActions()
    const { addPurchase } = usePurchasesActions()
    const {
        chooseRandomDialogOption,
        resetCustomer,
        oneLinerActive,
        setOneLinerActive,
        intervalId,
        clearCustomerInterval,
    } = useCustomerActions()

    const { handleCustomerPurchase } = useHandleCustomerPurchase()

    const [dialog, setDialog] = useState<string>('')

    useEffect(() => {
        setDialog(chooseRandomDialogOption(customer.dialogue.smallTalk))
    }, [customer])

    const handleDialogSkip = () => {
        if (intervalId) {
            clearCustomerInterval(intervalId)
            setOneLinerActive(false)
            resetCustomer()
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-[var(--bg-dialog)] border-2 border-[var(--border-dialog)] rounded-2xl shadow-md p-4 w-three-fifty-four text-[var(--text-primary)] font-medium text-sm space-y-2 z-50f flex flex-col gap-2"
        >

            <p className="whitespace-pre-wrap">{customer.name}: {dialog}</p>

            {
                !oneLinerActive &&
                <div className='flex flex-col gap-1'>
                    <p className="whitespace-pre-wrap m-0">Plant: {customer.plantLabel}</p>

                    <p className="whitespace-pre-wrap m-0">Price: ${customer.purchasePrice}</p>
                </div>

            }

            <div className="flex gap-1.5">
                {
                    !oneLinerActive &&
                    <>
                        <button
                            onClick={() => handleCustomerPurchase({
                                action: 'sell',
                                customer,
                                removeFromShop,
                                setBalance,
                                resetCustomer,
                                addPurchase,
                                setDialog,
                            })}
                            className="
                        bg-[var(--accent-mint)]
                        py-1 px-1.5
                        rounded-md
                        text-xs
                        cursor-pointer
                    "
                        >
                            Sell
                        </button>

                        <button
                            onClick={() => handleCustomerPurchase({
                                action: 'decline',
                                customer,
                                removeFromShop,
                                setBalance,
                                resetCustomer,
                                setDialog,
                            })}
                            className="
                        bg-[var(--accent-purple)]
                        py-1 px-1.5
                        rounded-md
                        text-xs
                        cursor-pointer
                    "
                        >
                            Decline
                        </button>
                    </>
                }
                {
                    oneLinerActive &&
                    <button
                        onClick={handleDialogSkip}
                        className="
                        bg-[var(--accent-mint)]
                        py-1 px-1.5
                        rounded-md
                        text-xs
                        cursor-pointer
                    "
                    >
                        Skip
                    </button>
                }

            </div>
        </motion.div>
    )
}

export default CustomerDialogBox
