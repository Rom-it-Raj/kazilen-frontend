'use client'

import Link from 'next/link'
import { Home, Clock } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'History', href: '/history', icon: Clock },
  ]

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-around py-2 z-50">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        const Icon = item.icon

        return (
          <Link
            key={item.name}
            href={item.href}
            className="flex flex-col items-center text-xs"
          >
            <Icon
              size={20}
              className={isActive ? 'text-pink-500' : 'text-gray-400'}
            />
            <span className={isActive ? 'text-pink-500' : 'text-gray-400'}>
              {item.name}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
