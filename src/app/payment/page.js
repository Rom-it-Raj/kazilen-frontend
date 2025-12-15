"use client"

import { useState } from "react"
import Image from "next/image"

export default function PaymentPage() {
  const amount = 34.0
  const workerName = "Vinod Kumar Manjhi Manjhi"

  // paymentMethod: "gpay" | "phonepe" | "cash" | null
  const [paymentMethod, setPaymentMethod] = useState(null)

  const isNextEnabled = paymentMethod !== null

  const handleNext = () => {
    if (!paymentMethod) return

    // Later:
    // - if cash → confirm booking directly
    // - if upi → redirect to payment gateway
    console.log("Selected payment method:", paymentMethod)
  }

  return (
    <div className="w-full min-h-screen bg-white px-4 py-6 pb-24">
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-4">
        <div className="relative w-20 h-20 rounded-full overflow-hidden">
          <Image
            src="/images/worker-thumb.jpg"
            alt={workerName}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-300 bg-emerald-50">
          <span className="w-5 h-5 flex items-center justify-center rounded-full bg-emerald-500 text-white text-sm">
            ✓
          </span>
          <span className="text-emerald-700 text-sm font-semibold">
            TASK COMPLETED
          </span>
        </div>

        <h1 className="text-xl font-semibold text-gray-900">
          Select a payment method to pay
          <span className="block font-bold">{workerName}</span>
        </h1>

        <div className="text-3xl font-bold text-gray-900">
          ₹{amount.toFixed(1)}
        </div>
      </div>

      {/* Amount */}
      <div className="mt-10 flex justify-between items-center text-gray-600 font-semibold">
        <span>AMOUNT TO BE PAID</span>
        <span className="text-gray-900">₹{amount.toFixed(1)}</span>
      </div>

      {/* UPI */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-3">Pay by any UPI app</h2>

        <div className="bg-gray-100 rounded-2xl p-4 space-y-4">
          <p className="font-bold">UPI</p>

          {[
            { id: "gpay", label: "Google Pay", icon: "/images/gpay.png" },
            { id: "phonepe", label: "Phonepe UPI", icon: "/images/phonepe.png" },
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => setPaymentMethod(item.id)}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Image src={item.icon} alt={item.label} width={28} height={28} />
                <span className="text-gray-700">{item.label}</span>
              </div>

              <Radio checked={paymentMethod === item.id} />
            </div>
          ))}
        </div>
      </div>

      {/* Cash Option */}
      <div
        onClick={() => setPaymentMethod("cash")}
        className={`mt-4 bg-gray-100 rounded-2xl p-4 cursor-pointer flex items-center justify-between
          ${paymentMethod === "cash" ? "ring-2 ring-emerald-400" : ""}`}
      >
        <div>
          <p className="font-semibold text-gray-900">Cash</p>
          <p className="text-sm text-gray-600">
            Pay directly to the helper after service
          </p>
        </div>

        <Radio checked={paymentMethod === "cash"} />
      </div>

      {/* Next Button */}
      <div className="fixed bottom-0 left-0 w-full px-4 py-4 bg-white">
        <button
  onClick={handleNext}
  disabled={!isNextEnabled}
  className={`relative w-full rounded-full py-4 text-lg font-semibold transition-all duration-300
    ${
      isNextEnabled
        ? "bg-yellow-400 text-black active:scale-95"
        : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }`}
>
  {/* Center text */}
  <span className="block text-center">
    Next
  </span>

  {/* Right arrow */}
  <span
    className={`absolute right-6 top-1/2 -translate-y-1/2 text-xl transition-transform duration-300
      ${isNextEnabled ? "translate-x-1" : ""}`}
  >
    →
  </span>
</button>

      </div>
    </div>
  )
}

/* Reusable radio */
function Radio({ checked }) {
  return (
    <div
      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
        ${checked ? "border-emerald-500" : "border-gray-400"}`}
    >
      {checked && <div className="w-3 h-3 rounded-full bg-emerald-500" />}
    </div>
  )
}
