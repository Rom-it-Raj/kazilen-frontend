'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Star, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ProfessionalCard({ professional }) {
  const [showConfirm, setShowConfirm] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const router = useRouter()

  // Normalize data fields to handle potential inconsistencies
  const displayImage = professional.image || professional.imageURL || '/default-user.png'
  const displayRole = professional.jobProfile || professional.skill || 'Service Provider'
  const displayRating = professional.rating || '4.5'
  const displayDescription = professional.description || professional.discription || 'Experienced and reliable professional offering top-quality service.'
  const displayPrice = professional.price || '250'
  const displayReviews = professional.reviews || '120'
  const displayExperience = professional.experience || '2+ years'
  const displayLocation = professional.location || 'Nearby'

  const handleBook = () => {
    if (showProfile) {
      setShowProfile(false)
      // allow profile close animation before opening confirm
      setTimeout(() => setShowConfirm(true), 200)
    } else {
      setShowConfirm(true)
    }
  }

  const confirmBooking = () => {
    setShowConfirm(false)
    router.push('/booking-status')
  }

  const cancelBooking = () => setShowConfirm(false)

  const handleViewProfile = () => setShowProfile(true)
  const closeProfile = () => setShowProfile(false)

  return (
    <div className="w-full relative">
      {/* Card */}
      <div className="flex items-start gap-4 border rounded-2xl p-4 shadow-sm hover:shadow-md transition-all bg-white mb-3">
        <Image
          src={displayImage}
          alt={professional.name}
          width={90}
          height={90}
          className="rounded-xl object-cover flex-shrink-0"
        />

        <div className="flex flex-col flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-base font-semibold text-gray-800">
                {professional.name}
              </h3>
              <p className="text-sm text-gray-500">
                {displayRole}
              </p>
            </div>

            <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-md">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-400" />
              <span className="ml-1 text-sm font-medium text-gray-700">
                {displayRating}
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
            {displayDescription}
          </p>

          <div className="flex justify-between items-start mt-3 gap-2">
            <button
              onClick={handleViewProfile}
              className="px-3 py-1.5 text-sm rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              View Profile
            </button>

            <div className="text-right">
              <p className="text-sm font-semibold text-pink-600">
                ₹{displayPrice} / hour
              </p>
              <button
                onClick={handleBook}
                className="mt-1 px-3 py-1.5 text-sm rounded-lg bg-pink-500 text-white hover:bg-pink-600"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Booking Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-sm text-center">
            <h3 className="text-lg font-semibold text-gray-800">
              Confirm Booking
            </h3>

            <p className="text-sm text-gray-600 mt-2">
              Book <span className="font-medium">{professional.name}</span> for{' '}
              <span className="font-semibold text-pink-600">
                ₹{displayPrice}/hour
              </span>
              ?
            </p>

            <div className="flex justify-center gap-3 mt-5">
              <button
                onClick={cancelBooking}
                className="px-4 py-2 rounded-lg text-sm bg-gray-200 text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={confirmBooking}
                className="px-4 py-2 rounded-lg text-sm bg-pink-500 text-white"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Bottom Sheet */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 ${
          showProfile ? 'visible' : 'invisible'
        }`}
      >
        <div
          onClick={closeProfile}
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            showProfile ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <div
          className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 max-w-md mx-auto
          transform transition-transform duration-300 ${
            showProfile ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <button
            onClick={closeProfile}
            className="absolute top-3 right-3 text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>

            <div className="flex flex-col items-center text-center">
              <Image
                src={displayImage}
                alt={professional.name}
                width={110}
                height={110}
                className="rounded-full object-cover mb-3"
              />
              <h2 className="text-lg font-semibold text-gray-800">
                {professional.name}
              </h2>
              <p className="text-sm text-gray-500">
                {displayRole}
              </p>

              <div className="flex items-center justify-center mt-2">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-400" />
                <span className="ml-1 text-sm text-gray-700">
                  {displayRating}
                </span>
                <span className="ml-2 text-xs text-gray-400">
                  ({displayReviews} reviews)
                </span>
              </div>
            </div>

            <div className="mt-4 border-t pt-4 text-sm text-gray-600 space-y-2">
              <p>
                {displayDescription}
              </p>
              <p>
                <span className="font-medium text-gray-800">Experience:</span>{' '}
                {displayExperience}
              </p>
              <p>
                <span className="font-medium text-gray-800">Location:</span>{' '}
                {displayLocation}
              </p>
              <p>
                <span className="font-medium text-gray-800">Price:</span>{' '}
                ₹{displayPrice}/hour
              </p>
            </div>

          <div className="flex justify-center gap-3 mt-5">
            <button
              onClick={closeProfile}
              className="px-4 py-2 rounded-lg bg-gray-200"
            >
              Close
            </button>
            <button
              onClick={handleBook}
              className="px-4 py-2 rounded-lg bg-pink-500 text-white"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
