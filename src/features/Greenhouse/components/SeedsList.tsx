import ToolTip from "@/shared/components/ToolTip"
import type { Seed, SeedListProps } from "../types/types"
import { useHandleSeedClick } from "../event-handlers/useHandleSeedClick"
import { useHandleAddPlant } from "../event-handlers/useHandleAddPlant"
import { useModalStore } from "@/shared/stores/useModalStore"
import { seedIcons } from "../constants"
import { useHandleSeedDetails } from "@/shared/hooks/seeds/useHandleSeedDetails"

const SeedsList = ({ seeds }: SeedListProps) => {

    const { activeIndex, handleSeedClick, setActiveIndex } = useHandleSeedClick()
    const { handleAddPlant } = useHandleAddPlant()
    const { closeModal } = useModalStore()
    const {
        setShowSeedDetails,
        setSeedDetails
    } = useHandleSeedDetails()

    const handleCloseSeedsList = () => {
        closeModal()
    }

    const handleSeedDetails = (seed: Seed) => {
        setSeedDetails(seed)
        setShowSeedDetails(true)
        setActiveIndex(null)
    }

    const sortedSeeds = [...seeds].sort((a, b) =>
        a.name.localeCompare(b.name)
    )

    return (
        <div
            data-tutorial-id="greenhouse-seedbag"
            className="
            absolute top-2.5 bottom-2.5 right-2.5 w-one-hundred bg-[var(--border)] border-4 border-[var(--accent-green)]
            flex flex-col items-center rounded-twenty py-2.5 z-50
            ">

            <h3 className="text-2xl font-bold">
                Seeds
            </h3>
            <ul
                className="flex flex-col items-center gap-8 py-6 px-2.5 overflow-y-scroll overflow-x-hidden hide-scrollbar">
                {
                    sortedSeeds.map((seed, i) => (
                        <li
                            key={seed.name}
                            className='relative flex flex-col flex-nowrap gap-1 items-center flex-shrink-0 group w-full'
                        >
                            <button
                                onClick={() => handleSeedClick(seed, i)}
                                className={`flex flex-col gap-1 items-center relative bg-[var(--bg-secondary)] px-2.5 py-1.5 rounded-xl w-full ${!seed.count ? 'cursor-default opacity-60' : 'cursor-pointer'}`}>
                                <img
                                    src={seedIcons[seed.name]}
                                    alt={seed.label}
                                    className="w-7"
                                />
                                <ToolTip label={seed.label} />
                                <p className="text-xs">
                                    {seed.name}
                                </p>
                                <div className="flex gap-0.5 absolute -top-5 -right-1.5 bg-[var(--accent-yellow)] py-1.5 px-2 rounded-full">
                                    <p
                                        className="text-ten"
                                        title={`Price: $${seed.sellPrice} | Stock: ${seed.count}`}
                                    >
                                        ${seed.buyPrice} | x{seed.count}
                                    </p>
                                </div>
                            </button>
                            {
                                (activeIndex === i) &&
                                <div className="flex flex-col gap-1">
                                    <button
                                        onClick={() => handleAddPlant(seed, setActiveIndex)}
                                        className="absolute top-1/2 left-0 right-0 transform -translate-y-hundred-fifteen-percent cursor-pointer
                                    bg-[var(--text-muted)] text-thirteen text-white py-0.5 px-1 rounded-lg"
                                    >
                                        Plant Seed
                                    </button>
                                    <button
                                        onClick={() => handleSeedDetails(seed)}
                                        className="absolute top-1/2 left-0 right-0 tr cursor-pointer
                                    bg-[var(--text-muted)] text-thirteen text-white py-0.5 px-1 rounded-lg"
                                    >
                                        Details
                                    </button>
                                </div>
                            }

                            {
                                // Seed count is 0 and seedLocked is false
                                (seed.locked) ?
                                    <p className="absolute top-1/2 left-1/2 transform -translate-1/2 bg-[var(--accent-purple)] py-0.5 px-1 rounded-lg text-xs w-max">
                                        Locked
                                    </p>
                                    :
                                    (!seed.locked && !seed.count) ?
                                        <p className="absolute top-1/2 left-1/2 transform -translate-1/2 bg-[var(--soil)] py-0.5 px-1 rounded-lg text-xs w-max">
                                            No Stock
                                        </p>
                                        :
                                        ''
                            }
                        </li>
                    ))
                }
            </ul>
            <button
                onClick={handleCloseSeedsList}
                className="
                absolute top-0.5 right-2
                cursor-pointer
                "
            >
                X
            </button>
        </div>
    )
}

export default SeedsList