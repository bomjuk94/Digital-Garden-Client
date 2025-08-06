import type { TutorialStep } from "../types/TutorialStep"
import type { GrowthPhaseType } from "../types/GrowthPhaseType"
import type { ToolName } from "../types/ToolNameType"
import type { plantMapType } from "../types"
import {
    bonsaiPlant,
    cactusPlant,
    daisyPlant,
    lavenderPlant,
    rosePlant,
    sunflowerPlant,
    tulipPlant,
} from '@assets/plants'

export const tutorialSteps: TutorialStep[] = [
    {
        id: "greenhouseBackdrop",
        label: 'greenhouseBackdrop',
        message: "Welcome to your Digital Garden! Before you dive in, we recommend taking a moment to read the Instructions panel. It’ll walk you through how to plant, water, and harvest your crops — and help you avoid any rookie mistakes. Once you're ready, grab your tools and start growing! 🌱",
        targetId: "greenhouse-backdrop",
        position: "top",
        nextTrigger: "click",
        disableCutout: true,
    },
    // {
    //     id: "greenhouseDesk",
    //     label: 'greenhouseDesk',
    //     message: "Here, you can grow plants on your table",
    //     targetId: "greenhouse-desk",
    //     position: "top",
    //     nextTrigger: "click",
    //     disableCutout: false
    // },
    // // Toolbelt
    // {
    //     id: "greenhouseToolbelt",
    //     label: 'greenhouseToolbelt',
    //     message: "These are the tools you can use to plant and manage your plants",
    //     targetId: "greenhouse-toolbelt",
    //     position: "top",
    //     nextTrigger: "click",
    //     disableCutout: false
    // },
    // // Seed bag
    // {
    //     id: "greenhouseSeedbag",
    //     label: 'greenhouseSeedbag',
    //     message: "Let's try planting a seed. Click on the seed bag",
    //     targetId: "greenhouse-plant-seed",
    //     position: "top",
    //     nextTrigger: "click",
    //     disableCutout: false
    // },
    // // Plant Seed
    // {
    //     id: "greenhouseSeedsInventory",
    //     label: 'greenhouseSeedsInventory',
    //     message: "These are the available seeds to plant. Click one to show the option to plant it, then click plant seed",
    //     targetId: "greenhouse-plant-seed",
    //     position: "left",
    //     nextTrigger: "click",
    //     disableCutout: false
    // },
    // // Plant Details
    // {
    //     id: "greenhousePlants",
    //     label: 'greenhousePlants',
    //     message: "Every seed you plant will appear on this desk",
    //     targetId: "greenhouse-plants",
    //     position: "top",
    //     nextTrigger: "click",
    //     disableCutout: false
    // },
    // // Water
    // {
    //     id: "greenhouseWaterPlant",
    //     label: 'greenhouseWaterPlant',
    //     message: "The water droplet means the plant needs to be watered. Note that the plant will not grow if not watered and will die if you miss the watering two times per growth phase",
    //     targetId: "greenhouse-water-plant",
    //     position: "top",
    //     nextTrigger: "click",
    //     disableCutout: false
    // },
    // // Time left
    // {
    //     id: "greenhousePlantTimeLeft",
    //     label: 'greenhousePlantTimeLeft',
    //     message: "If you click on the plant, the remaining time until the next phase in the growth cycle will be shown",
    //     targetId: "greenhouse-plant-details",
    //     position: "top",
    //     nextTrigger: "click",
    //     disableCutout: false
    // },
    // // Harvest Notification
    // {
    //     id: "greenhouseHarvestPlantNotification",
    //     label: 'greenhouseHarvestPlantNotification',
    //     message: "When the plant is ready to be harvested, you will shown a notification",
    //     targetId: "greenhouse-harvest-plant-notification",
    //     position: "top",
    //     nextTrigger: "click",
    //     disableCutout: false
    // },
    // // Harvest Shears
    // {
    //     id: "greenhouseHarvestPlantShears",
    //     label: 'greenhouseHarvestPlantShears',
    //     message: "Let's harvest the plant. Click on the garden shears and click on the plant to harvest it.",
    //     targetId: "greenhouse-harvest-plant",
    //     position: "top",
    //     nextTrigger: "click",
    //     disableCutout: false
    // },
    // // Harvest Plant
    // {
    //     id: "greenhouseHarvestPlant",
    //     label: 'greenhouseHarvestPlant',
    //     message: "Harvest the plant. Note that You can also discard dead plants by using the gardening shears",
    //     targetId: "greenhouse-plant-details",
    //     position: "top",
    //     nextTrigger: "click",
    //     disableCutout: false
    // },
    // // Toolbelt Inventory
    // {
    //     id: "greenhouseToolbeltInventory",
    //     label: 'greenhouseToolbeltInventory',
    //     message: "Congratulations! You've harvested your first plant. In order to view plants you've harvested, click on the inventory bag from the toolbelt by scrolling to the right.",
    //     targetId: "greenhouse-toolbelt",
    //     position: "top",
    //     nextTrigger: "click",
    //     disableCutout: false
    // },
    // // Inventory
    // {
    //     id: "greenhouseInventory",
    //     label: 'greenhouseInventory',
    //     message: "The inventory will store all the plants that you've harvested",
    //     targetId: "greenhouse-inventory",
    //     position: "top",
    //     nextTrigger: "click",
    //     disableCutout: false
    // },
    // {
    //     id: "greenhouseBackdrop",
    //     label: 'greenhouseBackdrop',
    //     message: "That is about everything for the green house. Now let's head over to the garden!",
    //     targetId: "greenhouse-backdrop",
    //     position: "top",
    //     nextTrigger: "click",
    //     disableCutout: true,
    // },
]
export const growthPhaseMap: Record<GrowthPhaseType, number> = {
    seedling: 0,
    sprout: 1,
    bud: 2,
    bloom: 3,
}
export const plantPhases = ['seedling', 'sprout', 'bud', 'bloom'] as const

