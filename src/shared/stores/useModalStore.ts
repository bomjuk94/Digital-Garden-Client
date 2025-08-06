import { create } from 'zustand'
import type { ModalType } from '../types/models/Modal'
import type { StoreTabType } from '../types/models/Modal'

type ModalStore = {
    activeModal: ModalType
    toggleModal: (modal: ModalType) => void
    closeModal: () => void
    activeStoreTab: StoreTabType
    setStoreTab: (tab: StoreTabType) => void
}

export const useModalStore = create<ModalStore>((set) => ({
    activeModal: null,
    toggleModal: (modal: ModalType) =>
        set((state) => ({
            activeModal: state.activeModal === modal ? null : modal,
        })),
    closeModal: () => set({ activeModal: null }),
    activeStoreTab: 'seeds',
    setStoreTab: (tab) => set({ activeStoreTab: tab })
}))