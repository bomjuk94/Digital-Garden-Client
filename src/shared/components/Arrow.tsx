import type { ArrowProps } from "../types/props/ArrowProps"

const Arrow = ({ position }: ArrowProps) => {

    const baseClass = "absolute w-3 h-3 bg-[var(--bg-primary)] rotate-45"

    switch (position) {
        case "top":
            return <div className={`${baseClass} bottom-[-6px] left-1/2 -translate-x-1/2`} />
        case "bottom":
            return <div className={`${baseClass} top-[-6px] left-1/2 -translate-x-1/2`} />
        case "left":
            return <div className={`${baseClass} right-[-6px] top-1/2 -translate-y-1/2`} />
        case "right":
            return <div className={`${baseClass} left-[-6px] top-1/2 -translate-y-1/2`} />
        default:
            return null
    }
}

export default Arrow