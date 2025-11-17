'use client'

import { Mic } from 'lucide-react'

export default function SearchBar() {
  return (
    <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5 text-pink-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
        />
      </svg>
      <input
        type="text"
        placeholder="Restaurant name or a dish..."
        className="ml-2 flex-1 bg-transparent outline-none text-sm"
      />
      <Mic className="text-pink-500 w-5 h-5" />
    </div>
  )
}
