'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Clock } from 'lucide-react'

export default function RestaurantCard({ image = "/Appliances repair professional shop.png", name }) {
  // Slugify name for dynamic path, e.g. "The Kathi Crossing" → "the-kathi-crossing"
  const slug = name.toLowerCase().replace(/\s+/g, '-')

  return (
    <Link href={`/restaurant/${slug}`} className="block">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4 mx-4 cursor-pointer hover:shadow-md transition-shadow">
        {/* Image */}
        <div className="relative">
          <Image
            src={image}
            alt={name}
            width={500}
            height={300}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Details */}
        <div className="p-3">
          <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
            <Clock size={12} />
            <span>15–25 mins</span>
            <span>• 1.2 km</span>
            <span>• Free</span>
          </div>

          <p className="font-medium text-base text-gray-800">{name}</p>
        </div>
      </div>
    </Link>
  )
}
