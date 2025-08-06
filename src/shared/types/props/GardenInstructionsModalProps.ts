import type { ModalType } from "../models"

export interface GardenInstructionsModalProps {
    onClose: (modal: ModalType) => void
    activeModal: ModalType
}