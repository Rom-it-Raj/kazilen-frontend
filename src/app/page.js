"use client"
import { useEffect, useState } from 'react'
import CategoryTabs from './components/CategoryTabs'
import RestaurantCard from './components/RestaurantCard'
import { getProfessionals } from './lib/api'

export default function HomePage() {
  const [category, setCategory] = useState('All Services')
  const [coords, setCoords] = useState(null)  // { lat, lng }
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Get user location once
  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported')
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setError('Unable to get location')
    )
  }, [])

  // Fetch professionals whenever category or coords change
  useEffect(() => {
    const run = async () => {
      if (!coords) return
      setLoading(true); setError('')
      try {
        const data = await getProfessionals({ category, lat: coords.lat, lng: coords.lng })
        setItems(data.items || [])
      } catch (e) {
        setError(e.message || 'Failed to load')
        setItems([])
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [category, coords])

  return (
    <main className="min-h-screen bg-white pb-16">
      <CategoryTabs value={category} onChange={setCategory} />

      {/* Count / status */}
      <p className="px-4 mt-3 text-[11px] font-medium text-gray-400 tracking-wide uppercase">
        {loading ? 'Loading…' : `${items.length} Professionals Delivering To You`}
      </p>
      {error && <p className="px-4 mt-2 text-sm text-red-600">{error}</p>}

      {/* Cards */}
      <div className="mt-2">
        {items.map((p) => (
          <RestaurantCard
            key={p.id}
            image={p.imageUrl || '/placeholder.png'}
            name={p.name}
          />
        ))}
      </div>
    </main>
  )
}
