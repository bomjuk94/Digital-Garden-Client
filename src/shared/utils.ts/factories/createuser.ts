import { v4 as uuidv4 } from 'uuid'
import type { CreateUserInputType } from '@/shared/types'
import { STARTING_BALANCE } from '@/features/Greenhouse/constants'

export const createUser = (data: CreateUserInputType) => {
    return {
        id: uuidv4(),
        username: data.username.toLowerCase(),
        mode: data.mode || 'guest',
        createdAt: new Date().toISOString(),
        lastActive: new Date().toISOString(),
        theme: data.theme || 'light',
        onboardingComplete: false,
        gardenId: '',
        lastAtShop: 0,
        game: {
            plantCapacity: 3,
            calculatedPlantCapacity: 3,
            usedPlantCapacity: 0,
        },
        balance: STARTING_BALANCE,
    }
}