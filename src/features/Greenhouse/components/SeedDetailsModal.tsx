import type { SeedDetailsModalProps } from "../types"
import { capitalizeName } from "@/shared/utils.ts/capitalizeName"
import { seedIcons } from "../constants"

const SeedDetailsModal = ({ seed, onSeedDetailsClose }: SeedDetailsModalProps) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <div className="bg-[var(--bg-primary)] border border-[var(--border)] rounded-2xl shadow-lg p-6 space-y-4 max-w-sm w-[90%] text-center relative">
                <div className="flex flex-col items-center text-[var(--text-primary)] space-y-3 text-sm leading-relaxed">
                    <img
                        src={seedIcons[seed.name]}
                        alt={seed?.label}
                        className="w-thirty"
                    />
                    <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
                        {seed?.label}
                    </h2>

                    <ul className="flex flex-col items-start gap-1.5 text-left w-full">
                        <li>
                            <p>
                                <strong>Description: </strong> {seed?.description}
                            </p>
                        </li>
                        <li className="flex gap-1">
                            <p>
                                <strong>Categories:</strong>
                            </p>
                            <ul className="flex gap-1">
                                {seed?.category.map((category, i) => (
                                    <li key={i}>
                                        {capitalizeName(category)}
                                        {i < seed.category.length - 1 && ','}
                                    </li>
                                ))}
                            </ul>
                        </li>
                        <li>
                            <p>
                                <strong>Grow Time: </strong> {seed?.growTime} hours
                            </p>
                        </li>
                        <li>
                            <p>
                                <strong>Phases: </strong> {seed?.phases}
                            </p>
                        </li>
                        <li>
                            <p>
                                <strong>Max Watering Skips: </strong> {seed?.maxWateringSkips}
                            </p>
                        </li>
                        <li>
                            <p>
                                <strong>Rarity: </strong> {capitalizeName(seed?.rarity)}
                            </p>
                        </li>
                        <li>
                            <p>
                                <strong>Sell Price: </strong> ${seed?.sellPrice}
                            </p>
                        </li>
                        <li>
                            <p>
                                <strong>Buy Price: </strong> ${seed?.buyPrice}
                            </p>
                        </li>
                    </ul>
                </div>
                <button
                    onClick={onSeedDetailsClose}
                    className="absolute top-2 right-2.5 text-2xl cursor-pointer"
                >
                    X
                </button>
            </div>
        </div>
    )
}

export default SeedDetailsModal