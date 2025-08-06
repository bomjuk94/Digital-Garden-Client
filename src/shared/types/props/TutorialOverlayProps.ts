export interface TutorialOverlayProps {
    message: string
    targetId: string
    onNext: () => void
    position?: "top" | "bottom" | "left" | "right"
    disableCutout?: boolean
}
