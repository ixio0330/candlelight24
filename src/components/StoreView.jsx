'use client'

import { getToday } from '@/utils/date'
import { useEffect, useState } from 'react'
import { useStoreCache } from '../hooks/useStoreCache'
import BottomSheet from './BottomSheet'
import FilterButtons from './FilterButtons'
import GuideMessage from './GuideMessage'
import OverlayLoader from './OverlayLoader'
import StoreList from './StoreList'
import VMap from './VMap'

export default function StoreView({ stores }) {
  const [selectedStoreIds, setSelectedStoreIds] = useState(null)
  const [selectedStores, setSelectedStores] = useState(null)
  const [showTodayOnly, setShowTodayOnly] = useState(false)
  const { getStores, loading } = useStoreCache()

  useEffect(() => {
    if (selectedStoreIds?.length) {
      getStores(selectedStoreIds).then(setSelectedStores)
    }
  }, [selectedStoreIds, getStores])

  const filteredStores = selectedStores
    ?.map((store) => ({
      ...store,
      orders: store.orders?.filter(
        (order) => !showTodayOnly || order.end_date === getToday(),
      ),
    }))
    .filter((store) => store.orders?.length > 0)

  const storeContent = selectedStores ? (
    <>
      <div className="flex items-center justify-between pb-3">
        <p className="text-stone-500">
          총{' '}
          <span className="font-bold text-blue-500">
            {filteredStores?.length}
          </span>
          개
        </p>
        <FilterButtons
          showTodayOnly={showTodayOnly}
          setShowTodayOnly={setShowTodayOnly}
        />
      </div>
      <StoreList
        filteredStores={filteredStores}
        showTodayOnly={showTodayOnly}
      />
    </>
  ) : (
    <GuideMessage />
  )

  return (
    <>
      <VMap stores={stores} setSelectedStoreIds={setSelectedStoreIds} />

      {/* 모바일 */}
      <BottomSheet>{storeContent}</BottomSheet>

      {/* PC */}
      <div className="fixed bottom-0 left-0 hidden w-full md:block">
        <section className="m-auto h-[50vh] w-full max-w-screen-md rounded-t-3xl bg-white px-5 pt-4">
          {storeContent}
        </section>
      </div>

      <OverlayLoader loading={loading}>검색중...</OverlayLoader>
    </>
  )
}
