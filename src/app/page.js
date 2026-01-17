'use client'

import { useState } from 'react'
import CategoryTabs from './components/CategoryTabs'
import SubCategoryTabs from './components/SubCategoryTabs'
import ProfessionalCard from './components/ProfessionalCard'

export default function HomePage() {
  const [category, setCategory] = useState('Electrician')
  const [subCategory, setSubCategory] = useState('')

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Category */}
      <CategoryTabs
        value={category}
        onChange={(val) => {
          setCategory(val)
          setSubCategory('')
        }}
      />

      {/* Sub Category */}
      {category && (
        <SubCategoryTabs
          value={subCategory}
          onChange={setSubCategory}
        />
      )}

      {/* Placeholder UI (pure frontend) */}
      <section className="px-4 mt-6 text-center text-gray-500">
        {category && !subCategory && 'Select a sub-category'}
        {subCategory && (
          <ProfessionalCard
            professional={{
              name: 'Demo Electrician',
              skill: subCategory,
              price: 250,
            }}
          />
        )}
      </section>
    </main>
  )
}
