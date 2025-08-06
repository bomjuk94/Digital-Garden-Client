import type { ToolBeltProps } from "../types"
import { useHorizontalScroll } from "../hooks/useHorizontalScroll"
import ToolTip from "./ToolTip"
import { useToolsStore } from "../stores/useToolsStore"
import { useModalStore } from "../stores/useModalStore"
import { useToolBelt } from "../hooks/useToolBelt"


const ToolBelt = ({ toolbeltActions }: ToolBeltProps) => {

    const scrollRef = useHorizontalScroll()
    const { setCursorToTool, setCursorToToolState } = useToolsStore()
    const { toggleModal } = useModalStore()
    const { handleToolBeltClick } = useToolBelt()

    return (
        <ul
            ref={scrollRef}
            data-tutorial-id="greenhouse-toolbelt"
            className='flex items-center gap-2.5 w-3xs absolute top-seventy-seven-percent left-1/2 bottom-1.5 rounded-twenty bg-[var(--border)] transform -translate-x-fifty-percent overflow-x-auto overflow-y-hidden whitespace-nowrap p-1.5 border-4 border-[var(--accent-green)] hide-scrollbar z-50'
        >
            {
                toolbeltActions.map((tool) => (
                    <li
                        key={tool.name}
                        data-tutorial-id={`greenhouse-${tool.name}`}
                        className="flex flex-col flex-nowrap gap-1 items-center flex-shrink-0 group"
                    >
                        <button
                            onClick={() => handleToolBeltClick({
                                name: tool.name,
                                toggleModal,
                                setCursorToTool,
                                setCursorToToolState,
                            })}
                            className="flex flex-col gap-1 cursor-pointer relative interactable"
                        >
                            <img
                                src={tool.icon}
                                alt={tool.label}
                                className="w-20 pointer-events-none"
                            />
                            <ToolTip label={tool.label} />
                        </button>
                    </li>
                ))
            }
        </ul>
    )
}

export default ToolBelt