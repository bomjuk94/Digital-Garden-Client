import { useEffect } from "react"
import type { CheckTargetReadyProps } from "../types/props/CheckTargetReadyprops"

export const useCheckTargetReady = ({
    disableCutout,
    setHasTargetReady,
    targetId
}: CheckTargetReadyProps) => {
    useEffect(() => {
        if (disableCutout) return

        setHasTargetReady(false)
        let attempts = 0

        const checkReady = () => {
            const target = document.querySelector(
                `[data-tutorial-id="${targetId}"]`
            ) as HTMLElement

            if (target && target.offsetWidth > 0 && target.offsetHeight > 0) {
                setHasTargetReady(true)
            } else if (attempts < 10) {
                attempts++
                setTimeout(checkReady, 50)
            }
        }

        checkReady()
    }, [targetId, disableCutout, setHasTargetReady])
}