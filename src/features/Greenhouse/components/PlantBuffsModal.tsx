import { usePlantActions } from "@/shared/hooks/plants/usePlantActions"
import { useModalStore } from "@/shared/stores/useModalStore"

const PlantBuffsModal = () => {
    const { closeModal } = useModalStore()
    const { buffs, resetPlantBuffs } = usePlantActions()

    const handleClosePlantBuffsModal = () => {
        closeModal()
        resetPlantBuffs()
    }

    if (!buffs) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <div className="bg-[var(--bg-primary)] border border-[var(--border)] rounded-2xl shadow-lg p-6 space-y-4 max-w-sm w-[90%] text-center relative">
                <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
                    Active Buffs
                </h2>

                <ul className="flex flex-col items-center text-[var(--text-primary)] space-y-3 text-sm leading-relaxed bg-[var(--bg-secondary)] py-2 px-2 rounded-lg border-2 border-[var(--border)] relative overflow-y-auto max-h-[70vh] hide-scrollbar">
                    {buffs.map((buff) => (
                        <li
                            key={buff.effect.label}
                            className="flex flex-col gap-1.5 bg-[var(--bg-primary)] rounded-twenty py-3.5 px-2.5 w-full"
                        >
                            <img
                                src={buff.effect.icon}
                                alt={buff.effect.label}
                                className="w-thirty mb-3"
                            />

                            <ul className="flex flex-col items-start gap-1.5 text-left w-full">
                                <li>
                                    <p>
                                        <strong>Name: </strong> {buff.effect.label}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>Description: </strong> {buff.effect.description}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>Duration: </strong>{" "}
                                        {buff.effect.duration === "singleUse"
                                            ? "One-time use"
                                            : "Temporary"}
                                    </p>
                                </li>
                            </ul>
                        </li>
                    ))}
                </ul>

                <button
                    onClick={handleClosePlantBuffsModal}
                    className="absolute top-2 right-2.5 text-2xl cursor-pointer"
                >
                    X
                </button>
            </div>
        </div>
    )
}

export default PlantBuffsModal
