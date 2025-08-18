'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function EditAddressPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [form, setForm] = useState({
    label: '',
    address: '',
    phone: '',
    distance: '',
  })

  useEffect(() => {
    const label = searchParams.get('label') || ''
    const address = searchParams.get('address') || ''
    const phone = searchParams.get('phone') || ''
    const distance = searchParams.get('distance') || ''

    setForm({ label, address, phone, distance })
  }, [searchParams])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    alert('Updated address: ' + JSON.stringify(form, null, 2))
    router.push('/select-address') // optionally pass updated data back using context/localStorage
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="flex items-center gap-3 p-4 shadow-sm border-b">
        <button onClick={() => router.back()} className="text-gray-700">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">Edit Address</h1>
      </div>

      <div className="p-4 space-y-4">
        {[
          { label: 'Label (e.g. Home)', name: 'label' },
          { label: 'Address', name: 'address' },
          { label: 'Phone Number', name: 'phone' },
          { label: 'Distance', name: 'distance' },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-sm text-gray-600 mb-1">{field.label}</label>
            <input
              name={field.name}
              value={form[field.name]}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
            />
          </div>
        ))}

        <button
          onClick={handleSubmit}
          className="w-full bg-orange-500 text-white rounded-lg py-2 mt-6 font-semibold hover:bg-orange-600 transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  )
}
