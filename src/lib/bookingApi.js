const BOOKING_BASE_URL = process.env.NEXT_PUBLIC_BOOKING_SERVICE_URL || "http://127.0.0.1:8001";

/**
 * Shared helper for Booking Service (FastAPI) requests
 */
async function bookingFetch(endpoint, data = {}, method = "POST") {
    let token = null;
    if (typeof window !== "undefined") {
        token = localStorage.getItem("session_token");
    }

    const response = await fetch(`${BOOKING_BASE_URL}${endpoint}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(token && { "Authorization": `Bearer ${token}` }),
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || "Booking service error");
    }

    return response.json();
}

/**
 * Generate a start-pin for a booking
 */
export async function generateStartPin(customerPhone, workerPhone) {
    return bookingFetch("/start-pin", {
        customer_phone: customerPhone,
        worker_phone: workerPhone
    });
}

/**
 * Verify a start-pin (Worker initiates)
 */
export async function verifyStartPin(customerPhone, workerPhone, pin, bookingId) {
    return bookingFetch("/confirm-start", {
        customer_phone: customerPhone,
        worker_phone: workerPhone,
        pin: pin,
        booking_id: bookingId
    });
}

/**
 * Generate an end-pin for a booking
 */
export async function generateEndPin(customerPhone, workerPhone) {
    return bookingFetch("/end-pin", {
        customer_phone: customerPhone,
        worker_phone: workerPhone
    });
}

/**
 * Verify an end-pin (Worker initiates)
 */
export async function verifyEndPin(customerPhone, workerPhone, pin, bookingId) {
    return bookingFetch("/confirm-end", {
        customer_phone: customerPhone,
        worker_phone: workerPhone,
        pin: pin,
        booking_id: bookingId
    });
}
