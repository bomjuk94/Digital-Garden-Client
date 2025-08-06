import type { plantMapObjectType } from "../types"
import { plantIcons } from "./constants"

export const getSpriteStyle = (phase: number, plant: plantMapObjectType) => ({
    backgroundImage: `url('${plantIcons[plant.name] ?? plantIcons["default"]}')`,
    backgroundRepeat: "no-repeat",
    backgroundSize: '203px 93.25px',
    backgroundPosition: `-${phase * 50}px 0px`,
})