import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { RefObject } from "react"
import type { TutorialStep } from "../types/TutorialStep"
import { tutorialSteps } from "../utils.ts/constants"

type TutorialStore = {
    tutorialSteps: TutorialStep[]
    tutorialStepsHydrated: boolean
    tutorialIndex: number
    incrementTutorialIndex: () => void
    setTutorialIndex: (val: number) => void
    resetTutorialIndex: () => void
    tutorialContainerRef: RefObject<HTMLElement> | null
    setTutorialContainerRef: (ref: RefObject<HTMLElement>) => void
}

let setFn: ((state: Partial<TutorialStore>) => void) | null = null

export const useTutorialStore = create<TutorialStore>()(
    persist(
        (set, get) => {
            setFn = set
            return {
                tutorialSteps: tutorialSteps,
                tutorialStepsHydrated: false,
                tutorialIndex: 0,
                incrementTutorialIndex: () =>
                    set((state) => ({ tutorialIndex: state.tutorialIndex + 1 })),
                setTutorialIndex: (val: number) =>
                    set({ tutorialIndex: val }),
                resetTutorialIndex: () =>
                    set({ tutorialIndex: 0 }),
                tutorialContainerRef: null,
                setTutorialContainerRef: (ref) => set({ tutorialContainerRef: ref }),
            }
        },
        {
            name: "tutorial-store",
            partialize: (state) => ({
                tutorialSteps: state.tutorialSteps,
                tutorialIndex: state.tutorialIndex,
            }),
            onRehydrateStorage: () => {
                return () => {
                    if (setFn) {
                        setFn({ tutorialStepsHydrated: true })
                    }
                }
            },
        }
    )
)
