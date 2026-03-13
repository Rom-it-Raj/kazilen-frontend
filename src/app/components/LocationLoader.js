"use client"

import { useEffect } from "react"
import { getFreshLocation } from "../../utils/location"
import { getCachedLocation, saveLocation } from "../../utils/locationCache"

export default function LocationLoader() {

  useEffect(() => {

    async function loadLocation() {

      const cached = getCachedLocation()

      if (cached) {

        console.log("Using cached location:", cached)

        return
      }

      try {

        const location = await getFreshLocation()

        saveLocation(location)

        console.log("New location fetched:", location)

      } catch (err) {

        console.error("Location error:", err)

      }

    }

    loadLocation()

  }, [])

  return null
}