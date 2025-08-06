import { useEffect, useState, useRef } from "react"
import type { TutorialPositionProps } from "../types/props/TutorialPositionProps"

export const useTutorialPosition = ({
    hasTargetReady,
    disableCutout,
    targetId,
    modalRef,
    position,
}: TutorialPositionProps) => {

    const [coords, setCoords] = useState({ top: 0, left: 0 })
    const [targetRect, setTargetRect] = useState<DOMRect | null>(null)
    const containerRef = useRef<HTMLElement | null>(null)

    useEffect(() => {
        if (!hasTargetReady || disableCutout) return

        const raf = requestAnimationFrame(() => {
            const target = document.querySelector(
                `[data-tutorial-id="${targetId}"]`
            ) as HTMLElement
            const modal = modalRef.current
            if (!target || !modal) return

            const container = target.offsetParent as HTMLElement
            containerRef.current = container

            const modalHeight = modal.offsetHeight
            const modalWidth = modal.offsetWidth

            const targetRect = target.getBoundingClientRect()
            const containerRect = container.getBoundingClientRect()

            const relativeTop = targetRect.top - containerRect.top
            const relativeLeft = targetRect.left - containerRect.left

            let top = 0
            let left = 0

            switch (position) {
                case "top":
                    top = relativeTop - modalHeight - 12
                    left = relativeLeft + target.offsetWidth / 2
                    break
                case "bottom":
                    top = relativeTop + target.offsetHeight + 12
                    left = relativeLeft + target.offsetWidth / 2
                    break
                case "left":
                    top = relativeTop + target.offsetHeight / 2 - modalHeight / 2
                    left = relativeLeft - modalWidth - 12
                    break
                case "right":
                    top = relativeTop + target.offsetHeight / 2 - modalHeight / 2
                    left = relativeLeft + target.offsetWidth + 12
                    break
            }

            setCoords({ top, left })
            setTargetRect(targetRect)
        })

        return () => cancelAnimationFrame(raf)
    }, [hasTargetReady, targetId, disableCutout, modalRef, position])

    return {
        coords, targetRect, containerRef
    }
}