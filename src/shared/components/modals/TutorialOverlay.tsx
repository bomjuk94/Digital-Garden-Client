import { useRef, useState } from "react"
import type { TutorialOverlayProps } from "@/shared/types/props/TutorialOverlayProps"
import { useCheckTargetReady } from "@/shared/hooks/useCheckTargetReady"
import { useTutorialPosition } from "@/shared/hooks/useTutorialPosition"
import { useKeyPress } from "@/shared/hooks/useKeyPress"
import Arrow from "../Arrow"

export const TutorialOverlay = ({
    message,
    targetId,
    onNext,
    position = "bottom",
    disableCutout = false,
}: TutorialOverlayProps) => {
    const modalRef = useRef<HTMLDivElement>(null)
    const [hasTargetReady, setHasTargetReady] = useState(false)

    useCheckTargetReady({
        disableCutout,
        setHasTargetReady,
        targetId
    })

    const { coords, targetRect, containerRef } = useTutorialPosition({
        hasTargetReady,
        disableCutout,
        targetId,
        modalRef,
        position,
    })

    useKeyPress({ func: onNext })

    if (!hasTargetReady && !disableCutout) return null

    return (
        <>
            {/* 🔲 Cutout Backdrop */}
            {disableCutout ? (
                <div className="absolute inset-0 z-40 pointer-events-none bg-black opacity-50 rounded-twenty" />
            ) : (
                targetRect &&
                containerRef.current && (
                    <svg
                        className="absolute inset-0 z-40 pointer-events-none rounded-twenty"
                        width={containerRef.current.offsetWidth}
                        height={containerRef.current.offsetHeight}
                    >
                        <defs>
                            <mask id="hole-mask">
                                <rect width="100%" height="100%" fill="white" />
                                <rect
                                    x={
                                        targetRect.left -
                                        containerRef.current.getBoundingClientRect().left
                                    }
                                    y={
                                        targetRect.top -
                                        containerRef.current.getBoundingClientRect().top
                                    }
                                    width={targetRect.width}
                                    height={targetRect.height}
                                    fill="black"
                                    rx={12}
                                />
                            </mask>
                        </defs>
                        <rect
                            width="100%"
                            height="100%"
                            fill="black"
                            fillOpacity="0.5"
                            mask="url(#hole-mask)"
                        />
                    </svg>
                )
            )}

            {/* 🧾 Modal */}
            <div
                ref={modalRef}
                className={`absolute z-50 px-4 py-3 rounded-xl shadow-xl bg-[var(--bg-primary)] text-[var(--text-primary)] max-w-xs w-full transition-opacity duration-300 opacity-0 animate-fadeIn ${disableCutout
                    ? "left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    : ""
                    }`}
                style={
                    disableCutout
                        ? undefined
                        : {
                            top: coords.top,
                            left: coords.left,
                            transform:
                                position === "top" || position === "bottom"
                                    ? "translateX(-50%)"
                                    : "none",
                        }
                }
            >
                <p className="text-sm mb-3">{message}</p>
                <div className="text-right">
                    <button
                        onClick={onNext}
                        className="px-3 py-1 rounded bg-[var(--accent-green)] text-white text-sm cursor-pointer"
                    >
                        Got It!
                    </button>
                </div>
                <Arrow position={position} />
            </div>
        </>
    )
}
