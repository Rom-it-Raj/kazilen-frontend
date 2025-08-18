'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import { MapPin, ArrowLeft, Star } from 'lucide-react'
import { getProfessionalBySlug } from '@/lib/api'

export default function ProfessionalDetailPage() {
  const { slug } = useParams()
  const params = useSearchParams()

  const [coords, setCoords] = useState(null)      // { lat, lng }
  const [data, setData]   = useState(null)        // professional
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Prefer coords passed from list page via query (?lat=..&lng=..), else geolocate
  useEffect(() => {
    const qlat = params.get('lat')
    const qlng = params.get('lng')
    if (qlat && qlng) {
      setCoords({ lat: Number(qlat), lng: Number(qlng) })
      return
    }
    if (!navigator.geolocation) {
      setCoords(null)
      return
    }
    navigator.geolocation.getCurrentPosition(
      p => setCoords({ lat: p.coords.latitude, lng: p.coords.longitude }),
      () => setCoords(null)
    )
  }, [params])

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true)
        const res = await getProfessionalBySlug(slug, coords?.lat, coords?.lng)
        setData(res)
      } catch (e) {
        setError(e.message || 'Failed to load')
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [slug, coords?.lat, coords?.lng])

  if (loading) return <div className="p-4">Loading…</div>
  if (error)   return <div className="p-4 text-red-600">{error}</div>
  if (!data)   return <div className="p-4">Not found</div>

  return (
    <div className="min-h-screen bg-white">
      {/* Top bar */}
      <div className="flex items-center gap-3 p-4 shadow-sm border-b sticky top-0 z-40 bg-white">
        <Link href="/" className="text-gray-700">
          <ArrowLeft size={22} />
        </Link>
        <h1 className="text-lg font-semibold text-gray-800">{data.name}</h1>
      </div>

      {/* Hero image */}
      {data.imageUrl && (
        <div className="relative w-full h-48">
          <Image
            src={data.imageUrl}
            alt={data.name}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      )}

      {/* Body */}
      <div className="p-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin size={16} />
          <span>{data.categoryName}</span>
          {typeof data.distanceKm === 'number' && (
            <span>• {data.distanceKm.toFixed(1)} km away</span>
          )}
          {data.rating && (
            <span className="flex items-center gap-1">
              • <Star size={14} className="inline-block" /> {Number(data.rating).toFixed(1)}
            </span>
          )}
        </div>

        <h2 className="mt-4 text-base font-semibold">About</h2>
        <p className="text-sm text-gray-700 mt-1">
          {data.description || 'No description provided.'}
        </p>

        {/* Example actions */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <a href={`tel:${data.phone || ''}`}
             className="text-center py-3 rounded-xl border font-semibold">
            Call
          </a>
          <a href={`https://maps.google.com/?q=${data.latitude},${data.longitude}`}
             target="_blank" rel="noreferrer"
             className="text-center py-3 rounded-xl bg-yellow-400 hover:bg-yellow-500 font-semibold">
            Directions
          </a>
        </div>
      </div>
    </div>
  )
}
