import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useModalStore } from "@/shared/stores/useModalStore"
import { store } from "../../../shared/utils.ts/constantsTabOptions"
import { capitalizeName } from "@/shared/utils.ts/capitalizeName"
import { useHandleSeedBtnClick } from "../event-handlers/useHandleSeedBtnClick"
import { useHandleBuySupplyUpgrade } from "../event-handlers/useHandleBuySupplyUpgrade"
import { useHandleAddPlantToGarden } from "@/features/Greenhouse/event-handlers/useHandleAddPlantToGarden"
import { useHandleAddPlantToShop } from "@/features/Shop/event-handlers/useHandleAddPlantToShop"
import { useToolsStore } from "@/shared/stores/useToolsStore"
import { useHandleSupplyUse } from "../event-handlers/useHandleSupplyUse"
import { useGetInventory } from "@/shared/hooks/useGetInventory"
import { useInventoryActions } from "@/shared/hooks/inventory/useInventoryActions"
import { useGetSupplies } from "@/shared/hooks/supplies/useGetSupplies"
import { useSuppliesActions } from "@/shared/hooks/supplies/useSuppliesActions"
import { useUpgradeActions } from "@/shared/hooks/upgrades/useUpgradeActions"
import { usePlantActions } from "@/shared/hooks/plants/usePlantActions"
import { useGetUserProfile } from "@/shared/hooks/useGetUserProfile"
import { useProfileActions } from "@/shared/hooks/profile/useProfileActions"
import { useGetSeeds } from "@/shared/hooks/useGetSeeds"
import { useSeedActions } from "@/shared/hooks/seeds/useSeedActions"
import { seedIcons } from "@/features/Greenhouse/constants"
import { plantIcons } from "@/shared/utils.ts/constants"
import { useGardenActions } from "@/shared/hooks/garden/useGardenActions"
import { useShopActions } from "@/shared/hooks/shop/useShopActions"
import { useGetUpgrades } from "@/shared/hooks/upgrades/useGetUpgrades"

