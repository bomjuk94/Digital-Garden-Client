import { useRef, useEffect } from "react"

export const useHorizontalScroll = () => {
    const elRef = useRef<HTMLUListElement>(null)

    useEffect(() => {
        const el = elRef.current
        if (!el) return

        // Drag-to-scroll
        let isDown = false
        let startX = 0
        let scrollLeft = 0

        const onMouseDown = (e: MouseEvent) => {
            isDown = true
            el.classList.add("cursor-grabbing")
            startX = e.pageX - el.offsetLeft
            scrollLeft = el.scrollLeft
        }

        const onMouseUp = () => {
            isDown = false
            el.classList.remove("cursor-grabbing")
        }

        const onMouseMove = (e: MouseEvent) => {
            if (!isDown) return
            e.preventDefault()
            const x = e.pageX - el.offsetLeft
            const walk = (x - startX) * 1.5
            el.scrollLeft = scrollLeft - walk
        }

        const onMouseLeave = () => {
            isDown = false
            el.classList.remove("cursor-grabbing")
        }

        // Smooth scroll for vertical-to-horizontal
        const onWheel = (e: WheelEvent) => {
            if (!el) return
            if (e.deltaY === 0) return
            e.preventDefault()
            el.scrollLeft += e.deltaY // no smooth here
        }

        el.addEventListener("mousedown", onMouseDown)
        el.addEventListener("mouseup", onMouseUp)
        el.addEventListener("mousemove", onMouseMove)
        el.addEventListener("mouseleave", onMouseLeave)
        el.addEventListener("wheel", onWheel, { passive: false })

        return () => {
            el.removeEventListener("mousedown", onMouseDown)
            el.removeEventListener("mouseup", onMouseUp)
            el.removeEventListener("mousemove", onMouseMove)
            el.removeEventListener("mouseleave", onMouseLeave)
            el.removeEventListener("wheel", onWheel)
        }
    }, [])

    return elRef
}
