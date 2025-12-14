// frontend/src/app/components/Header.js
'use client'

import { useEffect, useState } from 'react'
import { MapPin, ChevronDown } from 'lucide-react'
import { useRouter } from 'next/navigation'
import SearchBar from './SearchBar'
import { checkPhone, getUser } from '@/app/lib/api'

export default function Header() {
  const router = useRouter()
  const [initial, setInitial] = useState(null)

  const openAddress = () => {
    router.push('/select-address')
  }

  const openProfile = () => {
    router.push('/profile')
  }

  useEffect(() => {
    let mounted = true

    async function loadInitial() {
      try {
        // 1) try saved id
        const savedId = localStorage.getItem('kazilen_user_id')
        if (savedId) {
          const data = await getUser(savedId)
          if (!mounted) return
          if (data?.name) {
            setInitial(data.name.trim().charAt(0).toUpperCase())
            return
          }
        }

        // 2) fallback to saved phone -> checkPhone -> get user by id
        const savedPhone = localStorage.getItem('kazilen_user_phone')
        if (savedPhone) {
          const chk = await checkPhone(savedPhone)
          if (!mounted) return
          if (chk?.exists && chk?.userId) {
            const data = await getUser(chk.userId)
            if (!mounted) return
            if (data?.name) {
              setInitial(data.name.trim().charAt(0).toUpperCase())
              // optionally save resolved id for future
              localStorage.setItem('kazilen_user_id', String(chk.userId))
              return
            }
          }
        }

        // nothing found -> fallback (you can set default letter)
        if (mounted && initial === null) setInitial('?')
      } catch (err) {
        // keep fallback; don't spam user with errors
        console.error('Header: failed to load user initial', err)
        if (mounted && initial === null) setInitial('?')
      }
    }

    loadInitial()

    return () => {
      mounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="px-4 py-3 bg-white shadow-sm flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <button onClick={openAddress} className="text-left">
          <div className="flex items-center text-sm font-medium text-gray-700">
            <MapPin size={16} className="text-red-500 mr-1" />
            Hotel
            <ChevronDown size={14} className="ml-1 text-gray-600" />
          </div>
          <p className="text-xs text-gray-400 leading-tight">
            308, 3 Floor, Hotel Sunshine INN, Sadar, Nagpur
          </p>
        </button>

        <button
          onClick={openProfile}
          className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-semibold"
          title="Open profile"
          aria-label="Open profile"
        >
          {initial ?? '•'}
        </button>
      </div>

      <SearchBar />
    </div>
  )
}
