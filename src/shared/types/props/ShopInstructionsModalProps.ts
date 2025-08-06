import type { ModalType } from "../models"

export interface ShopInstructionsModalProps {
    onClose: (modal: ModalType) => void
    activeModal: ModalType
}