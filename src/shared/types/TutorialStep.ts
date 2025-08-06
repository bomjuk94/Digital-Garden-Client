export type TutorialStep = {
    id: string
    label: string
    message: string
    targetId: string
    position: 'top' | 'right' | 'bottom' | 'left'
    nextTrigger: 'manual' | 'click' | 'auto' | 'custom'
    delayMs?: number
    customEventName?: string
    disableCutout?: boolean
}