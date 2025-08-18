const BASE = process.env.NEXT_PUBLIC_API_URL;

async function api(path, { method = 'GET', body, headers, token } = {}) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'include',
    cache: 'no-store',
  });

  if (!res.ok) {
    let msg = `${res.status} ${res.statusText}`;
    try {
      const data = await res.json();
      if (data?.message) msg = data.message;
    } catch {}
    throw new Error(msg);
  }
  return res.status === 204 ? null : res.json();
}

/** Auth APIs */
export const requestOtp = (phone) =>
  api('/auth/otp/request', { method: 'POST', body: { phone } });

export const verifyOtp = (phone, otp) =>
  api('/auth/otp/verify', { method: 'POST', body: { phone, otp } });

export const resendOtp = requestOtp; // same endpoint for resend

/** Address APIs (when you add them later) */
export const getAddresses = (token) =>
  api('/addresses', { headers: { 'X-Session-Token': token } });
export const addAddress = (data, token) =>
  api('/addresses', { method: 'POST', body: data, headers: { 'X-Session-Token': token } });
export const updateAddress = (id, data, token) =>
  api(`/addresses/${id}`, { method: 'PUT', body: data, headers: { 'X-Session-Token': token } });
export const deleteAddress = (id, token) =>
  api(`/addresses/${id}`, { method: 'DELETE', headers: { 'X-Session-Token': token } });


export const getProfessionals = async ({ category, lat, lng, limit = 20, offset = 0 }) => {
  const params = new URLSearchParams({
    category: category || 'All Services',
    lat: String(lat),
    lng: String(lng),
    limit: String(limit),
    offset: String(offset),
  })
  return api(`/professionals?${params.toString()}`)
}

export const getProfessionalBySlug = async (slug, lat, lng) => {
  const params = new URLSearchParams()
  if (lat != null && lng != null) {
    params.set('lat', String(lat))
    params.set('lng', String(lng))
  }
  const qs = params.toString()
  return api(`/professionals/${encodeURIComponent(slug)}${qs ? `?${qs}` : ''}`)
}
