import { useEffect, useState } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { apiFetch } from "../utils.ts/api";

export const useProtectedProfile = () => {
    const { isAuthenticated, isTokenExpired, logout } = useAuthStore();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const validateUser = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setError(null);
                setLoading(false);
                return;
            }

            if (!isAuthenticated || isTokenExpired(token)) {
                logout();
                setError("sessionExpired");
                setLoading(false);
                return;
            }

            try {
                const res = await apiFetch("/api/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (res.status === 401 || res.status === 403) {
                    logout();
                    setError("sessionExpired");
                } else if (!res.ok) {
                    setError("unknownError");
                } else {
                    setError(null);
                }
            } catch {
                setError("networkError");
            } finally {
                setLoading(false);
            }
        };

        validateUser();
    }, [isAuthenticated, isTokenExpired, logout]);

    return { error, loading };
};
