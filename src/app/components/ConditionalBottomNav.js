'use client'

import { usePathname } from 'next/navigation'
import BottomNav from './BottomNav'

export default function ConditionalBottomNav() {
  const pathname = usePathname()

  const showOnPaths = ['/', '/history']
  const shouldShow = showOnPaths.includes(pathname)

  return shouldShow ? <BottomNav /> : null
}
