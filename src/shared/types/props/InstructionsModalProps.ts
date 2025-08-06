import type { ModalType } from "../models"

export interface InstructionsModalProps {
    onClose: (modal: ModalType) => void
    activeModal: ModalType
}