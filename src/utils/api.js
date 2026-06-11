const BASE_URL = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL}/customer`
  : "https://kazilen-prod-899213799870.asia-south1.run.app/api/customer";

export const apiRequest = async (endpoint, method = "GET", body = null) => {
  const config = {
    method,
    credentials: "include", // 🔥 REQUIRED for cookies
    headers: {
      "Content-Type": "application/json",
    },
    ...(body && { body: JSON.stringify(body) }),
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    // 🔥 If session expired → redirect
    if (response.status === 401) {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("unauthorized"));
      }
      throw new Error("UNAUTHORIZED");
    }

    return await response.json();
  } catch (error) {
    console.error("API Request Failed:", error);
    return { error: "Network error occurred" };
  }
};