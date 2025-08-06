import type { ToolBeltNameTypes } from "../ToolBeltNameTypes"
import type { ModalType } from "../models"
import type { StoreSupply } from "@/features/Store/types"

export interface HandleToolBeltClickProps {
    name: ToolBeltNameTypes
    toggleModal: (modal: ModalType) => void
    setCursorToTool: (name: string, effect?: StoreSupply) => void
    setCursorToToolState: (val: boolean) => void
}