import { useConfirmationStore } from '@/shared/stores/useConfirmationStore'

const ConfirmModal = () => {
    const { isOpen, message, confirm, cancel } = useConfirmationStore()

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <div className="bg-[var(--bg-primary)] border border-[var(--border)] rounded-2xl shadow-lg p-6 space-y-4 max-w-sm w-[90%] text-center">
                <p className="text-[var(--text-primary)] text-sm leading-relaxed">
                    {message}
                </p>
                <div className="flex justify-center gap-4 pt-2">
                    <button
                        onClick={cancel}
                        className="px-4 py-1.5 rounded-xl text-sm bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)] hover:brightness-105 transition cursor-pointer"
                    >
                        No
                    </button>
                    <button
                        onClick={confirm}
                        className="px-4 py-1.5 rounded-xl text-sm bg-[var(--accent-green)] text-white hover:brightness-110 transition shadow cursor-pointer"
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal
