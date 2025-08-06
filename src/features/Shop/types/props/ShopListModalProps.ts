import type { ModalType, plantMapType } from "@/shared/types"

export interface ShopListModalProps {
    onClose: (modal: ModalType) => void
    activeModal: ModalType
    shop: plantMapType
}