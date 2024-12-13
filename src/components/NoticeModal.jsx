'use client'

import { getToday } from '@/utils/date'
import { useEffect, useState } from 'react'

export default function NoticeModal() {
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    const today = getToday()
    const isTargetDate = today == '2024-12-14'

    const hasSeenNotice =
      localStorage.getItem('CANDLELIGHT24_NOTICE') === 'true'

    if (isTargetDate && !hasSeenNotice) {
      setShowMessage(true)
    }
  }, [])

  const handleClose = () => {
    setShowMessage(false)
    localStorage.setItem('CANDLELIGHT24_NOTICE', 'true')
  }

  if (!showMessage) return null

  return (
    <article className="fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-72 rounded-2xl bg-white p-5 text-sm">
        <div className="space-y-4">
          <h2 className="text-center text-base font-bold">공지</h2>
          <p className="text-stone-700">
            촛불24는 1인 개발자가 운영 중이며, 12월 14일 집회 참석으로
            업데이트가 지연될 수 있다는점 양해 부탁드립니다. 감사합니다.
          </p>
          <button
            className="w-full rounded-xl bg-stone-900 px-4 py-2 font-medium text-white transition-colors md:hover:bg-stone-700"
            onClick={handleClose}
          >
            확인
          </button>
        </div>
      </div>
    </article>
  )
}
