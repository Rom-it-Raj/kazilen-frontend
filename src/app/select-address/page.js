'use client'

import { useRouter } from 'next/navigation'
import { ChevronDown, ChevronRight, MapPin, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import AddressCards from './AddressCards/AddressCards'
import { getAddressesByUser, deleteAddress } from '@/app/lib/api' // adjust import if not using path alias

export default function SelectAddressPage() {
  const router = useRouter()
  const [savedAddresses, setSavedAddresses] = useState([])
  const [loading, setLoading] = useState(false)

  const goHome = () => router.push('/')
  const handleUseCurrentLocation = () => alert('Fetching current location...')
  const handleAddAddress = () => router.push('/select-address/add')

  // helper: read userId from localStorage (dev). Replace with real auth in production.
  const getUserId = () => {
    if (typeof window === 'undefined') return null
    const uid = localStorage.getItem('userId')
    return uid ? Number(uid) : null
  }

  // helper to map backend AddressResponse -> UI shape used by AddressCards
  const toUiAddress = (a) => {
    // a: AddressResponse from backend (addressLine1, addressLine2, city, state, phone, label, id)
    const parts = []
    if (a.getAddressLine1) {
      // if DTO is plain object (not class with getters), use direct props
      const line1 = a.addressLine1 ?? a.address_line1 ?? a.addressLine1
      const line2 = a.addressLine2 ?? a.address_line2 ?? a.addressLine2
      if (line1) parts.push(line1)
      if (line2) parts.push(line2)
    }
    // fallback for older shaped objects:
    const addressLine1 = a.addressLine1 ?? a.address_line1 ?? a.addressLine1 ?? ''
    const addressLine2 = a.addressLine2 ?? a.address_line2 ?? a.addressLine2 ?? ''
    const city = a.city ?? ''
    const state = a.state ?? ''

    const addressParts = [addressLine1, addressLine2, city, state].filter(Boolean)
    const displayAddress = addressParts.join(', ')

    return {
      id: a.id ?? a.id,
      label: a.label ?? '',
      address: displayAddress || (a.full_name ? a.full_name : ''),
      phone: a.phone ?? '',
      // include full raw object if parent needs it
      _raw: a,
    }
  }

  const loadAddresses = async () => {
    const userId = getUserId()
    if (!userId) {
      // dev fallback: show an example address (or empty list)
      setSavedAddresses([
        {
          id: 'demo-1',
          label: 'Home',
          address: 'Seven heights, 4 floor, Buttibori, Nagpur, India',
          phone: '+919302585476',
        },
      ])
      return
    }

    try {
      setLoading(true)
      const data = await getAddressesByUser(userId)
      // data should be an array of AddressResponse objects
      const ui = (data || []).map(toUiAddress)
      setSavedAddresses(ui)
    } catch (err) {
      console.error('Failed to load addresses', err)
      setSavedAddresses([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAddresses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDelete = async (idx) => {
    const addr = savedAddresses[idx]
    if (!addr) return
    if (!confirm('Delete this address?')) return
    try {
      // call backend delete only if real id (not demo)
      if (addr.id && !String(addr.id).startsWith('demo')) {
        await deleteAddress(addr.id)
      }
      const copy = [...savedAddresses]
      copy.splice(idx, 1)
      setSavedAddresses(copy)
    } catch (err) {
      console.error(err)
      alert('Failed to delete address: ' + (err.message || 'unknown'))
    }
  }

  const handleEdit = (idx) => {
    const addr = savedAddresses[idx]
    if (!addr) return
    // you can implement edit page at /select-address/edit/[id]
    if (addr.id && !String(addr.id).startsWith('demo')) {
      router.push(`/select-address/edit/${addr.id}`)
    } else {
      alert('Edit not available for demo address')
    }
  }

  const handleSelect = (addr) => {
    // set selected address in localStorage or global store
    localStorage.setItem('selectedAddress', JSON.stringify(addr._raw ?? addr))
    router.back()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div onClick={goHome} className="flex items-center gap-2 px-4 py-3 cursor-pointer">
        <ChevronDown size={18} />
        <span className="font-semibold text-black">Select a location</span>
      </div>

      {/* Location Container */}
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
            <div className="ml-6 text-xs text-gray-500">Jayant, India</div>
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

      {/* Saved Address Divider */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-center">
          <div className="border-t border-gray-300 flex-grow mr-2" />
          <span className="text-xs font-semibold text-gray-700">SAVED ADDRESSES</span>
          <div className="border-t border-gray-300 flex-grow ml-2" />
        </div>
      </div>

      {/* Address Cards */}
      {loading ? (
        <div className="p-4">Loading...</div>
      ) : (
        <AddressCards
          addresses={savedAddresses}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSelect={handleSelect}
        />
      )}
    </div>
  )
}
