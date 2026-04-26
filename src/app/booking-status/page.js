"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import BackHeader from "./components/BackHeader"
import { apiRequest } from "@/utils/api"
import { generateStartPin } from "@/lib/bookingApi"
import Skeleton from "@/app/components/ui/Skeleton"
import ErrorState from "@/app/components/ui/ErrorState"
import EmptyState from "@/app/components/ui/EmptyState"
import { Calendar } from "lucide-react"

export default function BookingStatusPage() {
  const [startPin, setStartPin] = useState(["-", "-", "-", "-"])

  // ✅ Polling as primary data source
  const {
    data: bookingData,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ["current-booking"],
    queryFn: () => apiRequest("/current-booking"),
    refetchInterval: 5000, // faster since no websocket
    refetchIntervalInBackground: true,
  })

  // ✅ Safe PIN generation (no spam)
  useEffect(() => {
    if (!bookingData || bookingData.is_started) return

    // prevent multiple API calls
    if (startPin[0] !== "-") return

    if (bookingData.customer?.phoneNo && bookingData.worker?.phoneNo) {
      generateStartPin(
        bookingData.customer.phoneNo,
        bookingData.worker.phoneNo
      )
        .then((res) => {
          if (res?.startPin) {
            setStartPin(res.startPin.toString().split(""))
          }
        })
        .catch((err) => console.error("Pin generation failed:", err))
    }
  }, [bookingData])

  // ================= UI STATES =================

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50 pb-8">
        <BackHeader />
        <div className="max-w-xl mx-auto px-4 space-y-6">
          <Skeleton className="h-32 w-full rounded-2xl" />
          <Skeleton className="h-24 w-full rounded-2xl" />
          <Skeleton className="h-32 w-full rounded-2xl" />
        </div>
      </main>
    )
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-white">
        <BackHeader />
        <div className="px-4 py-10">
          <ErrorState
            title="Failed to load booking"
            message={error?.message || "We couldn't retrieve your current booking status."}
            onRetry={() => refetch()}
          />
        </div>
      </main>
    )
  }

  if (!bookingData) {
    return (
      <main className="min-h-screen bg-white">
        <BackHeader />
        <div className="px-4 py-10">
          <EmptyState
            title="No active booking"
            message="You don't have any bookings currently in progress."
            icon={Calendar}
          />
        </div>
      </main>
    )
  }

  // ================= DATA =================

  const worker = bookingData.worker || {
    name: "Finding worker...",
    categories: "Professional",
    rating: "4.5",
    imageURL: "/images/worker-thumb.jpg"
  }

  const statusTitle =
    bookingData.status === "arrived"
      ? "Professional Arrived"
      : "Professional on the way"

  // ================= UI =================

  return (
    <main className="min-h-screen bg-gray-100 pb-8">
      <BackHeader />

      <div className="max-w-xl mx-auto px-4 space-y-6">

        {/* STATUS CARD */}
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-2xl p-5 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">{statusTitle}</p>
              <p className="text-3xl font-bold mt-1">
                {bookingData.eta || "Calculating..."}
              </p>
              <p className="text-sm opacity-90 mt-1">
                {bookingData.location
                  ? `${bookingData.location} • `
                  : ""}
                Live updates
              </p>
            </div>

            <div className="w-14 h-14 rounded-xl overflow-hidden border border-white/30 bg-emerald-400/20">
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
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-emerald-100">
            <p className="text-xs font-semibold text-emerald-600 mb-3 uppercase tracking-wider">
              Start Service PIN
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Share this PIN with the professional when they arrive.
            </p>

            <div className="flex gap-3">
              {startPin.map((n, i) => (
                <div
                  key={i}
                  className="flex-1 h-14 flex items-center justify-center text-2xl font-bold rounded-xl border bg-gray-50 text-gray-800"
                >
                  {n}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* WORKER CARD */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">

            <div className="w-16 h-16 rounded-full overflow-hidden border bg-gray-50">
              <Image
                src={worker.imageURL || "/images/worker-thumb.jpg"}
                alt={worker.name}
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-emerald-600 uppercase">
                {worker.categories}
              </p>

              <p className="text-base font-semibold text-gray-800 truncate">
                {worker.name}
              </p>

              <div className="flex items-center gap-1 mt-1 text-sm bg-yellow-50 w-fit px-2 py-0.5 rounded-md">
                <span className="font-bold text-yellow-700">
                  {worker.rating}
                </span>
                <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.3 7.2 20l1.1-5.3L4 12.2l5.4-.5L12 7l2.6 4.7 5.4.5-4.3 2.5L16.8 20z" />
                </svg>
              </div>
            </div>

            <div className="p-3 bg-gray-50 rounded-2xl">
              <Image
                src="/images/motorbike.png"
                alt="vehicle"
                width={28}
                height={28}
              />
            </div>
          </div>
        </div>

        {/* ADDRESS */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <p className="text-xs font-semibold text-gray-400 uppercase">
            Service Address
          </p>

          <p className="text-base font-semibold text-gray-800 mt-1">
            {bookingData.customer?.address || "Fetching address..."}
          </p>
        </div>

        {/* SUMMARY */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
          <h3 className="text-base font-semibold text-gray-800">
            Booking Summary
          </h3>

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Service</span>
            <span className="font-semibold text-gray-800">
              {bookingData.worker?.categories || "Professional Service"}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Booking ID</span>
            <span className="font-mono text-gray-400">
              #{bookingData.id?.split("-")[0] || "12345"}
            </span>
          </div>

          <button className="w-full mt-2 px-4 py-3 rounded-xl border border-red-100 text-red-600 font-semibold hover:bg-red-50">
            Cancel Service
          </button>
        </div>

      </div>
    </main>
  )
}
