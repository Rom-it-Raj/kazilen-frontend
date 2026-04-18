"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import BackHeader from "./components/BackHeader"
import { apiRequest } from "@/utils/api"
import { useWorkerSocket } from "@/hooks/useWorkerSocket"
import { generateStartPin, generateEndPin } from "@/lib/bookingApi"

export default function BookingStatusPage() {
  const [startPin, setStartPin] = useState(["-", "-", "-", "-"])
  const [endPin, setEndPin] = useState(null)
  
  // 1. Fetch current active booking from Django
  const { data: bookingData, isLoading, error } = useQuery({
    queryKey: ["current-booking"],
    queryFn: () => apiRequest("/current-booking"),
    refetchInterval: 10000, // Poll every 10s as backup
  })

  // 2. Listen for real-time updates from WebSocket
  const { lastUpdate, isConnected } = useWorkerSocket()

  // 3. Handle Pin generation logic
  useEffect(() => {
    if (bookingData && !bookingData.is_finished) {
      // If we have a booking but no pin generated yet, get it
      generateStartPin(bookingData.customer.phoneNo, bookingData.worker.phoneNo)
        .then(res => {
          if (res.startPin) {
            setStartPin(res.startPin.toString().split(""))
          }
        })
        .catch(console.error)
    }
  }, [bookingData])

  if (isLoading) return <div className="p-10 text-center">Loading Status...</div>
  if (!bookingData) return <div className="p-10 text-center">No active booking found.</div>

  const worker = bookingData.worker || {
    name: "Finding worker...",
    role: "PROVIDER",
    rating: 0,
    avatar: "/images/worker-thumb.jpg"
  }

  const statusTitle = lastUpdate?.status === "arrived" ? "Professional Arrived" : "Professional on the way"
  
  return (
    <main className="min-h-screen bg-gray-100">
      <BackHeader />

      <div className="max-w-xl mx-auto px-4 pb-8 space-y-6">

        {/* STATUS CARD */}
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-2xl p-5 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">{statusTitle}</p>
              <p className="text-3xl font-bold mt-1">{lastUpdate?.eta || "Calculating..."}</p>
              <p className="text-sm opacity-90 mt-1">
                {lastUpdate?.location ? `${lastUpdate.location} • ` : ""}
                {isConnected ? "Live Connection" : "Reconnecting..."}
              </p>
            </div>

            <div className="w-14 h-14 rounded-xl overflow-hidden border border-white/30">
              <Image
                src={worker.imageURL || "/images/provider-thumb.jpg"}
                alt="provider"
                width={56}
                height={56}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* START SERVICE PIN */}
        {!bookingData.is_started && (
           <div className="bg-white rounded-2xl p-4 shadow-sm">
           <p className="text-sm text-gray-500 mb-3">
             Share this Start PIN with the professional
           </p>
           <div className="flex gap-3">
             {startPin.map((n, i) => (
               <div
                 key={i}
                 className="flex-1 h-12 flex items-center justify-center text-xl font-bold rounded-xl border bg-gray-50"
               >
                 {n}
               </div>
             ))}
           </div>
         </div>
        )}

        {/* WORKER CARD */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border">
              <Image
                src={worker.imageURL || "/images/worker-thumb.jpg"}
                alt={worker.name}
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-emerald-600 tracking-wide uppercase">
                {worker.categories || "Professional"}
              </p>
              <p className="text-base font-semibold text-gray-800 truncate">
                {worker.name}
              </p>

              <div className="flex items-center gap-1 mt-1 text-sm">
                <span className="font-semibold">{worker.rating || "N/A"}</span>
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
          <p className="text-sm text-gray-500">Service Address</p>
          <p className="text-base font-semibold text-gray-800 mt-1 leading-snug">
             {bookingData.customer.address || "Fetching address..."}
          </p>
        </div>

        {/* END SERVICE PIN logic would go here when status is working */}

        {/* PAYMENT SUMMARY */}
        <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
          <h3 className="text-base font-semibold text-gray-800">
            Booking Summary
          </h3>

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Service</span>
            <span className="font-semibold text-gray-800 lowercase">
              {bookingData.worker.categories}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Booking ID</span>
            <span className="text-xs text-gray-400 uppercase">{bookingData.id.split("-")[0]}</span>
          </div>

          <button className="w-full mt-2 px-4 py-3 rounded-full border border-red-300 text-red-700 hover:bg-red-50 transition">
            Cancel Service
          </button>
        </div>
      </div>
    </main>
  )
}
