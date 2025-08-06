const BASE_URL = import.meta.env.VITE_API_URL;

export const apiFetch = async (
    path: string,
    options: RequestInit = {}
): Promise<Response> => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}${path}`, {
        credentials: "include",
        ...options,
        headers: {
            ...(options.headers || {}),
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });

    if (!res.ok) {
        let message = "API error";
        try {
            const data = await res.json();
            message = data.error || (data.errors ? data.errors.join(", ") : message);
        } catch {
            message = await res.text();
        }
        throw new Error(message);
    }

    return res;
};
