const BASE_URL = process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/customer` : "http://127.0.0.1:8000/api/customer";

/**
 * Helper to handle fetch responses and generic error parsing
 */
async function fetchWithJSON(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    let errorMessage = "An error occurred while fetching data.";
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (e) {
      // Failed to parse JSON error, fallback to status text
      errorMessage = response.statusText || errorMessage;
    }
    throw new Error(errorMessage);
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return null;
  }

  return response.json();
}

/**
 * Fetch services/professionals with optional filters
 * @param {Object} filters
 * @returns {Promise<Array>}
 */
export async function fetchServices(filters = {}) {
  const params = new URLSearchParams();

  if (filters.category) params.append("category", filters.category);
  if (filters.subCategory) params.append("category", filters.subCategory); // Map subCategory to category for BE
  if (filters.sort) params.append("sort", filters.sort);

  const queryString = params.toString() ? `?${params.toString()}` : "";
  return fetchWithJSON(`${BASE_URL}/workers${queryString}`);
}

/**
 * Book a service
 * @param {Object} data Booking data payload
 * @returns {Promise<Object>}
 */
export async function bookService(data) {
  return fetchWithJSON(`${BASE_URL}/book`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}
