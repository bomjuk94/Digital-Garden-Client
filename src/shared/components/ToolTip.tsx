
const ToolTip = ({ label }: { label: string | undefined }) => {
    return (
        <p
            className="
            absolute -top-6 left-1/2 transform -translate-x-1/2
        bg-[var(--accent-green)] text-xs text-white
        px-2 py-1 rounded-md
        opacity-0 scale-95 transition-all duration-150
        group-hover:opacity-100 group-hover:scale-100
        pointer-events-none
        whitespace-nowrap
        z-10
            "
        >
            {label}
        </p>
    )
}

export default ToolTip