'use client'

import { Clock3, MapPin, Pencil, Tag } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import OverlayLoader from './OverlayLoader'
import VMap from './VMap'

export default function StoreView({ stores }) {
  const [selectedStoreIds, setSelectedStoreIds] = useState(null)
  const [selectedStores, setSelectedStores] = useState(null)
  const [loading, setLoading] = useState(null)

  useEffect(() => {
    if (selectedStoreIds != null && selectedStoreIds?.length > 0) {
      const fetchStores = async () => {
        try {
          setLoading(true)
          const storeIdsString = selectedStoreIds.join(',')
          const response = await fetch(`/api/stores?ids=${storeIdsString}`)
          const data = await response.json()

          if (response == null) {
            toast.error('오류가 발생했어요.')
          }

          setSelectedStores(data)
        } catch (err) {
          toast.error('오류가 발생했어요.')
        } finally {
          setLoading(false)
        }
      }

      fetchStores()
    }
  }, [selectedStoreIds])

  return (
    <>
      <VMap stores={stores} setSelectedStoreIds={setSelectedStoreIds} />

      <div className="fixed bottom-0 left-0 w-full">
        <section className="m-auto h-[50vh] w-full max-w-screen-md rounded-t-3xl bg-white p-5">
          {selectedStores ? (
            <>
              <h2 className="mb-2 text-lg font-bold">선결제 매장 목록</h2>
              <ul className="h-full space-y-5 overflow-y-auto pb-10">
                {selectedStores.map(
                  ({
                    id,
                    name,
                    date,
                    time,
                    notes,
                    recipient_name,
                    road_address,
                    detailed_address,
                    orders,
                  }) => (
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

                        {/* 날짜 & 시간 */}
                        <p className="flex items-center gap-1">
                          <Clock3 className="h-3.5 w-3.5 shrink-0" />
                          {date?.split('T')[0]}일{time && `, ${time}`}
                        </p>

                        {/* 수령 */}
                        <p className="flex items-center gap-1">
                          <Tag className="h-3.5 w-3.5 shrink-0" />
                          수령이름: {recipient_name}
                        </p>

                        {/* 메모 */}
                        {notes && (
                          <p className="flex items-center gap-1">
                            <Pencil className="h-3.5 w-3.5 shrink-0" />
                            메모: {notes}
                          </p>
                        )}
                      </div>

                      <div>
                        <ul className="space-y-2">
                          {orders?.map(
                            ({ id, name, quantity, max_per_person }) => (
                              <li
                                key={`order-${name}-${id}`}
                                className="flex items-center gap-2"
                              >
                                <p className="font-semibold">{name}</p>
                                <p className="shrink-0 rounded-full bg-blue-500 px-3 py-1 text-sm text-white">
                                  총 {quantity}개
                                </p>
                                <p className="shrink-0 rounded-full bg-lime-500 px-3 py-1 text-sm text-white">
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
                    </li>
                  ),
                )}
              </ul>
            </>
          ) : (
            <div className="space-y-5">
              <p>
                촛불24를 이용하면 집회를 위한 선결제 정보를 한번에 볼 수
                있습니다.
              </p>
              <p>
                지도에서 동그라미로 표시된 장소를 선택하면, 해당 지역에서 집회를
                위해 선결제된 매장과 메뉴 정보를 쉽게 확인할 수 있습니다.
              </p>
            </div>
          )}
        </section>
      </div>

      <OverlayLoader loading={loading}>찾는중...</OverlayLoader>
    </>
  )
}
