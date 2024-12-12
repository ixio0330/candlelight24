'use client'

import StoreInfo from './StoreInfo'

export default function StoreList({ filteredStores, listRef, showTodayOnly }) {
  return filteredStores?.length > 0 ? (
    <ul className="h-full space-y-5 overflow-y-auto pb-16" ref={listRef}>
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
