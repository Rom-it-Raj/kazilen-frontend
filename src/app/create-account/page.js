'use client'
import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createUser } from '@/app/lib/api'

import { apiRequest } from '../../utils/api'

export default function CreateAccountPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const phoneNoFromQuery = searchParams?.get('phone') || ''

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')          // optional
  const [dob, setDob] = useState('')              // YYYY-MM-DD (required)
  const [gender, setGender] = useState('')        // required: Male/Female/Other
  const [touched, setTouched] = useState({})      // for showing inline errors

  const [phoneNo, setPhone] = useState('')


  const canSubmit = Boolean(name.trim() && dob && gender && /^\d{10}$/.test(phoneNo))

  const handleCreateAccount = async () => {
    if (!canSubmit) {
      setTouched({ name: true, dob: true, gender: true })
      alert('Please fill Name, Date of Birth, Gender and ensure phoneNo is present.')
      return
    }

    try {
      const genderEnum = gender ? gender.toUpperCase() : null // MALE/FEMALE/OTHER
      const payload = {
        phoneNo,                 // IMPORTANT: include phone from query
        name: name.trim(),
        email: email || null,  // email optional
        dob,                   // required
        gender: genderEnum,    // required
      }
			////===========================================================
      const created = await apiRequest(endpoint="/create-account", method="POST", body=payload)
			////===========================================================
      if (created?.id) {
        const idStr = String(created.id)
        localStorage.setItem('kazilen_user_id', idStr)
        localStorage.setItem('userId', idStr)            // <-- important canonical key
      }

      if (created?.phoneNo) {
        localStorage.setItem('kazilen_user_phoneNo', created.phoneNo)
        localStorage.setItem('kazilen_user_phoneNo_v2', created.phoneNo)
      } else if (phoneNo) {
        localStorage.setItem('kazilen_user_phoneNo', phoneNo)
        localStorage.setItem('kazilen_user_phoneNo_v2', phoneNo)
      }


      alert('Account created successfully!')

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
            value={phoneNo}
            readOnly
            className="w-full border-none bg-transparent p-0 text-sm text-gray-800 focus:outline-none"
          />
        </fieldset>
        {!/^\d{10}$/.test(phoneNo) && (
          <p className="text-xs text-red-500 mt-1">Phone not found or invalid. Go back to login and enter a valid phoneNo.</p>
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
