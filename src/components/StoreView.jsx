'use client'

import { Clock3, MapPin, Pencil, User } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useStoreCache } from '../hooks/useStoreCache'
import OverlayLoader from './OverlayLoader'
import VMap from './VMap'

export default function StoreView({ stores }) {
  const [selectedStoreIds, setSelectedStoreIds] = useState(null)
  const [selectedStores, setSelectedStores] = useState(null)
  const { getStores, loading } = useStoreCache()
  const listRef = useRef(null)

  useEffect(() => {
    if (selectedStores && listRef.current) {
      listRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }, [selectedStores])

  useEffect(() => {
    if (selectedStoreIds?.length) {
      getStores(selectedStoreIds).then(setSelectedStores)
    }
  }, [selectedStoreIds, getStores])

  return (
    <>
      <VMap stores={stores} setSelectedStoreIds={setSelectedStoreIds} />

      <div className="fixed bottom-0 left-0 w-full">
        <section className="m-auto h-[50vh] w-full max-w-screen-md rounded-t-3xl bg-white px-5 pt-5">
          {selectedStores ? (
            <>
              <ul
                className="h-full space-y-5 overflow-y-auto pb-5"
                ref={listRef}
              >
                {selectedStores.map(
                  ({ id, name, road_address, detailed_address, orders }) => (
                    <li
                      key={`store-${name}-${id}`}
                      className="space-y-2 rounded-xl bg-stone-100 p-5"
                    >
                      <h3 className="font-semibold">{name}</h3>

                      <div className="space-y-1 text-sm">
                        {/* 주소 */}
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 shrink-0" />
                          <p>
                            {road_address}
                            {detailed_address && `, ${detailed_address}`}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {orders?.map(
                          (
                            {
                              recipient_name,
                              list,
                              start_date,
                              end_date,
                              time,
                              notes,
                            },
                            idx,
                          ) => (
                            <div
                              key={`order-${recipient_name}-${idx}`}
                              className="rounded-lg border border-stone-300 bg-white p-2"
                            >
                              <div className="flex flex-col gap-1 text-sm">
                                {recipient_name !== 'null' && (
                                  <h4 className="flex items-center gap-1">
                                    <User className="h-3.5 w-3.5 shrink-0" />
                                    {recipient_name}
                                  </h4>
                                )}
                                {/* 날짜 & 시간 */}
                                <p className="flex items-center gap-1">
                                  <Clock3 className="h-3.5 w-3.5 shrink-0" />
                                  {start_date && `${start_date}일 ~ `}
                                  {end_date}일{time && `, ${time}`}
                                </p>

                                {/* 메모 */}
                                {notes && (
                                  <p className="flex items-center gap-1">
                                    <Pencil className="h-3.5 w-3.5 shrink-0" />
                                    {notes}
                                  </p>
                                )}
                                <div className="my-1 h-px bg-stone-200" />
                              </div>
                              <ul className="space-y-1">
                                {list?.map(
                                  ({ id, name, quantity, max_per_person }) => (
                                    <li
                                      key={`order-${name}-${id}`}
                                      className="flex items-center gap-1"
                                    >
                                      <p className="text-sm font-semibold">
                                        {name}
                                      </p>
                                      <p className="shrink-0 rounded-full bg-blue-500 px-3 py-1 text-xs text-white">
                                        총 {quantity}개
                                      </p>
                                      <p className="shrink-0 rounded-full bg-lime-500 px-3 py-1 text-xs text-white">
                                        1인{' '}
                                        {max_per_person > 1
                                          ? `최대 ${max_per_person}`
                                          : max_per_person}
                                        개
                                      </p>
                                    </li>
                                  ),
                                )}
                              </ul>
                            </div>
                          ),
                        )}
                      </div>
                    </li>
                  ),
                )}
              </ul>
            </>
          ) : (
            <div className="space-y-5">
              <p>
                지도에서 동그라미로 표시된 장소를 선택하면, 해당 지역에서 집회를
                위해 선결제된 매장과 메뉴 정보를 쉽게 확인할 수 있습니다.
              </p>
            </div>
          )}
        </section>
      </div>

      <OverlayLoader loading={loading}>검색중...</OverlayLoader>
    </>
  )
}
