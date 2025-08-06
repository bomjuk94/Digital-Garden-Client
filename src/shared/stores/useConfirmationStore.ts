import { create } from 'zustand'

type ConfirmationStateStore = {
    isOpen: boolean
    message: string
    resolve: ((confirmed: boolean) => void) | null
    ask: (message: string) => Promise<boolean>
    confirm: () => void
    cancel: () => void
}

export const useConfirmationStore = create<ConfirmationStateStore>((set, get) => ({
    isOpen: false,
    message: '',
    resolve: null,

    ask: (message) => {
        return new Promise((resolve) => {
            set({ isOpen: true, message, resolve })
        })
    },

    confirm: () => {
        const { resolve } = get()
        resolve?.(true)
        set({ isOpen: false, resolve: null })
    },

    cancel: () => {
        const { resolve } = get()
        resolve?.(false)
        set({ isOpen: false, resolve: null })
    },
}))
