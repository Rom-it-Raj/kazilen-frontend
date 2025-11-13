// app/login/page.js
'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { checkPhone } from '../lib/api' // adjust path if your file is elsewhere

const LEGACY_USER_KEYS = ['userId', 'kazilen_user_id', 'kazilen_userId', 'kazilen_user_id_v2']

export default function LoginPage() {
  const router = useRouter()
  const [phone, setPhone] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const modalRef = useRef(null)

  const clearSavedUserKeys = () => {
    for (const k of LEGACY_USER_KEYS) localStorage.removeItem(k)
  }

  const handleContinue = async () => {
    if (!/^\d{10}$/.test(phone)) {
      alert('Please enter a valid 10-digit mobile number')
      return
    }

    try {
      setLoading(true)

      // If the phone typed is different from a previously saved phone,
      // clear any stored userId so we don't reuse stale user data.
      const savedPhone = localStorage.getItem('kazilen_user_phone')
      if (savedPhone && savedPhone !== phone) {
        console.log('Phone changed; clearing stale userId keys.')
        clearSavedUserKeys()
      }

      const result = await checkPhone(phone)

      // Always save phone locally so other pages can look it up
      localStorage.setItem('kazilen_user_phone', phone)

      if (result?.exists) {
        // If backend returned userId, save it under both legacy and canonical keys
        if (result.userId) {
          localStorage.setItem('kazilen_user_id', String(result.userId))
          // canonical key used by many components
          localStorage.setItem('userId', String(result.userId))
        }

        // navigate to home (or profile)
        router.push('/')
      } else {
        // not found -> go to create-account with phone prefilled
        router.push(`/create-account?phone=${encodeURIComponent(phone)}`)
      }
    } catch (e) {
      alert(`Failed to check phone: ${e?.message ?? e}`)
    } finally {
      setLoading(false)
    }
  }

  const handlePhoneInput = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, '')
    if (digitsOnly.length <= 10) setPhone(digitsOnly)
  }

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowModal(false)
      }
    }
    if (showModal) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showModal])

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-6 bg-white relative">
      <h1 className="text-3xl font-bold mb-2">Kazilen</h1>

      <div className="mt-4 w-full max-w-sm">
        <p className="text-sm font-semibold text-black mb-4">
          Login <span className="text-gray-600">or Create Account</span>
        </p>

        <label className="block text-sm text-black mb-1">Enter mobile number</label>
        <input
          type="tel"
          inputMode="numeric"
          pattern="\d*"
          placeholder="9876543210"
          value={phone}
          onChange={handlePhoneInput}
          className="w-full px-4 py-3 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm mb-4"
        />

        <button
          onClick={handleContinue}
          disabled={loading}
          className={`w-full bg-yellow-400 text-black font-semibold py-3 rounded-xl transition ${
            loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-yellow-500'
          }`}
        >
          {loading ? 'Checking…' : 'Continue'}
        </button>
      </div>

      {/* Shortcut buttons */}
      <div className="mt-6 w-full max-w-sm flex gap-3">
        <button
          onClick={() => router.push('/')}
          className="w-1/2 border border-gray-400 py-2 rounded-xl font-medium hover:bg-gray-100"
        >
          Login → Home
        </button>
        <button
          onClick={() => router.push('/create-account')}
          className="w-1/2 border border-gray-400 py-2 rounded-xl font-medium hover:bg-gray-100"
        >
          Create Account
        </button>
      </div>

      <p className="text-[11px] text-center text-gray-600 mt-4">
        By continuing, I agree to{' '}
        <button onClick={() => setShowModal(true)} className="text-blue-600 underline">
          Terms of Service
        </button>
      </p>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center">
          <div
            ref={modalRef}
            className="bg-white rounded-xl max-w-md w-[90%] p-6 shadow-xl relative"
          >
            <h2 className="text-lg font-bold mb-3">Terms of Service</h2>
            <div className="text-sm text-gray-700 max-h-[300px] overflow-y-auto">
              <p>
                This is a placeholder for the Terms of Service. Replace this text
                with your actual terms and conditions...
              </p>
            </div>
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-sm"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
