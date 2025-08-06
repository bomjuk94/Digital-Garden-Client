import type { userBalanceActionType } from "@/shared/types";
import { fetchUserProfile } from "../fetchUserProfile";
import { apiFetch } from "@/shared/utils.ts/api";

export const setRegisteredBalance = async (val: number, action: userBalanceActionType, token: string) => {

    try {
        const profile = await fetchUserProfile(token)

        if (!profile) return

        let userBalance = profile.balance
        userBalance += action === 'increase' ? val : -val

        const res = await apiFetch("/api/profile/balance", {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                balance: userBalance,
            })
        })
    } catch (error) {
        console.log(error)
    }
}