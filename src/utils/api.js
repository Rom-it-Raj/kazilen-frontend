const BASE_URL = "http://127.0.01:8000/api";

export const apiRequest = async (endpoint, method = "Get", body = null) => {
        const headers = {
                "Content-Type": "application/json",
        };

        let token = null;
        if (typeof window !== "undefined") {
                token = localStorage.getItem("session_token");
                if (token) {
                        headers["Authorization"] = `Bearer ${token}`;
                }
        }

        const config = {
                method,
                headers,
                ...(body && { body: JSON.stringify(body) }),
        };

        try {
                const response = await fetch(`${BASE_URL}${endpoint}`, config);

                if (response.status === 401) {
                        if (typeof window !== "undefined")
                                localStorage.removeItem("session_token");
                        window.location.href = "/login";
                        return null;
                }

                return await response.json();
        } catch (error) {
                console.error("API Request Failed:", error);
                return { error: "Network error occurred" };
        }
};
