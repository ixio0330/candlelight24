'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function BodyClassProvider() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname === '/' || pathname === '/wiki') {
      document.body.classList.add('h-screen', 'overflow-hidden')
    } else {
      document.body.classList.remove('h-screen', 'overflow-hidden')
    }

    return () => {
      document.body.classList.remove('h-screen', 'overflow-hidden')
    }
  }, [pathname])

  return null
}
