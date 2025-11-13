// app/create-account/page.js
'use client'

import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createUser } from '@/app/lib/api'

export default function CreateAccountPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const phoneFromQuery = searchParams?.get('phone') || ''

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')          // optional
  const [dob, setDob] = useState('')              // YYYY-MM-DD (required)
  const [gender, setGender] = useState('')        // required: Male/Female/Other
  const [touched, setTouched] = useState({})      // for showing inline errors

  // Keep phone as readonly state (optional: allow editing by using setPhone)
  const [phone] = useState(phoneFromQuery)

  // Required fields: name, dob, gender
  const canSubmit = Boolean(name.trim() && dob && gender && /^\d{10}$/.test(phone))

  const handleCreateAccount = async () => {
    // Client-side validation
    if (!canSubmit) {
      setTouched({ name: true, dob: true, gender: true })
      alert('Please fill Name, Date of Birth, Gender and ensure phone is present.')
      return
    }

    try {
      const genderEnum = gender ? gender.toUpperCase() : null // MALE/FEMALE/OTHER
      const payload = {
        phone,                 // IMPORTANT: include phone from query
        name: name.trim(),
        email: email || null,  // email optional
        dob,                   // required
        gender: genderEnum,    // required
      }

      const created = await createUser(payload)

      // Save created user's id and phone locally for profile page
      // Save under both legacy and canonical keys so all components pick it up
      if (created?.id) {
        const idStr = String(created.id)
        localStorage.setItem('kazilen_user_id', idStr)
        localStorage.setItem('userId', idStr)            // <-- important canonical key
      }

      if (created?.phone) {
        localStorage.setItem('kazilen_user_phone', created.phone)
        localStorage.setItem('kazilen_user_phone_v2', created.phone)
      } else if (phone) {
        // fallback if backend didn't echo phone
        localStorage.setItem('kazilen_user_phone', phone)
        localStorage.setItem('kazilen_user_phone_v2', phone)
      }

      // If you keep any client-side address cache keyed by userId, clear it here.
      // Example: localStorage.removeItem('addresses_cache');
      // (uncomment if you use such caching.)

      alert('Account created successfully!')

      // Replace navigation so back doesn't return to create-account
      router.replace('/')
    } catch (err) {
      const msg = err?.message || 'Create failed'
      alert(`Create failed: ${msg}`)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top bar */}
      <div className="flex items-center gap-3 p-4 shadow-sm border-b">
        <button onClick={() => router.back()} className="text-gray-700">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">Create your profile</h1>
      </div>

      {/* Phone (readonly) */}
      <div className="px-4 mt-4">
        <fieldset className={`relative border rounded-lg px-3 pt-4 pb-2`}>
          <legend className="text-xs px-1 text-gray-500">Phone</legend>
          <input
            type="tel"
            value={phone}
            readOnly
            className="w-full border-none bg-transparent p-0 text-sm text-gray-800 focus:outline-none"
          />
        </fieldset>
        {!/^\d{10}$/.test(phone) && (
          <p className="text-xs text-red-500 mt-1">Phone not found or invalid. Go back to login and enter a valid phone.</p>
        )}
      </div>

      {/* Name (required) */}
      <div className="px-4 mt-6">
        <fieldset className={`relative border rounded-lg px-3 pt-4 pb-2 ${touched.name && !name.trim() ? 'border-red-400' : 'border-gray-300'}`}>
          <legend className="text-xs px-1 text-gray-500">Name *</legend>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, name: true }))}
            placeholder="Enter your full name"
            className="w-full border-none bg-transparent p-0 text-sm text-gray-800 focus:outline-none"
          />
        </fieldset>
        {touched.name && !name.trim() && (
          <p className="text-xs text-red-500 mt-1">Name is required.</p>
        )}
      </div>

      {/* Email (optional) */}
      <div className="px-4 mt-4">
        <fieldset className="relative border border-gray-300 rounded-lg px-3 pt-4 pb-2">
          <legend className="text-xs px-1 text-gray-500">Email (optional)</legend>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full border-none bg-transparent p-0 text-sm text-gray-800 focus:outline-none"
          />
        </fieldset>
      </div>

      {/* Date of Birth (required) */}
      <div className="px-4 mt-4">
        <fieldset className={`relative border rounded-lg px-3 pt-4 pb-2 ${touched.dob && !dob ? 'border-red-400' : 'border-gray-300'}`}>
          <legend className="text-xs px-1 text-gray-500">Date of birth *</legend>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, dob: true }))}
            placeholder="YYYY-MM-DD"
            className="w-full border-none bg-transparent p-0 text-sm text-gray-800 focus:outline-none"
          />
        </fieldset>
        {touched.dob && !dob && (
          <p className="text-xs text-red-500 mt-1">Date of birth is required.</p>
        )}
      </div>

      {/* Gender (required) */}
      <div className="px-4 mt-4 mb-6">
        <fieldset className={`relative border rounded-lg px-3 pt-4 pb-2 ${touched.gender && !gender ? 'border-red-400' : 'border-gray-300'}`}>
          <legend className="text-xs px-1 text-gray-500">Gender *</legend>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, gender: true }))}
            className="w-full border-none bg-transparent text-sm text-gray-800 focus:outline-none"
          >
            <option value="" disabled>Select gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </fieldset>
        {touched.gender && !gender && (
          <p className="text-xs text-red-500 mt-1">Gender is required.</p>
        )}
      </div>

      {/* Create Account Button */}
      <div className="px-4 pb-6">
        <button
          onClick={handleCreateAccount}
          disabled={!canSubmit}
          className={`w-full py-3 rounded-xl font-medium ${
            canSubmit
              ? 'bg-yellow-400 hover:bg-yellow-500 text-black'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          Create Account
        </button>
      </div>
    </div>
  )
}
