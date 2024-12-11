import createSupabase from '@/supabase'
import { getToday } from '@/utils/date'

export async function getAllStores() {
  try {
    const supabase = createSupabase()

    const { data, error } = await supabase
      .from('stores')
      .select('id, date, name, latitude, longitude')
      .gt('date', getToday())
      .order('date', { ascending: false })

    if (error) {
      console.log(error)
      return null
    }

    return data ?? []
  } catch (error) {
    return null
  }
}

export async function getStoresByIds(storeIds = []) {
  try {
    const supabase = createSupabase()
    const { data, error } = await supabase
      .from('stores')
      .select(
        `
            *,
            orders (
                id,
                name,
                quantity,
                max_per_person,
                recipient_name,
                created_at
            )
        `,
      )
      .in('id', storeIds)

    if (error) {
      console.log(error)
      return null
    }

    const storesWithGroupedOrders = data.map((store) => {
      const groupedOrders = store.orders.reduce((acc, order) => {
        const recipient = order.recipient_name || 'Unknown' // 수령인이 없는 경우 "Unknown" 처리
        if (!acc[recipient]) {
          acc[recipient] = []
        }
        acc[recipient].push(order)
        return acc
      }, {})

      // 기존 store 데이터에서 orders 제거하고 grouped_orders만 추가
      const { orders, ...storeWithoutOrders } = store // orders 필드 제거
      return {
        ...storeWithoutOrders,
        orders: Object.entries(groupedOrders).map(([recipient_name, list]) => ({
          recipient_name,
          list,
        })),
      }
    })

    return storesWithGroupedOrders ?? []
  } catch (error) {
    return null
  }
}
