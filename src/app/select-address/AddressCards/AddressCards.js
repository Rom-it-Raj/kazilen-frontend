'use client'

import { Home, MoreVertical } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export default function AddressCards({ addresses, onEdit, onDelete, onSelect }) {
  const [openMenuIndex, setOpenMenuIndex] = useState(null)
  const menuRefs = useRef([])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openMenuIndex !== null &&
        menuRefs.current[openMenuIndex] &&
        !menuRefs.current[openMenuIndex].contains(event.target)
      ) {
        setOpenMenuIndex(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [openMenuIndex])

  return (
    <div className="px-4 mt-4">
      {addresses.map((addr, idx) => (
        <div
          key={idx}
          className="relative bg-white border rounded-xl shadow-sm p-4 mb-4"
        >
          <div className="flex items-start justify-between">
            <div
              className="flex gap-3 cursor-pointer"
              onClick={() => onSelect(addr)}
            >
              <div className="flex flex-col items-center text-gray-500">
                <Home size={18} />
                <span className="text-[10px] mt-1">{addr.distance}</span>
              </div>
              <div>
                <div className="font-semibold text-black">{addr.label}</div>
                <p className="text-sm text-gray-700">{addr.address}</p>
                <p className="text-sm font-semibold mt-1 text-gray-800">
                  Phone Number: {addr.phone}
                </p>
              </div>
            </div>

            <div className="relative" ref={(el) => (menuRefs.current[idx] = el)}>
              <button onClick={() => setOpenMenuIndex(idx)}>
                <MoreVertical size={18} />
              </button>

              {openMenuIndex === idx && (
                <div className="absolute right-0 top-6 z-10 w-28 bg-white border border-gray-200 rounded-lg shadow-md">
                  <button
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                    onClick={() => onEdit(idx)}
                  >
                    Edit
                  </button>
                  <button
                    className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50"
                    onClick={() => onDelete(idx)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
