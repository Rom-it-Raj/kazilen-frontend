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
    const updated = {}
    Object.keys(form).forEach((key) => {
      const val = searchParams.get(key)
      if (val) updated[key] = val
    })
    if (Object.keys(updated).length) {
      setForm((prev) => ({ ...prev, ...updated }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    alert('Saved (frontend only):\n' + JSON.stringify(form, null, 2))
    router.push('/select-address')
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="flex items-center gap-3 p-4 shadow-sm border-b">
        <button onClick={() => router.back()}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">Edit Address</h1>
      </div>

      <div className="p-4 space-y-4">
        {Object.entries(form).map(([key, value]) => (
          <div key={key}>
            <label className="block text-sm text-gray-600 mb-1">
              {key}
            </label>
            <input
              name={key}
              value={value}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>
        ))}

        <button
          onClick={handleSubmit}
          className="w-full bg-orange-500 text-white rounded-lg py-2 mt-6 font-semibold hover:bg-orange-600"
        >
          Save Changes
        </button>
      </div>
    </div>
  )
}
