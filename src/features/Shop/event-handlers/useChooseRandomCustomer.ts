import { useCustomerActions } from "@/shared/hooks/customer/useCustomerActions"

export const useChooseRandomCustomer = () => {
    const { chooseRandomCustomer } = useCustomerActions()

    const handleChooseRandomCustomer = () => {
        chooseRandomCustomer()
    }

    return { handleChooseRandomCustomer }
}