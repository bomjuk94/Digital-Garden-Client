import type { InstructionsModalProps } from "@/shared/types/props/InstructionsModalProps"

const InstructionsModal = ({ onClose, activeModal }: InstructionsModalProps) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <div className="bg-[var(--bg-primary)] border border-[var(--border)] rounded-2xl shadow-lg p-6 max-w-lg w-[90%] space-y-4 text-[var(--text-primary)] text-sm leading-relaxed overflow-y-auto max-h-[90vh] hide-scrollbar relative">
                <h2 className="text-base font-semibold text-center">📘 Greenhouse Instructions</h2>

                <div className="space-y-4 text-left">
                    <div>
                        <p className="font-medium">🌱 Planting a Seed</p>
                        <p><strong>Toolbelt Overview:</strong> At the bottom of the screen, you'll find your toolbelt. It contains all the tools you’ll need to plant, water, harvest, and manage your plants.</p>
                        <p><strong>Seed Bag:</strong> Click on the seed bag icon to open your available seeds.</p>
                        <p><strong>Choose a Seed:</strong> After opening the seed bag, click on a seed to preview it, then click <em>"Plant Seed"</em> to place it on your greenhouse desk.</p>
                        <p><strong>Greenhouse Desk:</strong> Your planted seed will appear on the desk in the middle of the screen. This is where it will grow through each phase of its life cycle.</p>
                    </div>

                    <div>
                        <p className="font-medium">💧 Watering & Growth</p>
                        <p>A water droplet icon will appear when a plant needs to be watered.</p>
                        <p>If you don’t water it, the plant will stop growing and may die if skipped twice in a row during the same phase.</p>
                        <p>Plants must be watered consistently to progress through their growth stages.</p>
                    </div>

                    <div>
                        <p className="font-medium">⏱️ Growth Timer</p>
                        <p>Click on a plant to view its remaining time until the next phase.</p>
                        <p>Use this to plan your watering and harvesting times.</p>
                    </div>

                    <div>
                        <p className="font-medium">✂️ Harvesting Plants</p>
                        <p>When a plant is fully grown, you'll see a harvest notification.</p>
                        <p>Select the garden shears tool from the toolbelt.</p>
                        <p>Click on the plant to harvest it.</p>
                        <p>If a plant dies, you can also use the shears to discard it.</p>
                    </div>

                    <div>
                        <p className="font-medium">🎒 Viewing Your Harvested Plants</p>
                        <p>After harvesting, scroll through your toolbelt and click the inventory bag.</p>
                        <p>The inventory stores all harvested plants and shows what you've collected so far.</p>
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

export default InstructionsModal
