'use client'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import VMap from './VMap'

export default function StoreView({ stores }) {
  const [selectedStoreIds, setSelectedStoreIds] = useState(null)
  const [selectedStores, setSelectedStores] = useState(null)

  useEffect(() => {
    if (selectedStoreIds != null && selectedStoreIds?.length > 0) {
      const fetchStores = async () => {
        try {
          const storeIdsString = selectedStoreIds.join(',')
          const response = await fetch(`/api/stores?ids=${storeIdsString}`)
          const data = await response.json()

          if (response == null) {
            toast.error('오류가 발생했어요.')
          }

          setSelectedStores(data)
        } catch (err) {
          toast.error('오류가 발생했어요.')
        }
      }

      fetchStores()
    }
  }, [selectedStoreIds])

  return (
    <>
      <VMap stores={stores} setSelectedStoreIds={setSelectedStoreIds} />

      <div className="fixed bottom-0 left-0 w-full">
        <section className="m-auto h-80 w-full max-w-screen-md rounded-t-3xl bg-white p-5">
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
                      className="rounded-xl bg-stone-100 p-5"
                    >
                      <h3 className="font-semibold">{name}</h3>
                      <p>
                        {date?.split('T')[0]}일{time && `, ${time}`}
                      </p>
                      <p>{recipient_name}</p>
                      <p>
                        {road_address}
                        {detailed_address && `, ${detailed_address}`}
                      </p>
                      <p>{notes}</p>
                      <ul>
                        {orders?.map(
                          ({ id, name, quantity, max_per_person }) => (
                            <li key={`order-${name}-${id}`}>
                              <p>메뉴명: {name}</p>
                              <p>개수: {quantity}</p>
                              <p>
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
                    </li>
                  ),
                )}
              </ul>
            </>
          ) : (
            <div>촛불24는 ~입니다.</div>
          )}
        </section>
      </div>
    </>
  )
}
