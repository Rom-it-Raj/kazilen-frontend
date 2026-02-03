'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Star, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ProfessionalCard({ professional }) {
  const [showConfirm, setShowConfirm] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const router = useRouter()
  const cardRef = useRef(null)

  const openConfirm = () => {
    setShowConfirm(true)
  }

  const cancelBooking = () => setShowConfirm(false)
  const handleViewProfile = () => setShowProfile(true)
  const closeProfile = () => setShowProfile(false)

  const confirmBooking = () => {
    setShowConfirm(false)
    router.push('/booking-status')
  }

  return (
    <div ref={cardRef} className="w-full relative">
      {/* Card */}
      <div className="flex items-start gap-4 border rounded-2xl p-4 shadow-sm hover:shadow-md transition-all bg-white mb-3">
        <Image
          src={professional.image || '/default-user.png'}
          alt={professional.name}
          width={90}
          height={90}
          className="rounded-xl object-cover flex-shrink-0"
        />

        <div className="flex flex-col flex-1 justify-between">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-base font-semibold text-gray-800">
                {professional.name}
              </h3>
              <p className="text-sm text-gray-500">
                {professional.skill || 'Service Provider'}
              </p>
            </div>

            <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-md">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-400" />
              <span className="ml-1 text-sm font-medium text-gray-700">
                {professional.rating || '4.5'}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
            {professional.description ||
              'Experienced and reliable professional offering top-quality service.'}
          </p>

          {/* Actions */}
          <div className="flex justify-between items-end mt-3 gap-2">
            <button
              onClick={handleViewProfile}
              className="px-3 py-1.5 text-sm rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
            >
              View Profile
            </button>

            <div className="flex flex-col items-end">
              <p className="text-sm font-semibold text-pink-600">
                ₹{professional.price || '250'} / hour
              </p>
              <button
                onClick={openConfirm}
                className="mt-1 px-3 py-1.5 text-sm rounded-lg bg-pink-500 text-white hover:bg-pink-600 transition"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Confirm Booking Popup — CENTERED */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white w-[90%] max-w-sm rounded-2xl p-6 shadow-lg animate-[fadeIn_0.2s_ease-out]">
            <h3 className="text-lg font-semibold text-gray-800 text-center">
              Confirm Booking
            </h3>

            <p className="text-sm text-gray-600 mt-3 text-center">
              Book <span className="font-semibold">{professional.name}</span> for{' '}
              <span className="font-semibold text-pink-600">
                ₹{professional.price || '250'}/hour
              </span>
              ?
            </p>

            <div className="flex gap-3 mt-6">
              <button
                onClick={cancelBooking}
                className="flex-1 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmBooking}
                className="flex-1 py-2 rounded-lg bg-pink-500 text-white hover:bg-pink-600 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Popup */}
      {showProfile && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-md p-6 relative">
            <button
              onClick={closeProfile}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center">
              <Image
                src={professional.image || '/default-user.png'}
                alt={professional.name}
                width={110}
                height={110}
                className="rounded-full object-cover mb-3"
              />
              <h2 className="text-lg font-semibold text-gray-800">
                {professional.name}
              </h2>
              <p className="text-sm text-gray-500">
                {professional.skill || 'Service Provider'}
              </p>

              <div className="flex items-center justify-center mt-2">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-400" />
                <span className="ml-1 text-sm text-gray-700">
                  {professional.rating || '4.5'}
                </span>
                <span className="ml-2 text-xs text-gray-400">
                  ({professional.reviews || '120'} reviews)
                </span>
              </div>
            </div>

            <div className="mt-4 border-t pt-4 text-sm text-gray-600 space-y-2">
              <p>{professional.description}</p>
              <p><b>Experience:</b> {professional.experience || '2+ years'}</p>
              <p><b>Location:</b> {professional.location || 'Nearby'}</p>
              <p><b>Price:</b> ₹{professional.price || '250'}/hour</p>
            </div>

            <div className="flex justify-center gap-3 mt-5">
              <button
                onClick={closeProfile}
                className="px-4 py-2 rounded-lg text-sm bg-gray-200 text-gray-700"
              >
                Close
              </button>
              <button
                onClick={() => {
                  closeProfile()
                  openConfirm()
                }}
                className="px-4 py-2 rounded-lg text-sm bg-pink-500 text-white"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
