export async function getFreshLocation() {

  if (!navigator.geolocation) {
    throw new Error("Geolocation not supported")
  }

  return new Promise((resolve, reject) => {

    navigator.geolocation.getCurrentPosition(
      (position) => {

        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: Date.now()
        }

        resolve(location)

      },
      (error) => reject(error),
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    )

  })
}