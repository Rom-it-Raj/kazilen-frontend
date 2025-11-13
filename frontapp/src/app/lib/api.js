// src/app/lib/api.js
const BASE = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "");
const DEFAULT_TIMEOUT_MS = 12000;

const buildUrl = (p) => `${BASE}${p.startsWith("/") ? p : "/" + p}`;

async function _fetchWithTimeout(url, options = {}, timeoutMs = DEFAULT_TIMEOUT_MS) {
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: ctrl.signal });
  } finally {
    clearTimeout(id);
  }
}

async function jsonOrNull(res) {
  const ct = res.headers.get("content-type") || "";
  if (!ct.includes("application/json")) return null;
  try {
    return await res.json();
  } catch {
    return null;
  }
}

async function api(
  path,
  { method = "GET", body, headers = {}, timeoutMs = DEFAULT_TIMEOUT_MS, credentials = "include" } = {}
) {
  const url = buildUrl(path);
  const finalHeaders = { ...headers };
  let finalBody = body;

  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;
  if (body && !isFormData && typeof body === "object") {
    finalHeaders["Content-Type"] = "application/json";
    finalBody = JSON.stringify(body);
  }
  if (isFormData || method === "GET") {
    delete finalHeaders["Content-Type"];
  }

  const fetchOptions = {
    method,
    headers: finalHeaders,
    body: finalBody,
    credentials,
    cache: "no-store",
  };

  const res = await _fetchWithTimeout(url, fetchOptions, timeoutMs);

  if (!res.ok) {
    const data = await jsonOrNull(res);
    const msg = data?.message || data?.error || `${res.status} ${res.statusText}`;
    const err = new Error(msg);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  if (res.status === 204) return null;
  return (await jsonOrNull(res)) ?? null;
}

/* -------- Auth-lite (phone existence) -------- */
export const checkPhone = (phone) =>
  api("/api/v1/auth/check-phone", { method: "POST", body: { phone } });

/* -------- Users -------- */
export const createUser = (data) => api("/api/v1/users", { method: "POST", body: data });
export const getUser = (id) => api(`/api/v1/users/${id}`, { method: "GET" });
export const updateUser = (id, data) => api(`/api/v1/users/${id}`, { method: "PUT", body: data });

export const uploadAvatar = async (id, file) => {
  const form = new FormData();
  form.append("file", file);
  return api(`/api/v1/users/${id}/avatar`, { method: "POST", body: form });
};

/* -------- Addresses -------- */
export const createAddress = (data) => api("/api/v1/addresses", { method: "POST", body: data });
export const getAddressesByUser = (userId) =>
  api(`/api/v1/addresses?userId=${encodeURIComponent(userId)}`, { method: "GET" });
export const getAddressById = (id) => api(`/api/v1/addresses/${encodeURIComponent(id)}`, { method: "GET" });
export const updateAddress = (id, data) => api(`/api/v1/addresses/${id}`, { method: "PUT", body: data });
export const deleteAddress = (id) => api(`/api/v1/addresses/${id}`, { method: "DELETE" });
