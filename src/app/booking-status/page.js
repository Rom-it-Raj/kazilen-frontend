"use client"

import Image from "next/image"
import BackHeader from "./components/BackHeader"

export default function BookingStatusPage() {
  const booking = {
    title: "Electrician arriving in",
    eta: "15 min",
    subtitle: "298 m away • On the way",
    avatar: "/images/provider-thumb.jpg"
  }

  const worker = {
    role: "ELECTRICIAN",
    name: "Vinod Kumar Manjhi",
    avatar: "/images/worker-thumb.jpg",
    rating: 4.7
  }

  const pickup = {
    label: "Service Address",
    address:
      "1885, New Shastri Nagar, Shastri Nagar, Jabalpur, Madhya Pradesh 482003"
  }

  const trip = {
    photo: "/images/trip-photo.jpg",
    caption: "Service location snapshot",
    fare: 34,
    paymentMethod: "GPay"
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <BackHeader />

      <div className="max-w-xl mx-auto px-4 pb-8 space-y-6">

        {/* STATUS CARD */}
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-2xl p-5 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">{booking.title}</p>
              <p className="text-3xl font-bold mt-1">{booking.eta}</p>
              <p className="text-sm opacity-90 mt-1">{booking.subtitle}</p>
            </div>

            <div className="w-14 h-14 rounded-xl overflow-hidden border border-white/30">
              <Image
                src={booking.avatar}
                alt="provider"
                width={56}
                height={56}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* PIN */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-sm text-gray-500 mb-3">Start service with PIN</p>
          <div className="flex gap-3">
            {[7, 7, 1, 1].map((n, i) => (
              <div
                key={i}
                className="flex-1 h-12 flex items-center justify-center text-xl font-bold rounded-xl border bg-gray-50"
              >
                {n}
              </div>
            ))}
          </div>
        </div>

        {/* WORKER CARD */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border">
              <Image
                src={worker.avatar}
                alt={worker.name}
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-emerald-600 tracking-wide">
                {worker.role}
              </p>
              <p className="text-base font-semibold text-gray-800 truncate">
                {worker.name}
              </p>

              <div className="flex items-center gap-1 mt-1 text-sm">
                <span className="font-semibold">{worker.rating}</span>
                <svg
                  className="w-4 h-4 text-yellow-400"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 17.3 7.2 20l1.1-5.3L4 12.2l5.4-.5L12 7l2.6 4.7 5.4.5-4.3 2.5L16.8 20z" />
                </svg>
              </div>
            </div>

            <Image
              src="/images/motorbike.png"
              alt="vehicle"
              width={28}
              height={28}
            />
          </div>
        </div>

        {/* ADDRESS */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">{pickup.label}</p>
          <p className="text-base font-semibold text-gray-800 mt-1 leading-snug">
            {pickup.address}
          </p>
        </div>

        {/* TRIP DETAILS */}
        <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
          <h3 className="text-base font-semibold text-gray-800">
            Payment Summary
          </h3>

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Total Fare</span>
            <span className="font-semibold text-gray-800">
              ₹{trip.fare}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Payment Method</span>
            <span className="text-gray-800">{trip.paymentMethod}</span>
          </div>

          <div className="rounded-xl overflow-hidden border bg-gray-100">
            <Image
              src={trip.photo}
              alt={trip.caption}
              width={900}
              height={600}
              className="object-cover w-full"
            />
          </div>

          <p className="text-sm text-gray-600">{trip.caption}</p>

          <button className="w-full mt-2 px-4 py-3 rounded-full border border-red-300 text-red-700 hover:bg-red-50 transition">
            Cancel Service
          </button>
        </div>
      </div>
    </main>
  )
}
