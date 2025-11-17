'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function EditAddressPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    landmark: '',
    pin: '',
    city: '',
    state: '',
  })

  useEffect(() => {
    // Try to prefill fields from query params (if present).
    // e.g. /select-address/edit?fullName=Bharat&phone=987...
    const keys = Object.keys(form)
    const prefills = {}
    keys.forEach((k) => {
      const val = searchParams.get(k)
      if (val !== null) prefills[k] = val
    })
    if (Object.keys(prefills).length) {
      setForm((prev) => ({ ...prev, ...prefills }))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]) // form not included intentionally

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    // Replace alert with API call to update address when backend is ready
    alert('Updated address: ' + JSON.stringify(form, null, 2))
    router.push('/select-address')
  }

  const fields = [
    { label: 'Full name (First and Last name)', name: 'fullName', type: 'text', placeholder: 'e.g. Bharat Singh' },
    { label: 'Mobile Number', name: 'phone', type: 'tel', placeholder: 'e.g. 9876543210' },
    { label: 'Flat, House no., Building, Company, Apartment', name: 'addressLine1', type: 'text', placeholder: 'e.g. IIIT NAGPUR' },
    { label: 'Area, Street, Sector, Village', name: 'addressLine2', type: 'text', placeholder: 'e.g. near soot girni' },
    { label: 'Landmark', name: 'landmark', type: 'text', placeholder: 'e.g. Next to MNLU college' },
    { label: 'PIN Code', name: 'pin', type: 'text', placeholder: 'e.g. 482002' },
    { label: 'Town/City', name: 'city', type: 'text', placeholder: 'e.g. BUTIBORI' },
    { label: 'State', name: 'state', type: 'text', placeholder: 'e.g. Madhya Pradesh' }
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="flex items-center gap-3 p-4 shadow-sm border-b">
        <button onClick={() => router.back()} className="text-gray-700">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">Edit Address</h1>
      </div>

      <div className="p-4 space-y-4">
        {fields.map((field) => (
          <div key={field.name}>
            <label className="block text-sm text-gray-600 mb-1">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={form[field.name] ?? ''}
              onChange={handleChange}
              placeholder={field.placeholder}
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
