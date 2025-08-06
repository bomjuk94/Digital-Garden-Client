
export interface TutorialPositionProps {
    hasTargetReady: boolean
    disableCutout: boolean
    targetId: string
    modalRef: React.RefObject<HTMLDivElement | null>
    position: "top" | "bottom" | "left" | "right"
}