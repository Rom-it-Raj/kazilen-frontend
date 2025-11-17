'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'

export default function ConditionalHeader() {
  const pathname = usePathname()

  const showOnPaths = ['/', '/history']
  const shouldShow = showOnPaths.includes(pathname)

  return shouldShow ? <Header /> : null
}
