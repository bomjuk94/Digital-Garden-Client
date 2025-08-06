import { create } from 'zustand'

type EffectSchedulerStore = {
    activeIntervals: Record<string, NodeJS.Timeout>
    registerInterval: (id: string, fn: () => void, delay: number) => void
    clearIntervalById: (id: string) => void
    clearAll: () => void
}

export const useEffectSchedulerStore = create<EffectSchedulerStore>(
    (set, get) => ({
        activeIntervals: {},

        registerInterval: (id, fn, delay) => {
            get().clearIntervalById(id)
            const interval = setInterval(fn, delay)
            set((state) => ({
                activeIntervals: {
                    ...state.activeIntervals,
                    [id]: interval,
                },
            }))
        },

        clearIntervalById: (id) => {
            const existing = get().activeIntervals[id]
            if (existing) {
                clearInterval(existing)
                set((state) => {
                    const updated = { ...state.activeIntervals }
                    delete updated[id]
                    return { activeIntervals: updated }
                })
            }
        },

        clearAll: () => {
            const { activeIntervals } = get()
            Object.values(activeIntervals).forEach(clearInterval)
            set({ activeIntervals: {} })
        },
    })
)