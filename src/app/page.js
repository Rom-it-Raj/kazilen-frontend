"use client"
import { useEffect, useState } from 'react'
import CategoryTabs from './components/CategoryTabs'
import SubCategoryTabs from './components/SubCategoryTabs'
import ProfessionalCard from './components/ProfessionalCard'
import { getProfessionals } from './lib/getProfessionals'

export default function HomePage() {
  const [category, setCategory] = useState('')
  const [subCategory, setSubCategory] = useState('')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!category) return

    const run = async () => {
      setLoading(true)
      setError('')
      try {
        const data = await getProfessionals({
          category,
          subCategory: subCategory || 'All',
        })
        setItems(data?.items || [])
      } catch (e) {
        setError(e.message || 'Failed to load data')
        setItems([])
      } finally {
        setLoading(false)
      }
    }

    run()
  }, [category, subCategory])

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Category Tabs */}
      <CategoryTabs
        value={category}
        onChange={(val) => {
          setCategory(val)
          setSubCategory('')
        }}
      />

      {/* SubCategory Tabs */}
      {category && (
        <SubCategoryTabs
          value={subCategory}
          onChange={(val) => setSubCategory(val)}
        />
      )}

      {/* Professionals List */}
      <section className="px-4 mt-6">
        {loading && (
          <p className="text-center text-gray-500">Loading professionals...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && items.length === 0 && !error && (
          <p className="text-center text-gray-500 mt-6">
            No professionals available in this category.
          </p>
        )}

        {/* Only one card per row (centered) */}
        <div className="flex flex-col items-center gap-6 mt-4">
          {items.map((pro, idx) => (
            <ProfessionalCard key={idx} professional={pro} />
          ))}
        </div>
      </section>
    </main>
  )
}
// dfgfdhejh