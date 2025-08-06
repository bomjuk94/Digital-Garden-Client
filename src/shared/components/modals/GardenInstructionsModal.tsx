import type { GardenInstructionsModalProps } from "@/shared/types/props/GardenInstructionsModalProps"

const GardenInstructionsModal = ({ onClose, activeModal }: GardenInstructionsModalProps) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <div className="bg-[var(--bg-primary)] border border-[var(--border)] rounded-2xl shadow-lg p-6 max-w-lg w-[90%] space-y-4 text-[var(--text-primary)] text-sm leading-relaxed overflow-y-auto max-h-[90vh] hide-scrollbar relative">
                <h2 className="text-base font-semibold text-center">📘 Garden Instructions</h2>

                <div className="space-y-4 text-left">
                    <div>
                        <p className="font-medium">🌿 What is the Garden?</p>
                        <p>The garden is a peaceful space to store harvested plants that you’re not ready to sell or discard just yet.</p>
                        <p>It acts as a long-term holding area, separate from your inventory, which has limited space.</p>
                        <p>Use the garden to admire your favorite plants, keep track of your harvest history, and plan your next moves.</p>
                    </div>

                    <div>
                        <p className="font-medium">📦 When to Use the Garden</p>
                        <p>Your inventory can hold a limited amount of plants. Once it’s full, additional harvested plants will need to be moved into the garden to avoid losing them.</p>
                        <p>The garden supports pagination, allowing you to store many plants without clutter.</p>
                        <p>It’s the perfect place to keep special or rare plants you want to revisit later.</p>
                    </div>

                    <div>
                        <p className="font-medium">🔍 Garden Actions</p>
                        <p>Each plant in the garden offers three actions:</p>
                        <ul className="list-disc list-inside pl-2">
                            <li><strong>Harvest:</strong> Move the plant into your inventory if there’s space available.</li>
                            <li><strong>Learn More:</strong> View detailed stats about the plant — including how it was grown, how many waterings were missed, and more.</li>
                            <li><strong>Discard:</strong> Permanently remove the plant from your garden.</li>
                        </ul>
                        <p>These options give you full control over how you manage and reflect on your garden collection.</p>
                    </div>

                    <div>
                        <p className="font-medium">📚 Why the Garden Matters</p>
                        <p>The garden is more than storage — it’s a reflection of your growth as a gardener. Some users treat it like a collection book or a quiet archive of their best plants.</p>
                        <p>Future upgrades may allow you to expand your garden, showcase rare plants, or unlock garden-based bonuses.</p>
                    </div>
                </div>

                <div className="text-center pt-2">
                    <button
                        onClick={() => onClose(activeModal)}
                        className="px-4 py-1.5 rounded-xl text-sm bg-[var(--accent-green)] text-white hover:brightness-110 transition shadow cursor-pointer"
                    >
                        Got it!
                    </button>
                </div>

                <button
                    onClick={() => onClose(activeModal)}
                    className="absolute top-2 right-2.5 text-2xl cursor-pointer"
                >
                    X
                </button>
            </div>
        </div>
    )
}

export default GardenInstructionsModal
