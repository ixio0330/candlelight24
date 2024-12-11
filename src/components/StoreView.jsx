'use client'

import { useEffect, useState } from 'react'
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
            // error
          }

          setSelectedStores(data)
        } catch (err) {
          // error
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
          <ul>
            <li></li>
          </ul>
        </section>
      </div>
    </>
  )
}
