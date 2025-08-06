import type { StoreTabType } from "./models"

export type TabOption = {
    label: string
    value: StoreTabType
    icon: string
}

export type TabCategory = 'store' | 'inventory'

export type TabOptionsType = Record<TabCategory, TabOption[]>