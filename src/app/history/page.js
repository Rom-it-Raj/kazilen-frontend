'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { MoreVertical } from 'lucide-react'
import StarRating from '../components/history/StarRating'


export default function HistoryItemCard({ order, onChange }) {
  // Destructure with safe fallbacks so we never read from undefined
  const {
    restaurantName = '',
    locality = '',
    image = '/placeholder.png',
    summary = '',
    placedAt = '',
    status = '',
    amount = 0,
    rating = 0,
    feedback = '',
  } = order || {}

  const [menuOpen, setMenuOpen] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackText, setFeedbackText] = useState(feedback)

  const slug = useMemo(
    () => (restaurantName ? restaurantName.toLowerCase().replace(/\s+/g, '-') : ''),
    [restaurantName]
  )

  const placedOn = useMemo(() => {
    if (!placedAt) return ''
    const d = new Date(placedAt)
    const date = d.toLocaleDateString(undefined, { day: '2-digit', month: 'short' })
    const time = d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
    return `${date}, ${time}`
  }, [placedAt])

  const handleRate = (stars) => {
    alert(`Rated ${stars} stars`)
    onChange?.()
  }

  const handleReorder = () => {
    alert('✅ Reorder placed!')
  }

  const handleDelete = () => {
    if (confirm('Delete this order from history?')) {
      alert('Order deleted!')
      onChange?.()
    }
  }

  const saveFeedback = () => {
    alert(`Feedback saved: ${feedbackText}`)
    setShowFeedback(false)
    onChange?.()
  }

  return (
    <div className="relative rounded-2xl bg-white shadow-sm border border-gray-200 p-3">
      {/* Top row */}
      <div className="flex gap-3">
        <div className="w-20 h-16 rounded bg-gray-200 overflow-hidden shrink-0">
          <Image
            src={image}
            alt={restaurantName || 'Restaurant'}
            width={80}
            height={64}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-semibold text-[16px] leading-5">
                {restaurantName || '—'}
              </p>
              <p className="text-sm text-gray-600 -mt-0.5">{locality}</p>
              {slug && (
                <Link href={`/restaurant/${slug}`} className="text-sm text-red-600 font-medium">
                  View menu ▸
                </Link>
              )}
            </div>

            <div className="relative">
              <button
                aria-label="More"
                onClick={() => setMenuOpen((v) => !v)}
                className="p-2"
              >
                <MoreVertical />
              </button>

              {menuOpen && (
                <div
                  className="absolute right-0 mt-2 w-40 rounded-xl border bg-white shadow-md z-20"
                  onMouseLeave={() => setMenuOpen(false)}
                >
                  <button
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                    onClick={() => alert('Order details…')}
                  >
                    View order details
                  </button>
                  <button
                    className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                    onClick={handleDelete}
                  >
                    Delete order
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Items summary */}
      {summary && <div className="mt-3 text-[15px] text-gray-800">{summary}</div>}

      {/* Placed on + amount */}
      <div className="mt-3 flex items-start justify-between text-sm text-gray-700">
        <div>
          {placedOn && <div>Order placed on {placedOn}</div>}
          {status && <div className="text-gray-600">{status}</div>}
        </div>
        <div className="font-semibold">₹{Number(amount || 0).toFixed(2)}</div>
      </div>

      {/* Rating / Feedback + Reorder */}
      <div className="mt-3 flex items-center justify-between">
        <div className="min-w-0">
          {typeof rating === 'number' && rating > 0 ? (
            <>
              <div className="text-[15px] font-semibold">
                You rated {rating} ★
              </div>
              <button
                className="mt-1 text-sm text-red-600 font-medium"
                onClick={() => setShowFeedback(true)}
              >
                View your feedback ▸
              </button>
            </>
          ) : (
            <div>
              <StarRating value={rating || 0} onChange={handleRate} />
              <button
                className="mt-1 text-sm text-red-600 font-medium"
                onClick={() => setShowFeedback(true)}
              >
                Give feedback ▸
              </button>
            </div>
          )}
        </div>

        <button
          onClick={handleReorder}
          className="shrink-0 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 font-semibold"
        >
          Order again
        </button>
      </div>

      {/* Feedback modal */}
      {showFeedback && (
        <div className="fixed inset-0 z-30 flex items-end sm:items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowFeedback(false)}
          />
          <div className="relative w-full sm:w-[420px] bg-white rounded-t-2xl sm:rounded-2xl p-4">
            <h3 className="text-base font-semibold">
              {feedback ? 'Your feedback' : 'Write feedback'}
            </h3>
            <textarea
              className="mt-2 w-full h-28 rounded-xl border p-3 text-sm"
              placeholder="Share your experience…"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
            />
            <div className="mt-3 flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded-xl border"
                onClick={() => setShowFeedback(false)}
              >
                Close
              </button>
              <button
                className="px-4 py-2 rounded-xl bg-black text-white"
                onClick={saveFeedback}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
