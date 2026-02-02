'use client'

import { useRouter } from 'next/navigation'
import { ChevronDown, ChevronRight, MapPin, Plus } from 'lucide-react'
import { useState } from 'react'
import AddressCards from './AddressCards/AddressCards'

export default function SelectAddressPage() {
  const router = useRouter()

  const [savedAddresses, setSavedAddresses] = useState([
    {
      id: '1',
      label: 'Home',
      address: 'Seven Heights, 4th Floor, Butibori, Nagpur, India',
      phone: '+91 93025 85476',
    },
    {
      id: '2',
      label: 'Work',
      address: 'IT Park, MIHAN, Nagpur, India',
      phone: '+91 98765 43210',
    },
  ])

  const goHome = () => router.push('/')
  const handleUseCurrentLocation = () =>
    alert('Current location will be enabled later')

  const handleAddAddress = () => router.push('/select-address/add')

  const handleDelete = (idx) => {
    if (!confirm('Delete this address?')) return
    setSavedAddresses((prev) => prev.filter((_, i) => i !== idx))
  }

  const handleEdit = (idx) => {
    const addr = savedAddresses[idx]
    if (!addr) return

    const params = new URLSearchParams({
      label: addr.label || '',
      phone: addr.phone || '',
      addressLine1: addr.address || '',
    })

    router.push(`/select-address/edit?${params.toString()}`)
  }

  const handleSelect = (addr) => {
    alert(`Selected address:\n${addr.address}`)
    router.back()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div
        onClick={goHome}
        className="flex items-center gap-2 px-4 py-3 cursor-pointer"
      >
        <ChevronDown size={18} />
        <span className="font-semibold text-black">Select a location</span>
      </div>

      {/* Location Actions */}
      <div className="mx-4 mt-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div
          onClick={handleUseCurrentLocation}
          className="flex justify-between items-start p-4 border-b border-gray-200 cursor-pointer"
        >
          <div>
            <div className="flex items-center gap-2 font-medium text-gray-800">
              <MapPin size={16} />
              Use current location
            </div>
            <div className="ml-6 text-xs text-gray-500">Nagpur, India</div>
          </div>
          <ChevronRight size={16} className="text-gray-400 mt-1" />
        </div>

        <div
          onClick={handleAddAddress}
          className="flex justify-between items-center p-4 cursor-pointer"
        >
          <div className="flex items-center gap-2 font-medium text-gray-800">
            <Plus size={16} />
            Add Address
          </div>
          <ChevronRight size={16} className="text-gray-400" />
        </div>
      </div>

      {/* Divider */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-center">
          <div className="border-t border-gray-300 flex-grow mr-2" />
          <span className="text-xs font-semibold text-gray-700">
            SAVED ADDRESSES
          </span>
          <div className="border-t border-gray-300 flex-grow ml-2" />
        </div>
      </div>

      {/* Address Cards */}
      <AddressCards
        addresses={savedAddresses}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSelect={handleSelect}
      />
    </div>
  )
}
