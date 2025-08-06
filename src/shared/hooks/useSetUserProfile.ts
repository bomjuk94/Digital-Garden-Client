import { useUserProfileStore } from "@/shared/stores/useUserProfileStore";
import { createUser } from "../utils.ts/factories/createuser";
import type { CreateUserInputType } from "../types";

export const useSetUserProfile = () => {
    const { setUserProfile } = useUserProfileStore()

    const setUser = (data: CreateUserInputType) => {
        setUserProfile(createUser(data))
    }

    return { setUser }
}