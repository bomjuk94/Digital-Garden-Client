import { apiFetch } from "../utils.ts/api"
import { showToast } from "../utils.ts/showToast";

export const fetchUserProfile = async (token: string | null) => {
    try {
        const res = await apiFetch(`/api/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        });

        const profile = await res.json();

        if (res.ok) {
            return profile
        }
        return null
    } catch (error: any) {
        console.error("API error:", error);
        console.log('error', error)
        showToast("error", error.message || "An unexpected error occurred");
    }
}