import type { ModalType } from "../models"

export interface InstructionsIconProps {
    toggleInstructions: (modal: ModalType) => void
    activeModal: ModalType
}