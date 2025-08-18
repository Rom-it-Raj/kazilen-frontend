'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'

export default function AddAddressPage() {
  const router = useRouter()

  const [form, setForm] = useState({
    name: '',
    phone: '',
    pin: '',
    locality: '',
    city: '',
    state: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    alert('Address added: ' + JSON.stringify(form, null, 2))
    router.push('/select-address')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 shadow-sm border-b">
        <button onClick={() => router.back()} className="text-gray-700">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">Add Address</h1>
      </div>

      {/* Form */}
      <div className="p-4 space-y-4">
        {[
          { label: 'Full Name', name: 'name', type: 'text', placeholder: 'e.g. Bharat Singh' },
          { label: 'Phone Number', name: 'phone', type: 'tel', placeholder: 'e.g. 9876543210' },
          { label: 'PIN Code', name: 'pin', type: 'text', placeholder: 'e.g. 482002' },
          { label: 'Locality', name: 'locality', type: 'text', placeholder: 'e.g. Jayant Sector C' },
          { label: 'City', name: 'city', type: 'text', placeholder: 'e.g. Jayant' },
          { label: 'State', name: 'state', type: 'text', placeholder: 'e.g. Madhya Pradesh' },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-sm text-gray-600 mb-1">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={form[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
            />
          </div>
        ))}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-orange-500 text-white rounded-lg py-2 mt-6 font-semibold hover:bg-orange-600 transition"
        >
          Add Address
        </button>
      </div>
    </div>
  )
}
