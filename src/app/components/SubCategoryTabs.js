'use client'
import { useState } from 'react'

const subCategories = [
  'Book a Consultant',
  'Fixed Service Charge',
  'Book by Hour'
]

export default function SubCategoryTabs({ value, onChange }) {
  const [active, setActive] = useState(value)

  const handleClick = (sub) => {
    setActive(sub)
    onChange?.(sub)
  }

  return (
    <div className="px-4 mt-3">
      <div className="flex overflow-x-auto gap-3">
        {subCategories.map((sub) => {
          const isActive = active === sub
          return (
            <button
              key={sub}
              onClick={() => handleClick(sub)}
              className={`flex-1 text-sm py-2 rounded-xl border transition-all duration-200
                ${
                  isActive
                    ? 'bg-pink-100 border-pink-500 text-pink-600 font-semibold shadow-sm'
                    : 'bg-white border-gray-300 text-gray-600 hover:border-pink-400'
                }`}
            >
              {sub}
            </button>
          )
        })}
      </div>
    </div>
  )
}
