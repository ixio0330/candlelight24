'use client'

import { useEffect, useRef } from 'react'
import StoreInfo from './StoreInfo'

export default function StoreList({ filteredStores, showTodayOnly }) {
  const listRef = useRef(null)

  useEffect(() => {
    if (filteredStores && listRef.current) {
      listRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }, [filteredStores])

  return filteredStores?.length > 0 ? (
    <ul
      className="h-full space-y-5 overflow-y-auto pb-8 md:pb-14"
      ref={listRef}
    >
      {filteredStores.map((store) => (
        <StoreInfo key={`store-${store.name}-${store.id}`} {...store} />
      ))}
    </ul>
  ) : (
    <p className="text-sm text-stone-500">
      {showTodayOnly
        ? '오늘 날짜의 선결제 매장이 존재하지 않아요.'
        : '선결제된 매장이 존재하지 않아요.'}
    </p>
  )
}
