import { inventory } from "@/assets/overlay"
import { useModalStore } from "../stores/useModalStore"

const InventoryIcon = () => {

    const { toggleModal, setStoreTab } = useModalStore()

    const handleInventoryClick = () => {
        setStoreTab('plants')
        toggleModal('inventory')
    }

    return (
        <button
            onClick={handleInventoryClick}
            className="cursor-pointer"
        >
            <img
                src={inventory}
                alt="Inventory Icon"
                className="w-10"
            />
        </button>
    )
}

export default InventoryIcon