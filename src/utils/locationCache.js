const LOCATION_KEY = "kazilen_location"
const LOCATION_TTL = 10 * 60 * 1000 // 10 minutes

export function getCachedLocation() {

  const stored = localStorage.getItem(LOCATION_KEY)

  if (!stored) return null

  const data = JSON.parse(stored)

  const age = Date.now() - data.timestamp

  if (age > LOCATION_TTL) {
    return null
  }

  return data
}

export function saveLocation(location) {

  localStorage.setItem(
    LOCATION_KEY,
    JSON.stringify(location)
  )

}