const TabContent = () => {
    const { activeStoreTab } = useModalStore()
    // Garden actions
    const { addToGarden } = useGardenActions()
    const { handleAddPlantToGarden } = useHandleAddPlantToGarden()
    // Shop actions
    const { addToShop } = useShopActions()
    const { handleAddPlantToShop } = useHandleAddPlantToShop()
    // Inventory and actions
    const { inventory } = useGetInventory()
    const {
        inventoryCount,
        maxInventorySpace,
        removeFromInventory,
        getMaxInventorySpace,
    } = useInventoryActions()
    // Profile and actions
    const { profile } = useGetUserProfile()
    const { setBalance } = useProfileActions()
    // Supplies and actions
    const { supplies } = useGetSupplies()
    const { addSupply, removeSupply } = useSuppliesActions()
    const { handleSupplyUse } = useHandleSupplyUse()
    // Upgrades and actions
    const { upgrades } = useGetUpgrades()
    const { addUpgrade } = useUpgradeActions()
    const { applyBuffToAllPlants } = usePlantActions()
    const { handleBuySupplyUpgrade } = useHandleBuySupplyUpgrade()
    // Seeds and actions
    const { seeds } = useGetSeeds()
    const { setSeedCount, unlockSeed } = useSeedActions()
    const { handleSeedBtnClick } = useHandleSeedBtnClick()

    const [activeIndex, setActiveIndex] = useState<number | null>(null)
    const location = useLocation()
    const { setCursorToTool } = useToolsStore()
    const { closeModal } = useModalStore()
    const isGardenPage = location.pathname === "/garden"
    const isShopPage = location.pathname === "/shop"

    useEffect(() => {
        getMaxInventorySpace()
    }, [getMaxInventorySpace])

    if (!inventory) return

    const sortedSeeds = [...seeds].sort((a, b) =>
        a.name.localeCompare(b.name)
    )

    return (
        <div className={`bg-[var(--bg-secondary)] ${activeStoreTab === "plants" ? 'pb-8 py-2' : 'py-2'} px-2 rounded-lg border-2 border-[var(--border)] relative`}>
            <ul className={`flex flex-col gap-5`}>
                {/* 🌱 Seeds */}
                {activeStoreTab === "seeds" &&
                    sortedSeeds.map((seed) => (
                        <li key={seed.name} className="flex flex-col gap-1.5 bg-[var(--bg-primary)] rounded-twenty py-3.5 px-2.5">
                            <img
                                src={seedIcons[seed.name]}
                                alt={seed.name}
                                className="w-thirty-five bg-[var(--accent-purple)] rounded-lg p-1 mb-3"
                            />
                            <p className="text-sm">
                                <strong>Name:</strong> {seed.label}
                            </p>
                            <p className="text-sm">
                                <strong>Description:</strong> {seed.description}
                            </p>
                            <ul className="text-sm flex items-center gap-1.5">
                                <p>
                                    <strong>Categories:</strong>
                                </p>
                                {seed.category.map((cat, i) => (
                                    <li key={i} className="text-sm">
                                        {capitalizeName(cat)}
                                        {i < seed.category.length - 1 && ","}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-sm">
                                <strong>Grow Time:</strong> {seed.growTime}
                            </p>
                            <p className="text-sm">
                                <strong>Phases:</strong> {seed.phases}
                            </p>
                            <p className="text-sm">
                                <strong>Max Watering Skips:</strong> {seed.maxWateringSkips}
                            </p>
                            <p className="text-sm">
                                <strong>Rarity:</strong> {seed.rarity}
                            </p>
                            <p className="text-sm">
                                <strong>Buy Price:</strong> ${seed.buyPrice}
                            </p>
                            <p className="text-sm">
                                <strong>Sell Price:</strong> ${seed.sellPrice}
                            </p>
                            {seed.locked && (
                                <p className="text-sm">
                                    <strong>Unlock Price:</strong> ${seed.unlockPrice}
                                </p>
                            )}

                            <div className="flex gap-1.5 mt-4">
                                {!seed.locked && profile && (
                                    <button
                                        onClick={() =>
                                            handleSeedBtnClick({
                                                seed,
                                                action: "buy",
                                                profile,
                                                setSeedCount,
                                                setBalance,
                                                unlockSeed,
                                            })
                                        }
                                        className="bg-[var(--accent-mint)] py-1.5 px-3.5 rounded-2xl text-sm font-bold cursor-pointer w-fit"
                                    >
                                        Buy
                                    </button>
                                )}
                                {seed.locked && profile && (
                                    <button
                                        onClick={() =>
                                            handleSeedBtnClick({
                                                seed,
                                                action: "unlock",
                                                profile,
                                                setSeedCount,
                                                setBalance,
                                                unlockSeed,
                                            })
                                        }
                                        className="bg-[var(--accent-purple)] py-1.5 px-3.5 rounded-2xl text-sm font-bold cursor-pointer w-fit"
                                    >
                                        Unlock
                                    </button>
                                )}
                            </div>
                        </li>
                    ))}

                {/* 🧪 Supplies*/}
                {(activeStoreTab === "suppliesStore" || activeStoreTab === "upgrades") &&
                    store[activeStoreTab].map((item) => (
                        <li key={item.name} className="flex flex-col gap-1.5 bg-[var(--bg-primary)] rounded-twenty py-3.5 px-2.5">
                            <img
                                src={item.icon}
                                alt={item.name}
                                className="w-thirty-five bg-[var(--accent-purple)] rounded-lg p-1 mb-3"
                            />
                            <p className="text-sm">
                                <strong>Name:</strong> {item.label}
                            </p>
                            <p className="text-sm">
                                <strong>Description:</strong> {item.description}
                            </p>
                            <p className="text-sm">
                                <strong>Price:</strong> ${item.price}
                            </p>
                            {"maxStacks" in item && typeof item.maxStacks === "number" && (
                                <p className="text-sm">
                                    <strong>Max Stacks:</strong> {item.maxStacks}
                                </p>
                            )}
                            {profile && (
                                <button
                                    onClick={() =>
                                        handleBuySupplyUpgrade({
                                            item,
                                            activeStoreTab,
                                            profile,
                                            addSupply,
                                            addUpgrade,
                                            setBalance,
                                            upgrades,
                                        })
                                    }
                                    className="bg-[var(--accent-mint)] py-1.5 px-3.5 rounded-2xl text-sm font-bold cursor-pointer w-fit"
                                >
                                    Buy
                                </button>
                            )}
                        </li>
                    ))}

                {/* 🌿 Plants (Inventory) */}
                {activeStoreTab === "plants" && (
                    Object.values(inventory).length > 0 ? (
                        Object.values(inventory).map((item) => {
                            const content = (
                                <div className="flex flex-col gap-1.5">
                                    <img
                                        src={plantIcons[item.name]}
                                        alt={item.label}
                                        className="w-thirty-five bg-[var(--accent-purple)] rounded-lg p-1 mb-3"
                                    />
                                    <p className="absolute top-0 right-1.5 bg-[var(--accent-yellow)] py-1 px-1.5 rounded-full text-ten">
                                        x{item.count}
                                    </p>

                                    <div className="flex flex-col items-start gap-1.5">
                                        <p className="text-md font-bold">{item.label}</p>
                                        <p className="text-md text-left">
                                            <strong>Description</strong>: {item.description}
                                        </p>
                                        <div className="flex gap-1.5">
                                            <p>
                                                <strong>Categories:</strong>
                                            </p>
                                            <ul className="flex gap-1">
                                                {
                                                    item.category.map((category, i) => (
                                                        <li key={i}>
                                                            {capitalizeName(category)}
                                                            {i < item.category.length - 1 && ','}
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>

                                        <p className="text-md">
                                            <strong>Rarity</strong>: {capitalizeName(item.rarity)}
                                        </p>

                                        <p className="text-md">
                                            <strong>Sell Price</strong>: {item.sellPrice}
                                        </p>
                                    </div>
                                </div>
                            )

                            return (
                                <li key={item.name} className="relative flex flex-col gap-1 group w-fit bg-[var(--bg-primary)] rounded-twenty py-3.5 px-2.5"
                                >
                                    <div className="flex flex-col gap-1 relative rounded-xl w-full">
                                        {content}
                                    </div>

                                    {isGardenPage && (
                                        <button
                                            onClick={() =>
                                                handleAddPlantToGarden({
                                                    item,
                                                    addToGarden,
                                                    removeFromInventory,
                                                    setActiveIndex,
                                                })
                                            }
                                            className="bg-[var(--text-muted)] text-white py-1.5 px-3.5 rounded-2xl text-sm font-bold cursor-pointer w-fit mt-4"
                                        >
                                            Plant
                                        </button>
                                    )}

                                    {isShopPage && (
                                        <button
                                            onClick={() =>
                                                handleAddPlantToShop({
                                                    item,
                                                    addToShop,
                                                    setActiveIndex,
                                                })
                                            }
                                            className="bg-[var(--text-muted)] text-white py-1.5 px-3.5 rounded-2xl text-sm font-bold cursor-pointer w-fit mt-4"
                                        >
                                            Sell
                                        </button>
                                    )}
                                </li>
                            )
                        })
                    ) : (
                        <p>No plants yet...</p>
                    )
                )}

                {/* 🧪 Supplies (Inventory) */}
                {activeStoreTab === "suppliesInventory" && (
                    supplies.length === 0 ? (
                        <p>No supplies yet...</p>
                    ) : (
                        supplies.map((supply) => (
                            <li
                                key={supply.name}
                                className="flex flex-col gap-1.5 bg-[var(--bg-primary)] rounded-twenty py-3.5 px-2.5">

                                <img
                                    src={supply.icon}
                                    alt={supply.name}
                                    className="w-thirty-five bg-[var(--accent-purple)] rounded-lg p-1 mb-3"
                                />

                                <p className="text-md font-bold">{supply.label}</p>

                                <p className="text-md">
                                    <strong>Description</strong>: {capitalizeName(supply.description)}
                                </p>
                                <p className="text-md">
                                    <strong>Duration</strong>: {supply.duration === 'singleUse' ? 'One time' : 'Temporary'}
                                </p>

                                <button
                                    onClick={(e) => handleSupplyUse({
                                        supply,
                                        e,
                                        setCursorToTool,
                                        closeModal,
                                        removeSupply,
                                        applyBuffToAllPlants,
                                    })}
                                    className="bg-[var(--accent-mint)] py-1.5 px-3.5 rounded-2xl text-sm font-bold cursor-pointer w-fit interactable"
                                >
                                    Use Supply
                                </button>
                            </li>
                        ))
                    )
                )}
            </ul>

            {activeStoreTab === "plants" && (
                <p className="absolute bottom-1 right-2 text-sm">
                    {`${inventoryCount}/${maxInventorySpace}`}
                </p>
            )}
        </div>
    )
}

export default TabContent
