"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

export default function BookingStatusPage() {
  const [chatOpen, setChatOpen] = useState(false)
  const [tripOpen, setTripOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, from: "worker", text: "Hi, I'm on my way." },
    { id: 2, from: "you", text: "Awesome, thanks!" }
  ])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const booking = {
    title: "Reach in",
    eta: "15 min",
    subtitle: "Captain 298 m away",
    avatar: "/images/provider-thumb.jpg"
  }

  const worker = {
    role: "ELECTRICIAN",
    name: "Vinod Kumar Manjhi Manjhi",
    avatar: "/images/worker-thumb.jpg",
    rating: 4.7
  }

  // sample pickup address (replace with real data)
  const pickup = {
    label: "Pickup From",
    address: "1885, New Shastri Nagar, Shastri Nagar, Jabalpur, Madhya Pradesh 482003, India"
  }

  // TRIP details (photo, fare, payment) — replace paths / values with real ones
  const trip = {
    photo: "/images/trip-photo.jpg", // put your uploaded photo here
    caption: "Trip snapshot — vehicle & pickup location",
    fare: 34, // total fare numeric (₹)
    paymentMethod: "GPay"
  }

  function openChat() {
    setChatOpen(true)
  }

  function closeChat() {
    setChatOpen(false)
  }

  function openTrip() {
    setTripOpen(true)
  }

  function closeTrip() {
    setTripOpen(false)
  }

  function sendMessage(e) {
    e?.preventDefault()
    const text = input.trim()
    if (!text) return
    const next = { id: Date.now(), from: "you", text }
    setMessages((m) => [...m, next])
    setInput("")
    // mock worker reply after a short delay (optional)
    setTimeout(() => {
      setMessages((m) => [...m, { id: Date.now() + 1, from: "worker", text: "Got it — thanks!" }])
    }, 900)
  }

  // scroll to bottom when messages change or chat opens
  useEffect(() => {
    if (chatOpen) {
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" }), 80)
      inputRef.current?.focus()
    }
  }, [messages, chatOpen])

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-xl mx-auto w-full">

        {/* Heading */}
        <h2 className="text-sm sm:text-base text-gray-500 mb-3">Current booking</h2>

        {/* Booking Card */}
        <div className="w-full bg-white rounded-xl border border-gray-100 shadow-sm 
                        p-4 sm:p-5 flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2">
              <span className="text-base sm:text-lg font-semibold text-gray-800">
                {booking.title}
              </span>
              <span className="text-base sm:text-lg font-bold text-emerald-600">
                {booking.eta}
              </span>
            </div>
            <p className="mt-1 text-sm sm:text-base text-gray-400 truncate">
              {booking.subtitle}
            </p>
          </div>

          <div className="w-14 h-14 rounded-md overflow-hidden bg-gray-100 border border-gray-100 flex-shrink-0">
            <Image
              src={booking.avatar}
              alt="provider"
              width={56}
              height={56}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* PIN Section */}
        <div className="mt-5">
          <div className="flex items-center justify-between w-full">
            <p className="text-sm sm:text-base text-gray-600">Start your order with PIN</p>

            <div className="flex items-center gap-2">
              {[7, 7, 1, 1].map((n, i) => (
                <div
                  key={i}
                  className="w-10 h-10 flex items-center justify-center text-lg font-semibold 
                             bg-white border border-gray-300 rounded-md shadow-sm"
                >
                  {n}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Worker Detail Card */}
        <div className="mt-5 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-4 sm:p-5 flex gap-4 items-start">
            <div className="flex-1 min-w-0">
              <h3 className="flex items-center gap-3">
                {/* optional small vehicle icon */}
                <span className="inline-block w-7 h-7">
                  <Image src="/images/motorbike.png" alt="vehicle" width={28} height={28} className="object-contain"/>
                </span>
                <span className="text-sm sm:text-base font-bold text-gray-800 tracking-wide">{worker.role}</span>
              </h3>

              <p className="mt-2 text-sm text-gray-500 truncate">{worker.name}</p>
            </div>

            <div className="flex-shrink-0 flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-100 bg-gray-100">
                <Image
                  src={worker.avatar}
                  alt={worker.name}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="mt-1 inline-flex items-center gap-1 bg-white px-2 py-1 rounded-full 
                              border border-gray-200 shadow-sm text-sm">
                <span className="font-semibold">{worker.rating.toFixed(1)}</span>
                <svg className="w-4 h-4 text-yellow-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 17.3 7.2 20l1.1-5.3L4 12.2l5.4-.5L12 7l2.6 4.7 5.4.5-4.3 2.5L16.8 20z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Chat button full width */}
          <div className="px-4 pb-4 sm:px-5">
            <button
              onClick={openChat}
              className="mt-2 w-full flex items-center gap-3 px-4 py-3 rounded-xl 
                         bg-white border border-gray-200 shadow-sm text-sm text-gray-700 
                         hover:shadow-md transition"
            >
              <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path 
                  d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1-2 2v10z" 
                  stroke="currentColor" 
                  strokeWidth="1.2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>

              <span className="text-sm font-medium">Message {worker.name.split(" ")[0]}</span>
            </button>
          </div>
        </div>

        {/* Pickup row with Trip Details */}
        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-500">{pickup.label}</p>
            <p className="text-base font-semibold text-gray-800 truncate">{pickup.address}</p>
          </div>

          <div className="flex-shrink-0">
            <button
              onClick={openTrip}
              className="ml-3 px-4 py-2 rounded-full border border-gray-200 bg-white text-sm text-gray-700 shadow-sm hover:shadow-md"
            >
              Trip Details
            </button>
          </div>
        </div>

        {/* -------------------- Chat Drawer -------------------- */}
        {/* Backdrop */}
        <div
          className={`fixed inset-0 z-40 transition-opacity duration-200 ${chatOpen ? "opacity-60 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          onClick={closeChat}
        />

        {/* Drawer */}
        <div className={`fixed left-0 right-0 bottom-0 z-50 flex justify-center pointer-events-none`}>
          <div
            className={`w-full max-w-xl pointer-events-auto transform transition-all duration-250 bg-transparent ${chatOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
            aria-hidden={!chatOpen}
          >
            <div className="mx-4 mb-4 bg-white rounded-xl shadow-lg overflow-hidden">
              {/* header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                    <Image src={worker.avatar} alt={worker.name} width={40} height={40} className="object-cover w-full h-full"/>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800">{worker.name.split(" ")[0]}</div>
                    <div className="text-xs text-gray-500">{worker.role}</div>
                  </div>
                </div>

                <div>
                  <button onClick={closeChat} aria-label="Close chat" className="p-2 rounded-md hover:bg-gray-50">
                    <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* messages */}
              <div className="max-h-64 overflow-y-auto px-4 py-3 space-y-3 bg-white">
                {messages.map((m) => (
                  <div key={m.id} className={`flex ${m.from === "you" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] px-3 py-2 rounded-lg ${m.from === "you" ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-800"}`}>
                      <div className="text-sm">{m.text}</div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* input */}
              <form onSubmit={sendMessage} className="px-3 pb-4 pt-2">
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                  />
                  <button type="submit" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700">
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* -------------------- Trip Drawer -------------------- */}
        {/* Backdrop */}
        <div
          className={`fixed inset-0 z-40 transition-opacity duration-200 ${tripOpen ? "opacity-60 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          onClick={closeTrip}
        />

        {/* Drawer */}
        <div className={`fixed left-0 right-0 bottom-0 z-50 flex justify-center pointer-events-none`}>
          <div
            className={`w-full max-w-xl pointer-events-auto transform transition-all duration-250 bg-transparent ${tripOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
            aria-hidden={!tripOpen}
          >
            <div className="mx-4 mb-4 bg-white rounded-xl shadow-lg overflow-hidden">
              {/* trip header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <div>
                  <div className="text-sm font-semibold text-gray-800">Location Details</div>
                </div>

                <div>
                  <button onClick={closeTrip} aria-label="Close trip" className="p-2 rounded-md hover:bg-gray-50">
                    <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* content: location, fare, payment, cancel button and photo */}
              <div className="px-4 py-4 space-y-4">
                {/* location block */}
                <div>
                  <div className="text-sm text-gray-500">1885</div>
                  <div className="mt-1 text-sm text-gray-600">{pickup.address}</div>
                </div>

                {/* fare row */}
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">Total Fare</div>
                  <div className="text-lg font-semibold">₹{trip.fare}</div>
                </div>

                {/* payment method */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-xs text-gray-400">G Pay</div>
                    <div className="text-sm text-gray-600">Paying via {trip.paymentMethod}</div>
                  </div>
                  <button onClick={() => alert("Change payment method")} className="text-sm text-blue-600">Change</button>
                </div>

                {/* photo preview */}
                <div className="rounded-md overflow-hidden bg-gray-100 border border-gray-100">
                  <Image
                    src={trip.photo}
                    alt={trip.caption}
                    width={900}
                    height={600}
                    className="object-cover w-full h-auto"
                  />
                </div>

                {/* caption */}
                <div className="text-sm text-gray-700">{trip.caption}</div>

                {/* action row: Cancel Ride */}
                <div className="pt-2">
                  <button
                    onClick={() => alert("Ride cancelled")}
                    className="w-full px-4 py-3 rounded-full border border-red-300 text-red-700 bg-white hover:bg-red-50"
                  >
                    Cancel Ride
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </main>
  )
}
