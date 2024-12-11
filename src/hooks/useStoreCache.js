import { useState, useCallback } from 'react'
import toast from 'react-hot-toast'

export function useStoreCache() {
  const [storeDataCache, setStoreDataCache] = useState({})
  const [loading, setLoading] = useState(null)

  const getStores = useCallback(async (storeIds) => {
    if (!storeIds?.length) return []

    const uncachedStoreIds = storeIds.filter((id) => !storeDataCache[id])
    
    const getSelectedStores = () => 
      storeIds
        .map((id) => storeDataCache[id])
        .filter((store) => store != null)

    if (uncachedStoreIds.length === 0) {
      return getSelectedStores()
    }

    try {
      setLoading(true)
      const storeIdsString = uncachedStoreIds.join(',')
      const response = await fetch(`/api/stores?ids=${storeIdsString}`)
      const data = await response.json()

      if (!response.ok) {
        toast.error('오류가 발생했어요.')
        return []
      }

      setStoreDataCache(prev => {
        const newCache = { ...prev }
        data.forEach((store) => {
          newCache[store.id] = store
        })
        return newCache
      })
      
      return getSelectedStores()
    } catch (err) {
      toast.error('오류가 발생했어요.')
      return []
    } finally {
      setLoading(false)
    }
  }, [storeDataCache])

  return { getStores, loading }
}
