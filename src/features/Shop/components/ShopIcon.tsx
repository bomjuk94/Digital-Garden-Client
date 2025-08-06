import { shopIcon } from "@/assets/overlay"
import { useModalStore } from "@/shared/stores/useModalStore"

const ShopIcon = () => {

    const { toggleModal } = useModalStore()

    const handleInventoryClick = () => {
        toggleModal('shop')
    }

    return (
        <button
            onClick={handleInventoryClick}
            className="cursor-pointer"
        >
            <img
                src={shopIcon}
                alt="Shop Icon"
                className="w-10"
            />
        </button>
    )
}

export default ShopIcon