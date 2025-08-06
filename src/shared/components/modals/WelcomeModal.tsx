import type { WelcomeModalProps } from "@/shared/types/props/WelcomeModalProps"

const WelcomeModal = ({ onClose }: WelcomeModalProps) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <div className="bg-[var(--bg-primary)] border border-[var(--border)] rounded-2xl shadow-lg p-6 space-y-4 max-w-sm w-[90%] text-center">
                <div className="text-[var(--text-primary)] space-y-3 text-sm leading-relaxed">
                    <h2 className="text-base font-semibold text-[var(--text-primary)]">
                        Welcome to Your Digital Garden!
                    </h2>
                    <p>
                        Before you get started, take a moment to open the <strong>Instructions</strong> panel.
                        It will show you how to plant, water, and harvest your crops.
                    </p>
                    <p>Once you're ready, grab your tools and start growing! 🌱</p>
                </div>
                <div className="pt-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-1.5 rounded-xl text-sm bg-[var(--accent-green)] text-white hover:brightness-110 transition shadow cursor-pointer"
                    >
                        Let’s Go!
                    </button>
                </div>
            </div>
        </div>
    )
}

export default WelcomeModal
