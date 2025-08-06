import { receipt } from "@/assets/overlay"
import { useModalStore } from "../stores/useModalStore"

const ReceiptIcon = () => {

    const { toggleModal } = useModalStore()

    const handleReceiptClick = () => {
        toggleModal('receipt')
    }

    return (
        <button
            onClick={handleReceiptClick}
            className="cursor-pointer"
        >
            <img
                src={receipt}
                alt="Receipt Icon"
                className="w-10"
            />
        </button>
    )
}

export default ReceiptIcon