import type { StoreType } from "../../features/Store/types"
import { seeds } from "../../features/Greenhouse/constants"
import { SupplyEffectType, SupplyDurationType, UpgradeEffectType } from "../../features/Store/types"
import {
    premiumSoil,
    fertilizerBag,
    growthTonic,
    wormTea
} from "@/assets/store"
import {
    compostBinIcon,
    gardenPlotIcon,
    gardenShelfIcon,
    signpostIcon,
    inventoryIcon,
} from '@/assets/store/upgrades'
import type { TabOptionsType } from "../types/tabOptions"

export const store: StoreType = {
    seeds: seeds.map(({ count: _count, ...rest }) => rest),
    suppliesStore: [
        {
            id: '',
            name: 'premiumSoil',
            label: 'Premium Soil',
            icon: premiumSoil,
            description: 'Doubles the harvest yield of your chosen plant.',
            price: 10,
            effect: SupplyEffectType.BoostYield,
            multiplier: 2,
            duration: SupplyDurationType.SingleUse,
        },
        {
            id: '',
            name: 'fertilizerBag',
            label: 'Fertilizer Bag',
            icon: fertilizerBag,
            description: 'Doubles the harvest yield for all your current plants for 10 minutes',
            price: 10,
            effect: SupplyEffectType.BoostYieldTimed,
            multiplier: 2,
            time: 10,
            duration: SupplyDurationType.Temporary,
        },
        {
            id: '',
            name: 'growthTonic',
            label: 'Growth Tonic',
            icon: growthTonic,
            description: 'Speeds up growth of one plant by 50%.',
            price: 10,
            effect: SupplyEffectType.BoostGrowth,
            multiplier: .5,
            duration: SupplyDurationType.SingleUse,
        },
        {
            id: '',
            name: 'wormTea',
            label: 'Worm Tea',
            icon: wormTea,
            description: 'Boosts growth rate of all plants by 20% for 10 minutes.',
            price: 10,
            effect: SupplyEffectType.BoostGrowthTimed,
            multiplier: .2, // Value to subtract by
            time: 10,
            duration: SupplyDurationType.Temporary,
        },
    ],
    upgrades: [
        {
            id: '',
            name: 'inventoryExpansion',
            label: 'Inventory Expansion',
            icon: inventoryIcon,
            description: 'Adds 2 additional slots to your inventory, allowing more plants to be stored at once.',
            effect: UpgradeEffectType.IncreaseInventory,
            multiplier: 2,
            duration: 'permanent',
            price: 10,
        },
        {
            id: '',
            name: 'soilExpansion',
            label: 'Soil Expansion',
            icon: gardenPlotIcon,
            description: 'Adds 2 extra planting pots to your green house, allowing more plants to grow at once.',
            effect: UpgradeEffectType.IncreasePots,
            multiplier: 2,
            duration: 'permanent',
            price: 10,
        },
        // TODO: Future integration
        // {
        //     name: 'autoWatering',
        //     label: 'Auto-Watering System',
        //     icon: wateringCanIcon,
        //     description: 'Automatically waters one random plant every few minutes.',
        //     effect: UpgradeEffectType.AutomateWatering,
        //     multiplier: 1, // could represent 1 plant watered every cycle
        //     duration: 'permanent',
        //     price: 10,
        // },
        // {
        //     name: 'moistureRetainerSoil',
        //     label: 'Moisture Retainer Soil',
        //     icon: gardeningSoilIcon,
        //     description: 'Reduces the number of times plants need to be watered during its growth cycle by one cycle.',
        //     effect: UpgradeEffectType.AutomateWatering,
        //     multiplier: 1, // could mean +1 day to watering threshold
        //     duration: 'permanent',
        //     price: 10,
        // },
        {
            id: '',
            name: 'storageShelfExpansion',
            label: 'Storage Shelf Expansion',
            icon: gardenShelfIcon,
            description: "Add 2 additional slots to the shop's storage to allow more harvested plants to be listed at once.",
            effect: UpgradeEffectType.IncreaseShop,
            multiplier: 2, // +2 shop slots
            duration: 'permanent',
            price: 10,
        },
        {
            id: '',
            name: 'customerMagnetSign',
            label: 'Customer Magnet Sign',
            icon: signpostIcon,
            description: 'Reduces the time between customer arrivals in your shop by 20%.',
            effect: UpgradeEffectType.BoostShop,
            multiplier: 0.2, // 20% faster arrival rate
            maxStacks: 2,
            duration: 'permanent',
            price: 10,
        },
        {
            id: '',
            name: 'compostBin',
            label: 'Compost Bin',
            icon: compostBinIcon,
            description: 'Generates a random seed every 30 seconds, even when idle.',
            effect: UpgradeEffectType.GenerateSeeds, // can create new effect type like 'generateSeeds' if you want
            multiplier: 1, // 1 seed every cycle
            duration: 'permanent',
            price: 10,
        },
    ]
}

export const tabOptions: TabOptionsType = {
    store: [
        { label: 'Seeds', value: 'seeds', icon: '🌱' },
        { label: 'Supplies', value: 'suppliesStore', icon: '🧪' },
        { label: 'Upgrades', value: 'upgrades', icon: '🛠️' },
    ],
    inventory: [
        { label: 'Plants', value: 'plants', icon: '🌿' },
        { label: 'Supplies', value: 'suppliesInventory', icon: '🧪' },
    ],
}