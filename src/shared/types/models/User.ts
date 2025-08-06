
export type UserModeType = 'guest' | 'registered' | null
export type CapacityKeyType = 'plantCapacity' | 'usedPlantCapacity'
export type UserGameType = {
    plantCapacity: number,
    calculatedPlantCapacity: number,
    usedPlantCapacity: number,
}
export type BaseUserType = {
    id: string
    username: string
    mode: 'guest' | 'registered'
    createdAt: string
    lastActive: string
    onboardingComplete?: boolean
    theme?: 'light' | 'dark'
    gardenId?: string
    game: UserGameType
    balance: number
    lastAtShop: number
}
export type CreateUserInputType = {
    username: string
    mode?: 'guest' | 'registered'
    theme?: 'light' | 'dark'
    onboardingComplete?: boolean
    gardenId?: string
}
export type FormInputType = {
    username: string
    password: string
}
export type userBalanceActionType = 'increase' | 'decrease'