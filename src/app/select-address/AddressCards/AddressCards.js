// file: app/select-address/AddressCards/AddressCards.js
'use client'

import { MoreVertical } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export default function AddressCards({ addresses = [], onEdit, onDelete, onSelect }) {
  const [openMenuIndex, setOpenMenuIndex] = useState(null)
  const menuRefs = useRef([])

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        openMenuIndex !== null &&
        menuRefs.current[openMenuIndex] &&
        !menuRefs.current[openMenuIndex].contains(e.target)
      ) {
        setOpenMenuIndex(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [openMenuIndex])

  return (
    <div className="px-4 mt-4">
      {addresses.map((addr, idx) => {
        const label = (addr.label ?? '').toString().trim()
        const showLabel = label !== '' && label.toLowerCase() !== 'home'

        return (
          <div
            key={addr.id ?? idx}
            className="relative bg-white border border-gray-300 rounded-2xl shadow-sm p-4 mb-4"
          >
            <div className="flex items-start justify-between gap-3">
              {/* Main content (clickable) */}
              <div
                className="min-w-0 flex-1 cursor-pointer"
                onClick={() => onSelect?.(addr)}
              >
                {showLabel && (
                  <div className="font-semibold text-black text-sm leading-tight">{label}</div>
                )}
                <p className="text-sm text-gray-700 leading-snug mt-1 truncate">
                  {addr.address}
                </p>
                <p className="text-sm font-semibold mt-2 text-gray-800">
                  Phone Number: <span className="font-bold">{addr.phone}</span>
                </p>
              </div>

              {/* Menu */}
              <div className="relative" ref={(el) => (menuRefs.current[idx] = el)}>
                <button
                  onClick={() => setOpenMenuIndex((s) => (s === idx ? null : idx))}
                  aria-label="open menu"
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <MoreVertical size={18} />
                </button>

                {openMenuIndex === idx && (
                  <div className="absolute right-0 top-8 z-20 w-32 bg-white border border-gray-200 rounded-lg shadow-md">
                    <button
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                      onClick={() => {
                        setOpenMenuIndex(null)
                        onEdit?.(idx)
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50"
                      onClick={() => {
                        setOpenMenuIndex(null)
                        onDelete?.(idx)
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
