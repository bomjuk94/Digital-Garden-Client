import { storeIcon } from "@/assets/overlay"
import { useModalStore } from "../stores/useModalStore"

const StoreIcon = () => {

    const { toggleModal, setStoreTab } = useModalStore()

    const handleStoreClick = () => {
        setStoreTab('seeds')
        toggleModal('store')
    }

    return (
        <button
            onClick={handleStoreClick}
            className="cursor-pointer"
        >
            <img
                src={storeIcon}
                alt="Store Icon"
                className="w-10"
            />
        </button>
    )
}

export default StoreIcon