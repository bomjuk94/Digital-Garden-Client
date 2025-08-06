import { instructionsIcon } from "@/assets/overlay"
import { useModalStore } from "../stores/useModalStore"

const InstructionsIcon = () => {

    const { toggleModal } = useModalStore()

    const handleShopInstructionsClick = () => {
        toggleModal('instructions')
    }

    return (
        <button
            onClick={handleShopInstructionsClick}
            className='w-10 cursor-pointer'
        >
            <img src={instructionsIcon} alt="Instructions Icon" />
        </button>
    )
}

export default InstructionsIcon