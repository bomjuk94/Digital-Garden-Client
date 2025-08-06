import type { TabsProps } from '../types/props/TabsProps'
import { useModalStore } from '@/shared/stores/useModalStore'

const Tabs = ({ tabOptions }: TabsProps) => {

    const { activeStoreTab, setStoreTab } = useModalStore()

    return (
        <div className="flex gap-2 bg-[var(--bg-secondary)] p-2 rounded-lg border-2 border-[var(--border)]">
            {tabOptions.map((tab) => {
                const isActive = activeStoreTab === tab.value

                return (
                    <button
                        key={tab.value}
                        onClick={() => setStoreTab(tab.value)}
                        className={`
              flex items-center gap-1 px-3 py-1.5 rounded-md font-medium text-sm transition-colors
              border border-[var(--border)] cursor-pointer
              ${isActive
                                ? 'bg-[var(--accent-green)] text-[var(--bg-primary)] border-[var(--border-dialog)]'
                                : 'bg-[var(--bg-primary)] text-[var(--text-primary)] hover:bg-[var(--accent-mint)] hover:text-[var(--text-primary)]'}
            `}
                    >
                        {tab.icon && <span className="text-lg">{tab.icon}</span>}
                        <span>{tab.label}</span>
                    </button>
                )
            })}
        </div>
    )
}

export default Tabs
