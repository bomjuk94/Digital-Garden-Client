import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserModeType } from '../types'

type UserModeStore = {
    userMode: UserModeType,
    setUserMode: (val: UserModeType) => void,
}

export const useUserModeStore = create<UserModeStore>()(
    persist(
        (set, get) => ({
            userMode: null,
            setUserMode: (val) => set({ userMode: val }),
        }),
        {
            name: 'user-mode-storage',
            partialize: (state) => ({ userMode: state.userMode }),
        }
    )
)