// Testing
export const phaseDurations: Record<GrowthPhaseType, number> = {
    seedling: 10 * 1000, // 10 seconds
    sprout: 10 * 1000, // 10 seconds
    bud: 10 * 1000, // 10 seconds
    bloom: 0,         // final stage, no next phase
}
// Production
// export const phaseDurations: Record<GrowthPhaseType, number> = {
//     seedling: 30 * 1000,   // 30 seconds
//     sprout: 60 * 1000,     // 1 minute
//     bud: 120 * 1000,       // 2 minutes
//     bloom: 0,
// }

export const toolsUrls: Record<ToolName, string> = {
    "harvest-plant": "/tools/gardening-shears-icon.webp",
    "water-plant": "/tools/watering-can-icon.webp",
    "boostYield": "/tools/premium-soil-icon.webp",
    "boostYieldTimed": "/tools/fertilizer-bag-icon.webp",
    "boostGrowth": "/tools/growth-tonic-icon.webp",
}

export const plants: plantMapType = {
    bonsai: {
        name: 'bonsai',
        label: 'Bonsai Plant',
        count: undefined,
        description: 'A miniature tree cultivated for patience and precision. Grows slowly but adds elegance to any garden',
        category: ['ornamental', 'tree'],
        growTime: 4,
        phases: 4,
        maxWateringSkips: 2,
        rarity: 'common',
        sellPrice: 15,
        plants: undefined,
    },
    cactus: {
        name: 'cactus',
        label: 'Cactus Plant',
        count: undefined,
        description: 'A resilient desert plant that thrives with minimal water. Great for low-maintenance gardening.',
        category: ['succulent', 'desert'],
        growTime: 4,
        phases: 4,
        maxWateringSkips: 2,
        rarity: 'common',
        sellPrice: 4,
        plants: undefined,
    },
    daisy: {
        name: 'daisy',
        label: 'Daisy Plant',
        count: undefined,
        description: 'A cheerful white flower with a sunny center. Symbol of innocence and fresh starts.',
        category: ['flower', 'wildflower'],
        growTime: 4,
        phases: 4,
        maxWateringSkips: 2,
        rarity: 'common',
        sellPrice: 4,
        plants: undefined,
    },
    lavender: {
        name: 'lavender',
        label: 'Lavender Plant',
        count: undefined,
        description: 'A fragrant herb known for its calming scent and beautiful purple blooms',
        category: ['flower', 'herb'],
        growTime: 4,
        phases: 4,
        maxWateringSkips: 2,
        rarity: 'common',
        sellPrice: 4,
        plants: undefined,
    },
    rose: {
        name: 'rose',
        label: 'Rose Plant',
        count: undefined,
        description: 'A romantic flower with delicate petals and thorns. A timeless symbol of love and beauty.',
        category: ['flower', 'ornamental'],
        growTime: 4,
        phases: 4,
        maxWateringSkips: 2,
        rarity: 'common',
        sellPrice: 4,
        plants: undefined,
    },
    sunflower: {
        name: 'sunflower',
        label: 'Sunflower Plant',
        count: undefined,
        description: 'A tall, sun-loving plant that always faces the light. Produces seeds and brightens any space.',
        category: ['flower', 'edible'],
        growTime: 4,
        phases: 4,
        maxWateringSkips: 2,
        rarity: 'common',
        sellPrice: 4,
        plants: undefined,
    },
    tulip: {
        name: 'tulip',
        label: 'Tulip Plant',
        count: undefined,
        description: 'A spring-blooming bulb with smooth, cup-shaped petals in vibrant colors.',
        category: ['flower', 'ornamental'],
        growTime: 4,
        phases: 4,
        maxWateringSkips: 2,
        rarity: 'common',
        sellPrice: 15,
        plants: undefined,
    },
}

export const plantIcons: Record<string, string> = {
    bonsai: bonsaiPlant,
    cactus: cactusPlant,
    daisy: daisyPlant,
    lavender: lavenderPlant,
    rose: rosePlant,
    sunflower: sunflowerPlant,
    tulip: tulipPlant,
    // TODO: Add default sprite sheet in case key is not found
}