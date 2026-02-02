'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function EditAddressPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [form, setForm] = useState({
    label: '',
    phone: '',
    addressLine1: '',
  })

  useEffect(() => {
    setForm({
      label: searchParams.get('label') || '',
      phone: searchParams.get('phone') || '',
      addressLine1: searchParams.get('addressLine1') || '',
    })
  }, [searchParams])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    alert('Saved (frontend only):\n' + JSON.stringify(form, null, 2))
    router.push('/select-address')
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="flex items-center gap-3 p-4 border-b">
        <button onClick={() => router.back()}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">Edit Address</h1>
      </div>

      <div className="p-4 space-y-4">
        {[
          { label: 'Label', name: 'label' },
          { label: 'Phone', name: 'phone' },
          { label: 'Address', name: 'addressLine1' },
        ].map((f) => (
          <div key={f.name}>
            <label className="block text-sm text-gray-600 mb-1">
              {f.label}
            </label>
            <input
              name={f.name}
              value={form[f.name]}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>
        ))}

        <button
          onClick={handleSave}
          className="w-full bg-orange-500 text-white rounded-lg py-2 mt-6 font-semibold hover:bg-orange-600"
        >
          Save Changes
        </button>
      </div>
    </div>
  )
}
